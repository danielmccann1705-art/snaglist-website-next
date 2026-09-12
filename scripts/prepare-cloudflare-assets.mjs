import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Prepare a public asset manifest and independent byte proof. No credentials.
const root = path.resolve('build/client');
const output = process.argv[2];
if (!output) throw new Error('Pass the output JSON path outside build/client.');
if (path.resolve(output).startsWith(root + path.sep)) throw new Error('Do not publish the upload proof as a website asset.');
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
const commit = execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const proof = {sourceCommit:commit,createdAt:new Date().toISOString(),manifest,files};
await writeFile(output,JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify({sourceCommit:commit,files:files.length,totalBytes:files.reduce((s,f)=>s+f.bytes,0),proof:path.resolve(output)}));
