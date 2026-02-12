export interface Persona {
  slug: string;
  role: string;
  market: 'uk' | 'us';
  /** Pattern: "snagging" for UK, "punch list" for US */
  pattern: 'snagging' | 'punch-list';
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  painPoints: { title: string; description: string }[];
  /** Which Snaglist features matter most to this role, in priority order */
  topFeatures: { title: string; description: string }[];
  /** A day-in-the-life scenario showing how this role uses Snaglist */
  workflow: string;
  /** Who this role typically collaborates with */
  collaborators: string;
  cta: string;
}

// ─── UK PERSONAS (Snagging) ─────────────────────────────────────────────

const ukPersonas: Persona[] = [
  {
    slug: 'site-managers',
    role: 'Site Managers',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Site Managers | Snaglist',
    metaDescription: 'Capture snags in 5 seconds with one hand. Share via Magic Links — your subbies see exactly what to fix. Built by a site manager with 15 years on site.',
    headline: 'The snagging app built by a site manager, for site managers.',
    subheadline: 'You\'re managing 10 trades, walking 3 floors, and your phone is in one hand. Snaglist was designed for exactly that.',
    painPoints: [
      { title: 'WhatsApp chaos', description: 'Critical snag photos buried in 400 messages. Nobody knows what\'s done. You\'re scrolling instead of managing.' },
      { title: 'Spreadsheet hell', description: 'Late nights reformatting cells. Version nightmares — v2_final_FINAL.xlsx. Useless when you\'re on a scaffold.' },
      { title: 'Chasing subbies', description: 'You sent the PDF. They didn\'t open it. Now you\'re ringing around asking "is that done yet?" for the third time.' },
    ],
    topFeatures: [
      { title: '5-second capture', description: 'Photo, markup, trade assignment — one flow, one hand, five seconds. Works offline in the basement.' },
      { title: 'Magic Links', description: 'Send your subbie a link. They tap it, see their snags with photos, and submit completion evidence. No app download.' },
      { title: 'One-tap PDF reports', description: 'Generate a branded report for your client before you\'ve left site. Every photo, every status, every note.' },
    ],
    workflow: 'Walk the floor. Spot a defect. Photograph it, mark it up, assign it to the right trade — five seconds. The subbie gets a Magic Link on their phone. They see exactly what to fix, with annotated photos and the exact location. When it\'s done, they submit a photo through the link. You see the status update in real time. No phone calls. No chasing.',
    collaborators: 'Subcontractors, project managers, clients, clerk of works',
    cta: 'Join the waitlist — built by a site manager who spent 15 years doing it the hard way.',
  },
  {
    slug: 'clerk-of-works',
    role: 'Clerk of Works',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Clerk of Works | Snaglist',
    metaDescription: 'Document defects with GPS-stamped photos, track resolution status in real time, and generate professional audit reports in one tap.',
    headline: 'Thorough inspections. Professional reports. Zero paperwork.',
    subheadline: 'Your job is quality assurance — making sure every defect is documented, tracked, and resolved. Snaglist makes the paper trail automatic.',
    painPoints: [
      { title: 'Manual documentation', description: 'Writing up inspection notes by hand, then typing them up later. Photos disconnected from reports. Evidence scattered.' },
      { title: 'Tracking resolution', description: 'You flagged 40 defects last week. How many are actually fixed? Without a system, you\'re re-inspecting everything from scratch.' },
      { title: 'Report formatting', description: 'Compiling photos, notes, and statuses into a presentable document takes hours. Your expertise is inspection, not desktop publishing.' },
    ],
    topFeatures: [
      { title: 'GPS-stamped evidence', description: 'Every photo is automatically tagged with location and timestamp. Irrefutable documentation of when and where defects were found.' },
      { title: '5-stage status tracking', description: 'Open → In Progress → Resolved → Verified → Closed. See exactly where every defect stands without re-inspecting.' },
      { title: 'Branded PDF reports', description: 'One tap generates a complete audit report with every photo, annotation, and status update. Ready for the client.' },
    ],
    workflow: 'Walk the site conducting your inspection. Each defect: photograph, annotate directly on the image, assign to the responsible trade. At the end of the day, generate a full report in one tap — GPS stamps, photos, statuses, all formatted. Share it with the project manager and developer. Track resolution remotely as contractors submit completion evidence through Magic Links.',
    collaborators: 'Developers, project managers, main contractors, building control',
    cta: 'Join the waitlist — professional snagging documentation without the paperwork.',
  },
  {
    slug: 'project-managers',
    role: 'Project Managers',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Project Managers | Snaglist',
    metaDescription: 'Track snag resolution across multiple sites from one dashboard. Real-time status updates from contractors. One-tap reports for clients.',
    headline: 'See every snag across every site. Without ringing anyone.',
    subheadline: 'You\'re managing multiple projects. You need to know what\'s resolved, what\'s stuck, and what\'s overdue — without chasing site managers for updates.',
    painPoints: [
      { title: 'No visibility', description: 'You ask the site manager for an update. They check WhatsApp. They ring the subbie. An hour later you get a vague answer.' },
      { title: 'Client pressure', description: 'Your client wants a progress report by end of day. You\'re compiling data from spreadsheets, photos, and texts manually.' },
      { title: 'Close-out delays', description: 'Projects stall in the final 5% because snags aren\'t being tracked systematically. Handover dates slip.' },
    ],
    topFeatures: [
      { title: 'Real-time status tracking', description: 'Every snag has a live status. Contractors update through Magic Links. You see progress without asking anyone.' },
      { title: 'One-tap client reports', description: 'Generate a branded PDF covering all open, in-progress, and resolved snags. Send it to your client in seconds.' },
      { title: 'Multi-project overview', description: 'See snag counts, resolution rates, and overdue items across all your sites from one place.' },
    ],
    workflow: 'Check your dashboard. Site A has 4 overdue snags — send the subbie a reminder through the app. Site B is 90% resolved — generate a client report in one tap. Site C has new snags logged by the site manager this morning — review the photos and annotations. All from your desk, your van, or the airport.',
    collaborators: 'Site managers, subcontractors, clients, developers',
    cta: 'Join the waitlist — snag tracking that doesn\'t depend on phone calls.',
  },
  {
    slug: 'quantity-surveyors',
    role: 'Quantity Surveyors',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Quantity Surveyors | Snaglist',
    metaDescription: 'Document defects with photo evidence for retention and final account negotiations. Timestamped, GPS-tagged, exportable.',
    headline: 'Defect evidence that holds up in final account discussions.',
    subheadline: 'Retention claims need documentation. Snaglist gives you timestamped, GPS-tagged photo evidence tied to every defect — exportable in one tap.',
    painPoints: [
      { title: 'Disputed defects', description: 'The contractor says it\'s done. Your records say otherwise. Without timestamped evidence, it\'s your word against theirs.' },
      { title: 'Retention justification', description: 'Holding retention requires documented proof of outstanding defects. Scattered photos and emails don\'t cut it.' },
      { title: 'Final account delays', description: 'Agreeing final accounts takes longer when defect records are incomplete or disorganised.' },
    ],
    topFeatures: [
      { title: 'Timestamped photo evidence', description: 'Every defect photo is automatically tagged with date, time, and GPS. Clear documentation trail.' },
      { title: 'Status history', description: 'Full audit trail per snag — when it was logged, assigned, updated, and resolved. Useful for disputes.' },
      { title: 'Exportable reports', description: 'One-tap PDF export with all evidence. Attach to valuations, retention notices, or final account submissions.' },
    ],
    workflow: 'During site visits, document outstanding defects with annotated photos. Each one is automatically timestamped and GPS-tagged. When it\'s time for a valuation or retention discussion, generate a full defect report showing what\'s open, what\'s resolved, and the complete timeline. Evidence that speaks for itself.',
    collaborators: 'Project managers, contractors, clients, commercial managers',
    cta: 'Join the waitlist — defect evidence that\'s always organised and ready.',
  },
  {
    slug: 'subcontractors',
    role: 'Subcontractors',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Subcontractors | Snaglist',
    metaDescription: 'See your assigned snags through a simple link. No app download, no account. Submit completion photos directly.',
    headline: 'See what needs fixing. No app. No login. Just a link.',
    subheadline: 'You get a link on your phone. You tap it. You see exactly what to fix — annotated photos, location, description. Submit a photo when it\'s done.',
    painPoints: [
      { title: 'Unclear instructions', description: 'A blurry photo on WhatsApp with "fix this." Where is it? What exactly is wrong? You\'re ringing back to ask.' },
      { title: 'Yet another app', description: 'The main contractor wants you on their system. Another account, another password, another app you\'ll use once.' },
      { title: 'No proof of completion', description: 'You fixed it. But there\'s no record. Next week they\'re asking if it\'s done again.' },
    ],
    topFeatures: [
      { title: 'Magic Links — zero setup', description: 'Tap the link you were sent. See your snags in your browser. No download, no account, no training.' },
      { title: 'Clear annotated photos', description: 'See exactly what\'s wrong and exactly where — marked up directly on the photo. No ambiguity.' },
      { title: 'Submit completion evidence', description: 'Take a photo of the fix, add a note, submit through the link. The site manager sees it instantly.' },
    ],
    workflow: 'You get a text from the site manager with a link. Tap it. See your assigned snags with clear photos showing exactly what needs fixing. Go to the location, do the work, take a photo of the completed fix, and submit it through the same link. Done. The site manager sees the update in real time.',
    collaborators: 'Site managers, main contractors',
    cta: 'Your site manager will send you a Magic Link — no signup needed.',
  },
  {
    slug: 'property-developers',
    role: 'Property Developers',
    market: 'uk',
    pattern: 'snagging',
    metaTitle: 'Snagging App for Property Developers | Snaglist',
    metaDescription: 'Track defect resolution across developments. Professional branded reports for buyers. Real-time visibility into close-out progress.',
    headline: 'Close out developments faster. Hand over with confidence.',
    subheadline: 'Every unit needs snagging. Every buyer expects a professional process. Snaglist gives you visibility across the entire development without micromanaging site teams.',
    painPoints: [
      { title: 'Handover delays', description: 'Units aren\'t ready on time because snag resolution isn\'t being tracked. Completion dates slip. Buyers complain.' },
      { title: 'No oversight', description: 'You\'re relying on site managers to self-report progress. Without a system, you only hear about problems when they become crises.' },
      { title: 'Buyer complaints post-handover', description: 'Defects missed during snagging become warranty claims. Expensive and damaging to reputation.' },
    ],
    topFeatures: [
      { title: 'Development-wide visibility', description: 'See snag counts and resolution rates across all units and blocks. Identify where close-out is stalling.' },
      { title: 'Professional buyer reports', description: 'Generate branded PDF reports showing all resolved snags for each unit. Professional handover documentation.' },
      { title: 'Contractor accountability', description: 'Every snag has a clear owner, timeline, and status. No ambiguity about who\'s responsible for what.' },
    ],
    workflow: 'Your site manager logs snags across units using Snaglist. Subcontractors receive Magic Links and fix issues. You check the dashboard to see resolution rates per block. Before handover, generate a professional report for each unit showing all defects found and resolved. Clean, documented, defensible.',
    collaborators: 'Site managers, main contractors, buyers, sales teams',
    cta: 'Join the waitlist — close out your next development faster.',
  },
];

