/* Shared data model for the connected prototype. Exported to window. */

const ROLES = {
  admin:   { id: "admin",   name: "Global Admin",    short: "GA", label: "Global Admin",  sub: "System administrator", badge: "Admin", privileged: true },
  judge:   { id: "judge",   name: "Hon. R. Alvarez", short: "RA", label: "Judge",        sub: "Division 4",          badge: "Judge" },
  chief:   { id: "chief",   name: "Chief Judge",     short: "CJ", label: "Chief Judge",  sub: "Court-wide",          badge: "Chief" },
  clerk:   { id: "clerk",   name: "J. Mensah",       short: "JM", label: "Clerk",         sub: "Division 4 · staff",  badge: "Clerk" },
  counsel: { id: "counsel", name: "A. Lin",          short: "AL", label: "Counsel",       sub: "Reyes & Cole LLP",    badge: "Counsel" },
  party:   { id: "party",   name: "R. Mercado",      short: "RM", label: "Claimant",      sub: "Self-represented",    badge: "Party" },
};
const ADMIN_PASSWORD = "Shan1828";

/* Sign-in accounts — email + password (admin-provisioned). */
const ACCOUNTS = [
  { email: "admin@court.gov",        pw: "Shan1828",   role: "admin" },
  { email: "r.alvarez@court.gov",    pw: "judge123",   role: "judge" },
  { email: "chief@court.gov",        pw: "chief123",   role: "chief" },
  { email: "j.mensah@court.gov",     pw: "clerk123",   role: "clerk" },
  { email: "a.lin@reyescole.law",    pw: "counsel123", role: "counsel" },
  { email: "r.mercado@mail.com",     pw: "party123",   role: "party" },
];

/* Accounts the section admin (judge) / delegated staff manage. */
const USERS = [
  { id: "u4", name: "J. Mensah",     email: "j.mensah@court.gov",  role: "Court clerk",    case: "—", status: "Active",  pw: true,  staff: true, sectionAdmin: true },
  { id: "u5", name: "D. Park",       email: "d.park@court.gov",    role: "Court reporter", case: "—", status: "Active",  pw: true,  staff: true, sectionAdmin: false },
  { id: "u1", name: "R. Mercado",    email: "r.mercado@mail.com",  role: "Claimant",       case: "CV-0912", status: "Active",  pw: true },
  { id: "u2", name: "A. Lin",        email: "a.lin@reyescole.law", role: "Counsel",        case: "CV-0912", status: "Active",  pw: true },
  { id: "u3", name: "Northbay Ins.", email: "legal@northbay.com",  role: "Respondent",     case: "CV-0912", status: "Invited", pw: false },
  { id: "u6", name: "M. Calderon",   email: "m.calderon@mail.com", role: "Petitioner",     case: "FC-0455", status: "Invited", pw: false },
];

/* sections & courtrooms (admin-managed) */
const SECTIONS = [
  { name: "Division 4", judge: "Hon. R. Alvarez", cases: 248, k: "info" },
  { name: "Division 7", judge: "Hon. K. Boateng", cases: 190, k: "urgent" },
  { name: "Division 2", judge: "Hon. M. Cruz", cases: 156, k: "warn" },
  { name: "Family Division", judge: "Hon. L. Pham", cases: 156, k: "ok" },
];
const COURTROOMS = [
  { name: "Courtroom 4B", cap: 48, status: "In session", k: "info", util: 80 },
  { name: "Courtroom 2A", cap: 32, status: "Available", k: "ok", util: 45 },
  { name: "Courtroom 3C", cap: 60, status: "Maintenance", k: "warn", util: 0 },
];

