import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { STAMP, unresolvedContent, hashTree, headCommit, workingTreeChanges } from './release-gates.mjs';

// Prepare a public asset manifest and independent byte proof. No credentials.
// Production upload route only: run it through `npm run release -- <proof.json>`, which
// builds fresh and runs every check first. This script refuses any build that has not
// passed those checks, or has changed since, whatever INDEX_PUBLIC_SITE was.
const root = path.resolve('build/client');
const output = process.argv[2];
if (!output) throw new Error('Pass the output JSON path outside build/client.');
if (path.resolve(output).startsWith(root + path.sep)) throw new Error('Do not publish the upload proof as a website asset.');
const refuse = (why) => { console.error(`UPLOAD PROOF REFUSED: ${why}`); process.exit(1); };
let stamp;
try { stamp = JSON.parse(await readFile(STAMP, 'utf8')); }
catch { refuse('build/release-stamp.json is missing. Run `npm run release -- <proof.json>`: it builds fresh and runs the typecheck, tests and content gates first.'); }
if (!Array.isArray(stamp.checks) || !stamp.checks.length || stamp.checks.some((c) => !c.passed)) refuse('the release stamp records a failed check.');
if (stamp.sourceCommit !== headCommit()) refuse(`the release checks ran at ${stamp.sourceCommit}, not at HEAD.`);
if (workingTreeChanges()) refuse('the working tree has uncommitted changes.');
const current = await hashTree(root);
const drift = [...new Set([...Object.keys(current), ...Object.keys(stamp.files || {})])].filter((f) => current[f] !== stamp.files?.[f]);
if (drift.length) refuse(`build/client changed after the release checks (${drift.length} files, e.g. ${drift.slice(0, 3).join(', ')}). Run the release again.`);
const unresolved = await unresolvedContent(root);
if (unresolved.length) refuse('unresolved content in the build:\n  ' + unresolved.join('\n  '));
const manifest = {}, files = [];
async function visit(dir) {
  for (const entry of (await readdir(dir, {withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Asset symlinks are not allowed.');
    if (entry.name === '.vite') continue; // Build-tool manifest is not a public asset.
    if (entry.isDirectory()) { await visit(file); continue; }
    if (!entry.isFile()) throw new Error('Unexpected asset type.');
    const bytes = await readFile(file);
    if (bytes.length > 25 * 1024 * 1024) throw new Error('Asset exceeds Cloudflare file limit.');
    const url = '/' + path.relative(root, file).split(path.sep).join('/');
    const hash = createHash('sha256').update(bytes.toString('base64') + path.extname(file).slice(1)).digest('hex').slice(0,32);
    manifest[url] = {hash, size:bytes.length};
    files.push({path:url,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
  }
}
await visit(root);
const commit = headCommit();
const proof = {sourceCommit:commit,createdAt:new Date().toISOString(),release:{checkedAt:stamp.createdAt,indexable:stamp.indexable,checks:stamp.checks.map((c)=>c.name)},manifest,files};
await writeFile(output,JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify({sourceCommit:commit,files:files.length,totalBytes:files.reduce((s,f)=>s+f.bytes,0),proof:path.resolve(output)}));