// ─── US PERSONAS (Punch List) ───────────────────────────────────────────

const usPersonas: Persona[] = [
  {
    slug: 'general-contractors',
    role: 'General Contractors',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for General Contractors | Snaglist',
    metaDescription: 'Create punch lists in seconds. Share with subs via Magic Links — no app download needed. Track resolution in real time. Professional closeout reports.',
    headline: 'Close out projects without the paper chase.',
    subheadline: 'You\'re coordinating 15 trades and the owner wants a punchlist walkthrough tomorrow. Snaglist gets it done in one walk, not three.',
    painPoints: [
      { title: 'Punchlist bottleneck', description: 'The project is 95% done but closeout takes weeks. Items get lost between texts, emails, and spreadsheets. Subs don\'t respond.' },
      { title: 'Sub coordination', description: 'You assigned 40 punch items to 8 different subs. Tracking who\'s done what means a dozen phone calls and a whiteboard.' },
      { title: 'Owner documentation', description: 'The owner wants a professional closeout package. You\'re compiling photos from your camera roll into a Word doc at midnight.' },
    ],
    topFeatures: [
      { title: '5-second capture', description: 'Photo, markup, trade assignment — log items as fast as you can walk the floor. Works one-handed, works offline.' },
      { title: 'Magic Links for subs', description: 'Send each sub a link. They see their items with annotated photos. They submit completion evidence. No app to install.' },
      { title: 'Closeout reports', description: 'One-tap branded PDF with every item, photo, and status. Hand it to the owner and move on to the next job.' },
    ],
    workflow: 'Walk the project with the architect. Log every punch item — photograph, annotate, assign to the responsible sub. Each sub gets a Magic Link with only their items. As they complete work, they submit photos through the link. You watch items close out in real time. Generate the final closeout report for the owner in one tap.',
    collaborators: 'Subcontractors, architects, owners, superintendents',
    cta: 'Join the waitlist — punchlist closeout that doesn\'t eat your evenings.',
  },
  {
    slug: 'subcontractors',
    role: 'Subcontractors',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for Subcontractors | Snaglist',
    metaDescription: 'See your assigned punch items through a simple link. No app download, no account. Clear photos showing exactly what to fix.',
    headline: 'See your punch items. Fix them. Prove it. Move on.',
    subheadline: 'The GC sends you a link. You tap it. You see exactly what needs fixing — clear photos, exact locations. Submit a photo when it\'s done. That\'s it.',
    painPoints: [
      { title: 'Vague instructions', description: '"Fix the thing in unit 4B." What thing? Where exactly? You\'re calling the super to clarify, wasting everyone\'s time.' },
      { title: 'Another app to learn', description: 'Every GC wants you on a different platform. Another login, another password, another system that takes 20 minutes to figure out.' },
      { title: 'No completion record', description: 'You did the work. Two weeks later, the GC says it\'s still open. Without proof, you\'re going back to re-check.' },
    ],
    topFeatures: [
      { title: 'Magic Links — no app needed', description: 'Tap the link the GC sent you. See your items in your phone\'s browser. No download, no account, no training.' },
      { title: 'Annotated photos', description: 'Each item has a marked-up photo showing exactly what\'s wrong and where. No guessing, no phone calls.' },
      { title: 'Submit completion evidence', description: 'Take a photo of the finished work, add a note, submit through the link. The GC sees it immediately.' },
    ],
    workflow: 'You get a text from the GC with a link. Tap it. See your 6 punch items with annotated photos showing exactly what needs fixing in each location. Do the work. Take a photo of each fix. Submit through the same link. The GC sees everything in real time. You\'re done — no follow-up calls.',
    collaborators: 'General contractors, superintendents',
    cta: 'Your GC will send you a Magic Link — no signup needed.',
  },
  {
    slug: 'superintendents',
    role: 'Superintendents',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for Superintendents | Snaglist',
    metaDescription: 'Walk the floor, log punch items in seconds, push them to subs via Magic Links. Track everything from your phone.',
    headline: 'Walk the floor once. Get every punch item logged and assigned.',
    subheadline: 'You\'re the one doing the walkthrough. You need to move fast, document clearly, and get subs on it today — not next week.',
    painPoints: [
      { title: 'Slow documentation', description: 'Writing punch items on a clipboard, then typing them up, then emailing them, then following up. The process takes longer than the fixes.' },
      { title: 'Communication gaps', description: 'You told the plumber about the leak in 204. Verbally. On a busy Tuesday. It\'s Friday and nothing\'s happened.' },
      { title: 'Re-walks', description: 'You can\'t tell what\'s been fixed without walking the whole floor again. Items that were "done" aren\'t actually done.' },
    ],
    topFeatures: [
      { title: 'One-handed logging', description: 'Photograph a deficiency, mark it up, assign the trade — five seconds per item. Keep moving.' },
      { title: 'Instant sub notification', description: 'Magic Links go straight to the sub\'s phone. They see annotated photos of exactly what to fix. No miscommunication.' },
      { title: 'Real-time tracking', description: 'Subs submit completion photos through the link. Items close out on your screen. No re-walk needed for verified items.' },
    ],
    workflow: 'Walk the project with the PM or architect. Log every deficiency as you go — snap, annotate, assign. By the time you\'re back at the trailer, every sub already has their items on their phone via Magic Links. Track completion in real time as they work. Generate a summary for the PM at end of day.',
    collaborators: 'Project managers, subcontractors, architects, owners',
    cta: 'Join the waitlist — log a floor of punch items before your coffee gets cold.',
  },
  {
    slug: 'project-managers',
    role: 'Project Managers',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for Project Managers | Snaglist',
    metaDescription: 'Track punch list resolution across multiple projects. Real-time status from subs. Professional closeout documentation for owners.',
    headline: 'Track every punch item across every project. From anywhere.',
    subheadline: 'You\'re managing closeout on three projects simultaneously. You need to know what\'s done, what\'s stuck, and what\'s going to delay the CO.',
    painPoints: [
      { title: 'No real-time data', description: 'You ask the super for a punchlist update. They walk the floor, check texts, call subs — you get an answer tomorrow.' },
      { title: 'Owner pressure', description: 'The owner wants a closeout status report for their lender. You\'re compiling data from five different sources.' },
      { title: 'CO delays', description: 'Outstanding punch items delay the certificate of occupancy. Every day costs money.' },
    ],
    topFeatures: [
      { title: 'Real-time dashboard', description: 'See punch item counts, resolution rates, and overdue items across all projects. No phone calls needed.' },
      { title: 'Professional closeout docs', description: 'Generate branded PDF reports showing all items found and resolved. Ready for the owner, architect, or lender.' },
      { title: 'Sub accountability', description: 'Every item has a clear owner, submission date, and completion photo. No disputes about what was done when.' },
    ],
    workflow: 'Your superintendent logs punch items during the walkthrough. Subs get Magic Links and start resolving. You check the dashboard — Project A is 80% closed out, Project B has 5 overdue items from the electrician. Send a reminder. Generate the owner\'s closeout report in one tap. Stay on schedule for CO.',
    collaborators: 'Superintendents, subcontractors, owners, architects',
    cta: 'Join the waitlist — closeout tracking that works at your pace.',
  },
  {
    slug: 'construction-managers',
    role: 'Construction Managers',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for Construction Managers | Snaglist',
    metaDescription: 'Oversee punch list closeout across projects and teams. Real-time resolution tracking. Professional documentation for owners and stakeholders.',
    headline: 'Closeout visibility across your entire portfolio.',
    subheadline: 'You\'re overseeing multiple project teams. Snaglist gives you a single view of punch list progress without adding another meeting to anyone\'s calendar.',
    painPoints: [
      { title: 'Inconsistent processes', description: 'Every super tracks punch items differently — some use spreadsheets, some use texts, one uses a legal pad. No standard reporting.' },
      { title: 'Delayed handovers', description: 'Projects miss turnover dates because punch resolution isn\'t tracked systematically. You find out too late.' },
      { title: 'Stakeholder reporting', description: 'Owners and architects want closeout documentation. Compiling it from fragmented records takes your team hours.' },
    ],
    topFeatures: [
      { title: 'Standardised workflow', description: 'Every project uses the same capture → assign → track → report process. Consistent data across all teams.' },
      { title: 'Portfolio visibility', description: 'See resolution rates across all active projects. Identify which ones are at risk of delayed handover.' },
      { title: 'Stakeholder-ready reports', description: 'One-tap branded reports for owners, architects, and stakeholders. Professional documentation with zero admin overhead.' },
    ],
    workflow: 'Your supers log punch items in the field using Snaglist. Subs receive and resolve through Magic Links. You see project-level metrics on the dashboard — resolution rates, overdue items, days to closeout. Flag at-risk projects early. Generate stakeholder reports without asking anyone to compile data.',
    collaborators: 'Superintendents, project managers, owners, architects',
    cta: 'Join the waitlist — portfolio-level punch tracking without the admin.',
  },
  {
    slug: 'architects',
    role: 'Architects',
    market: 'us',
    pattern: 'punch-list',
    metaTitle: 'Punch List App for Architects | Snaglist',
    metaDescription: 'Document deficiencies during walkthroughs with annotated photos. Generate professional reports in one tap. Track contractor resolution.',
    headline: 'Document deficiencies as fast as you spot them.',
    subheadline: 'You\'re doing the substantial completion walkthrough. Every deficiency needs clear documentation. Snaglist keeps you moving without compromising thoroughness.',
    painPoints: [
      { title: 'Slow walkthroughs', description: 'Writing detailed deficiency notes on a clipboard while juggling drawings and a camera. It takes three hours when it should take one.' },
      { title: 'Post-walkthrough admin', description: 'Typing up notes, matching photos to items, formatting the punchlist letter. Hours of office time after every site visit.' },
      { title: 'Tracking resolution', description: 'You issued the punchlist. Did the contractor fix item 23? You won\'t know until the next site visit.' },
    ],
    topFeatures: [
      { title: 'Rapid documentation', description: 'Photograph, annotate on the image, assign to the responsible trade — all while walking. Five seconds per item.' },
      { title: 'Instant punchlist report', description: 'Generate a professional, branded deficiency report immediately after the walkthrough. No hours of formatting.' },
      { title: 'Resolution visibility', description: 'Contractors submit completion photos through Magic Links. See what\'s been addressed before your next visit.' },
    ],
    workflow: 'Walk the project for substantial completion. Log each deficiency — photograph the issue, mark up the image, assign the trade. Generate the punchlist report on-site and send it to the GC before you drive back to the office. Track resolution remotely as subs submit completion evidence through Magic Links.',
    collaborators: 'General contractors, owners, project managers',
    cta: 'Join the waitlist — walkthroughs that don\'t create hours of desk work.',
  },
];

export const allPersonas: Persona[] = [...ukPersonas, ...usPersonas];

export const ukSnaggingPersonas = ukPersonas;
export const usPunchListPersonas = usPersonas;

export function getPersonaBySlug(pattern: 'snagging' | 'punch-list', slug: string): Persona | undefined {
  return allPersonas.find(p => p.pattern === pattern && p.slug === slug);
}