/* sample docket */
const CASES = {
  "CV-0912": {
    no: "CV-2024-0912", short: "CV-0912", cap: "Mercado v. Northbay Ins.",
    type: "Civil", section: "Division 4", status: "Awaiting hearing", statusK: "info",
    stage: "Motions", prio: "High", priK: "hi", judge: "Hon. R. Alvarez", room: "4B",
    opened: "14 Mar 2024", daysOpen: 89, target: "Sep 30", filings: 23, progress: 40,
    next: { date: "Jun 11", time: "9:00 AM", room: "4B", kind: "Motion hearing" },
    parties: [
      { side: "Claimant", name: "R. Mercado", role: "Plaintiff · self-rep", init: "RM" },
      { side: "Respondent", name: "Northbay Ins.", role: "Defendant", init: "NB" },
      { side: "Respondent", name: "A. Lin", role: "Counsel · Reyes & Cole", init: "AL" },
    ],
    deadlines: [
      { label: "Reply brief due", sub: "Filing", date: "Jun 9", k: "urgent" },
      { label: "Discovery cutoff", sub: "Court-ordered", date: "Jul 15", k: "warn" },
      { label: "Target disposition", sub: "Case target", date: "Sep 30", k: "open" },
    ],
    timeline: [
      { date: "Jun 9", tag: "Deadline", k: "urgent", text: "Reply brief due" },
      { date: "Jun 2", tag: "Filing", k: "on", text: "Motion to compel — Reyes & Cole" },
      { date: "May 20", tag: "Order", k: "", text: "Scheduling order entered" },
      { date: "Mar 14", tag: "Open", k: "", text: "Complaint filed" },
    ],
  },
  "CR-1187": {
    no: "CR-2024-1187", short: "CR-1187", cap: "State v. Okafor",
    type: "Criminal", section: "Division 4", status: "In trial", statusK: "warn",
    stage: "Trial", prio: "Normal", priK: "", judge: "Hon. R. Alvarez", room: "2A",
    opened: "2 Apr 2024", daysOpen: 65, target: "Aug 15", filings: 41, progress: 65,
    next: { date: "Jun 11", time: "10:30 AM", room: "2A", kind: "Arraignment" },
    parties: [
      { side: "Claimant", name: "The State", role: "Prosecution", init: "ST" },
      { side: "Respondent", name: "D. Okafor", role: "Defendant · custody", init: "DO" },
    ],
    deadlines: [{ label: "Pre-trial order", sub: "Filing", date: "Jun 11", k: "warn" }],
    timeline: [
      { date: "Jun 11", tag: "Hearing", k: "on", text: "Arraignment" },
      { date: "Apr 2", tag: "Open", k: "", text: "Charges filed" },
    ],
  },
  "FC-0455": {
    no: "FC-2023-0455", short: "FC-0455", cap: "In re Calderon",
    type: "Family", section: "Division 4", status: "Awaiting hearing", statusK: "open",
    stage: "Status", prio: "Normal", priK: "", judge: "Hon. R. Alvarez", room: "4B",
    opened: "10 Nov 2023", daysOpen: 210, target: "Jun 30", filings: 12, progress: 55,
    next: { date: "Jun 14", time: "1:30 PM", room: "4B", kind: "Status conference" },
    parties: [{ side: "Claimant", name: "M. Calderon", role: "Petitioner", init: "MC" }],
    deadlines: [{ label: "Status conference", sub: "Hearing", date: "Jun 14", k: "open" }],
    timeline: [{ date: "Jun 14", tag: "Conf.", k: "on", text: "Status conference" }],
  },
  "CV-0788": {
    no: "CV-2024-0788", short: "CV-0788", cap: "Harlow LLC v. Trent",
    type: "Civil", section: "Division 4", status: "Discovery", statusK: "ok",
    stage: "Discovery", prio: "Normal", priK: "", judge: "Hon. R. Alvarez", room: "4B",
    opened: "20 Apr 2024", daysOpen: 47, target: "Oct 1", filings: 9, progress: 25,
    next: { date: "Jun 18", time: "9:30 AM", room: "4B", kind: "Pre-trial" },
    parties: [{ side: "Claimant", name: "Harlow LLC", role: "Plaintiff", init: "HL" }],
    deadlines: [{ label: "Disclosure", sub: "Filing", date: "Jun 12", k: "warn" }],
    timeline: [{ date: "Apr 20", tag: "Open", k: "", text: "Complaint filed" }],
  },
};
const CASE_ORDER = ["CV-0912", "CR-1187", "FC-0455", "CV-0788"];

/* Lifecycle stages per case — for the progress timeline (with per-stage days). */
const STAGES = {
  "CV-0912": [
    { label: "Filed", date: "Mar 14", status: "done", dur: "—" },
    { label: "Service of process", date: "Mar 28", status: "done", dur: "14d" },
    { label: "Discovery", date: "Apr 20", status: "done", dur: "23d" },
    { label: "Motions", date: "Jun 2", status: "current", dur: "43d so far" },
    { label: "Trial", date: "Aug 12", status: "upcoming", dur: "est." },
    { label: "Judgment", date: "Sep 30", status: "upcoming", dur: "target" },
  ],
  "CR-1187": [
    { label: "Charges filed", date: "Apr 2", status: "done", dur: "—" },
    { label: "Arraignment", date: "Jun 11", status: "current", dur: "70d so far" },
    { label: "Pre-trial", date: "Jul", status: "upcoming", dur: "est." },
    { label: "Trial", date: "Aug 15", status: "upcoming", dur: "target" },
  ],
  "FC-0455": [
    { label: "Petition filed", date: "Nov 10", status: "done", dur: "—" },
    { label: "Mediation", date: "Feb 2", status: "done", dur: "84d" },
    { label: "Status conference", date: "Jun 14", status: "current", dur: "132d so far" },
    { label: "Final order", date: "Jun 30", status: "upcoming", dur: "target" },
  ],
  "CV-0788": [
    { label: "Filed", date: "Apr 20", status: "done", dur: "—" },
    { label: "Discovery", date: "May 30", status: "current", dur: "40d so far" },
    { label: "Pre-trial", date: "Jun 18", status: "upcoming", dur: "est." },
    { label: "Judgment", date: "Oct 1", status: "upcoming", dur: "target" },
  ],
};

/* Shared people directory — a person/firm added once is reusable across cases.
   `cases` lists every case the entry already appears in (court-wide). */
const DIRECTORY = [
  { name: "R. Mercado",      email: "r.mercado@mail.com",   role: "Claimant",   cases: ["CV-0912", "SC-0210"] },
  { name: "A. Lin",          email: "a.lin@reyescole.law",  role: "Counsel",    cases: ["CV-0912", "CV-0788", "CR-1187"] },
  { name: "Reyes & Cole LLP", email: "file@reyescole.law",  role: "Law firm",   cases: ["CV-0912", "CV-0788", "FC-0455", "+20"] },
  { name: "Northbay Ins.",   email: "legal@northbay.com",   role: "Respondent", cases: ["CV-0912", "CV-0640"] },
  { name: "T. Ruiz",         email: "t.ruiz@reyescole.law", role: "Counsel",    cases: ["CV-0788"] },
  { name: "M. Calderon",     email: "m.calderon@mail.com",  role: "Petitioner", cases: ["FC-0455"] },
];

/* tasks */
const TASKS = [
  { id: "t1", label: "File reply brief", case: "CV-0912", start: "Jun 2", due: "Jun 9", elapsed: 80, k: "urgent", group: "Overdue", done: false, prio: "High" },
  { id: "t2", label: "Return signed order", case: "FC-0455", start: "Jun 4", due: "Jun 8", elapsed: 100, k: "urgent", group: "Overdue", done: false },
  { id: "t3", label: "Prep motion hearing", case: "CV-0912", start: "Jun 5", due: "Today", elapsed: 70, k: "warn", group: "Today", done: false, prio: "High" },
  { id: "t4", label: "Review continuance request", case: "CR-1187", start: "Jun 6", due: "Today", elapsed: 55, k: "warn", group: "Today", done: false },
  { id: "t5", label: "Sign 3 scheduling orders", case: "Multiple", start: "Jun 6", due: "Today", elapsed: 60, k: "warn", group: "Today", done: false },
  { id: "t6", label: "Draft findings", case: "FC-0455", start: "Jun 1", due: "Jun 16", elapsed: 100, k: "open", group: "This week", done: true },
];

/* requests */
const REQUESTS = [
  { id: "r1", type: "ADJOURNMENT", typeK: "warn", title: "Move motion hearing to Jun 25", case: "CV-0912", who: "A. Lin · Reyes & Cole", when: "2h ago", status: "Pending" },
  { id: "r2", type: "EXTENSION", typeK: "info", title: "14-day extension to file reply", case: "CV-0788", who: "T. Ruiz · Reyes & Cole", when: "yesterday", status: "Pending" },
  { id: "r3", type: "SUBSTITUTION", typeK: "", title: "Substitute counsel of record", case: "FC-0455", who: "M. Calderon", when: "2d ago", status: "Pending" },
];

/* filings intake */
const FILINGS = [
  { id: "f1", type: "MOTION", typeK: "info", title: "Motion for summary judgment", case: "CV-0912", who: "A. Lin · Reyes & Cole", when: "20m ago" },
  { id: "f2", type: "APPLICATION", typeK: "warn", title: "Application to amend pleadings", case: "CV-0788", who: "T. Ruiz · Reyes & Cole", when: "1h ago" },
  { id: "f3", type: "SUBMISSION", typeK: "", title: "Written submissions — liability", case: "FC-0455", who: "M. Calderon", when: "2h ago" },
];

/* documents */
const DOCS = [
  { id: "d1", ext: "PDF", name: "Motion to compel.pdf", case: "CV-0912", meta: "2 Jun · Reyes & Cole", tag: "New", tagK: "info" },
  { id: "d2", ext: "PDF", name: "Scheduling order.pdf", case: "CV-0912", meta: "20 May · signed", tag: "Signed", tagK: "ok" },
  { id: "d3", ext: "DOC", name: "Reply brief — draft.docx", case: "CV-0912", meta: "you · 1d ago", tag: "Draft", tagK: "" },
  { id: "d4", ext: "JPG", name: "Exhibit 14 — scene.jpg", case: "CR-1187", meta: "evidence", tag: "", tagK: "" },
  { id: "d5", ext: "PDF", name: "Arraignment minutes.pdf", case: "CR-1187", meta: "28 May", tag: "", tagK: "" },
];

/* notifications */
const NOTIFS = [
  { id: "n1", ico: "⏰", k: "urgent", title: "Deadline overdue", body: "Reply brief — CV-0912 is 2 days late", when: "2h ago", unread: true, go: ["case", { id: "CV-0912" }] },
  { id: "n2", ico: "⚠", k: "warn", title: "Scheduling clash", body: "A. Lin double-booked Jun 11 · confirm to proceed", when: "3h ago", unread: true, go: ["schedule", {}] },
  { id: "n3", ico: "▭", k: "info", title: "New filing to docket", body: "Motion for SJ filed by A. Lin · CV-0912", when: "4h ago", unread: true, go: ["filings", {}] },
  { id: "n4", ico: "⇄", k: "", title: "Adjournment request", body: "Calderon — move hearing to Jun 25", when: "5h ago", unread: false, go: ["requests", {}] },
  { id: "n5", ico: "✓", k: "ok", title: "Request granted", body: "Extension on CV-0788 was granted", when: "1d ago", unread: false, go: ["requests", {}] },
];

/* messages */
const CHATS = [
  { id: "c1", init: "JM", name: "J. Mensah", role: "Clerk", last: "The Calderon order is ready for signature.", when: "9:12", unread: true, tag: "CV-0912" },
  { id: "c2", init: "KB", name: "Hon. K. Boateng", role: "Judge · Div 7", last: "Can you cover the panel on FC-0455?", when: "8:40", unread: true, k: "info" },
  { id: "c3", init: "DP", name: "D. Park", role: "Court reporter", last: "ޓްރާންސްކްރިޕްޓް ޑޮކެޓަށް އަޕްލޯޑްކޮށްފިން", when: "Yest", dv: true, tag: "ދިވެހި" },
];

Object.assign(window, { ROLES, ADMIN_PASSWORD, ACCOUNTS, USERS, DIRECTORY, SECTIONS, COURTROOMS, STAGES, CASES, CASE_ORDER, TASKS, REQUESTS, FILINGS, DOCS, NOTIFS, CHATS });
