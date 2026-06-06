/* Screen layout helper + role-based Home + More menu + role switcher. */

function Screen({ bar, children, bottom, fab, bodyClass = "" }) {
  const nav = useNav();
  return (
    <>
      <StatusBar />
      <div className="app-screen">
        {bar}
        <div className={"app-body " + bodyClass}>{children}</div>
        {fab && <div className="wf-fab" onClick={fab.onClick || (() => nav.go(fab.go, fab.params || {}))}>{fab.icon || "+"}</div>}
      </div>
      {bottom}
    </>
  );
}

/* small case row used across screens */
function CaseRow({ id, right, sub }) {
  const c = CASES[id]; const nav = useNav();
  return (
    <Tap row className="row" style={{ padding: "7px 2px", gap: 8 }} onClick={() => nav.go("case", { id })}>
      <Dot k={c.statusK} />
      <div className="grow">
        <div className="row" style={{ gap: 6 }}><span className="b sm">{c.short}</span>{c.prio === "High" && <span className="chip xs hi">HIGH</span>}</div>
        <div className="sm trunc">{c.cap}</div>
        <div className="tiny muted trunc">{sub || (c.type + " · " + c.status)}</div>
      </div>
      {right || <span className="chip xs">{c.next.date}</span>}
    </Tap>
  );
}

function RoleSwitch() {
  const nav = useNav();
  return (
    <span className="role-switch" onClick={() => nav.sheet("role")}>
      <span className="av" style={{ width: 22, height: 22, fontSize: 9 }}>{nav.role.short}</span>
      <span className="b" style={{ fontSize: 13 }}>⌄</span>
    </span>
  );
}

/* ───── Home dispatcher ───── */
function Home() {
  const nav = useNav();
  const r = nav.role.id;
  const Comp = { admin: AdminHome, judge: HomeJudge, chief: HomeChief, clerk: HomeClerk, counsel: HomeCounsel, party: HomeParty }[r];
  return <Comp />;
}

function tiles(items) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
      {items.map((t, i) => (
        <Tap key={i} className={"tile" + (t.variant ? " tile-" + t.variant : "")}
          style={!t.variant && t.border ? { borderColor: "var(--" + t.border + ")" } : {}}
          onClick={t.onClick}>
          <span className="num" style={!t.variant && t.color ? { color: "var(--" + t.color + ")" } : {}}>{t.num}</span>
          <span className="lbl">{t.lbl}</span>
        </Tap>
      ))}
    </div>
  );
}

function HomeJudge() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Good morning" sub="Hon. R. Alvarez · Division 4" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{ requests: 3 }} />}>
      <div className="row" style={{ gap: 7 }}>
        <Tap className="tile grow tile-info" onClick={() => nav.tab("docket")}><span className="num">248</span><span className="lbl">Presiding · my section</span></Tap>
        <Tap className="tile grow tile-slate" onClick={() => nav.go("participating", {})}><span className="num">5</span><span className="lbl">Participating · panels</span></Tap>
      </div>
      <SecLabel right="Courtroom 4B"><span style={{ color: "var(--info)" }}>Presiding · today</span></SecLabel>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <CaseRow id="CV-0912" sub="9:00 · Motion · you preside" right={<span className="chip xs info">9:00</span>} />
        <div className="divide"></div>
        <CaseRow id="CR-1187" sub="10:30 · Arraignment" right={<span className="chip xs warn">10:30</span>} />
        <div className="divide"></div>
        <CaseRow id="FC-0455" sub="13:30 · Status conf." right={<span className="chip xs">1:30</span>} />
      </div>
      <PriorityBoard />
    </Screen>
  );
}

function HomeChief() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Good morning" sub="Chief Judge · court-wide" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{ requests: 3 }} />}>
      {tiles([
        { num: "1,204", lbl: "All cases · 7 sections", variant: "info", onClick: () => nav.tab("docket") },
        { num: "94%",   lbl: "Clearance rate",         variant: "ok",   onClick: () => nav.go("stats", {}) },
        { num: "34",    lbl: "Overdue court-wide",      variant: "urgent" },
        { num: "11",    lbl: "Approvals pending",       variant: "amber" },
      ])}
      <SecLabel>Sections needing attention</SecLabel>
      <div className="sk pad-s tight">
        <div className="row" style={{ padding: "5px 0" }}><Dot k="urgent" /><div className="grow"><div className="sm b">Division 7</div><div className="tiny muted">Backlog 88% · 12 past target</div></div><span className="chip xs urgent">Review</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "5px 0" }}><Dot k="warn" /><div className="grow"><div className="sm b">Division 2</div><div className="tiny muted">3 judges on leave</div></div><span className="chip xs warn">Cover</span></div>
      </div>
      <PriorityBoard />
    </Screen>
  );
}

function HomeClerk() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Good morning" sub="J. Mensah · Clerk · Div 4" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{ requests: 3 }} />}>
      {tiles([
        { num: "14", lbl: "Filings to docket",    variant: "amber",  onClick: () => nav.go("filings", {}) },
        { num: "6",  lbl: "Orders to prepare",    variant: "purple", onClick: () => nav.go("docgen", {}) },
        { num: "9",  lbl: "Requests to process",  variant: "urgent", onClick: () => nav.go("requests", {}) },
        { num: "4",  lbl: "Hearings to set up",   variant: "cyan",   onClick: () => nav.go("schedule", {}) },
      ])}
      <SecLabel>Filings inbox · to docket</SecLabel>
      <Tap className="sk pad-s" onClick={() => nav.go("filings", {})}>
        <div className="row" style={{ padding: "4px 0" }}><Dot k="info" /><span className="grow sm b trunc">Motion for SJ — Mercado</span><span className="chip xs info">Docket</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "4px 0" }}><Dot k="open" /><span className="grow sm trunc">Application to amend — Harlow</span><span className="chip xs">Review</span></div>
      </Tap>
      <PriorityBoard />
    </Screen>
  );
}

function HomeCounsel() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Good morning" sub="A. Lin · Reyes & Cole" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{}} />}>
      <div className="role-pill" style={{ alignSelf: "flex-start" }}><span className="ai-spark">§</span>Counsel · 9 assigned cases</div>
      <PriorityBoard />
      <SecLabel>Next hearing</SecLabel>
      <Tap className="sk pad-s" onClick={() => nav.go("case", { id: "CV-0912" })}>
        <div className="between"><span className="sm b">Mercado v. Northbay</span><span className="chip xs info">Jun 11 · 9:00</span></div>
        <div className="tiny muted">Motion · Courtroom 4B</div>
      </Tap>
      <Tap className="wf-btn info block" onClick={() => nav.go("newSubmission", {})}>＋ New submission</Tap>
    </Screen>
  );
}

function HomeParty() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Good morning" sub="R. Mercado · Claimant" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{}} />}>
      <div className="role-pill" style={{ alignSelf: "flex-start" }}><span className="ai-spark">§</span>2 cases you're a party to</div>
      <SecLabel>Your next hearing</SecLabel>
      <Tap className="sk-2 pad-s" style={{ borderColor: "var(--info)" }} onClick={() => nav.go("case", { id: "CV-0912" })}>
        <div className="between"><span className="sm b">Mercado v. Northbay</span><span className="chip xs info">Jun 11</span></div>
        <div className="tiny muted" style={{ marginTop: 2 }}>9:00 AM · Courtroom 4B · bring witness list</div>
      </Tap>
      <PriorityBoard />
      <Tap className="wf-btn info block" onClick={() => nav.go("newRequest", {})}>File a request</Tap>
    </Screen>
  );
}

/* ───── More menu ───── */
function More() {
  const nav = useNav();
  const item = (ico, label, sub, go) => (
    <Tap row className="row" style={{ padding: "10px 2px", gap: 11 }} onClick={() => go && nav.go(go, {})}>
      <span className="ico-ph" style={{ width: 30, height: 30, fontSize: 13 }}>{ico}</span>
      <div className="grow"><div className="sm b">{label}</div><div className="tiny muted">{sub}</div></div>
      <span className="muted b" style={{ fontSize: 15 }}>›</span>
    </Tap>
  );
  return (
    <Screen bar={<AppBar title="More" sub={nav.role.label + " · " + nav.role.sub} right={<RoleSwitch />} />}
      bottom={<TabBar active="more" badges={{ requests: 3 }} />}>
      <div className="sk pad-s">
        {item("✓", "Tasks", "Your to-dos & deadlines", "tasks")}
        <div className="divide"></div>
        {item("▭", "Documents", "Library, generator & viewer", "documents")}
        <div className="divide"></div>
        {item("▭", "Filings & submissions", "Intake & review", "filings")}
        <div className="divide"></div>
        {item("✎", "Messages", "Chat with judges & staff", "messages")}
        <div className="divide"></div>
        {item("◔", "Notifications", "All alerts", "notifications")}
      </div>
      <div className="sk pad-s">
        {item("§", "People & roles", "Staff, lawyers, parties", "people")}
        <div className="divide"></div>
        {(nav.role.id === "admin" || nav.role.id === "judge" || nav.role.id === "chief" || (nav.role.id === "clerk" && canManageParties("clerk"))) && <>
          {item("⇄", "Access & credentials", nav.role.id === "judge" ? "Section admin · manage parties" : nav.role.id === "clerk" ? "Delegated admin · manage parties" : "Accounts & passwords", "access")}
          <div className="divide"></div>
        </>}
        {item("▦", "Scheduling", "Hearings & clash check", "schedule")}
        <div className="divide"></div>
        {item("◷", "Statistics", "Caseload insight", "stats")}
        <div className="divide"></div>
        {item("✦", "AI assistant", "Scoped to your role", "assistant")}
      </div>
      <Tap className="sk pad-s row" style={{ gap: 11 }} onClick={() => nav.sheet("role")}>
        <span className="ico-ph" style={{ width: 30, height: 30, fontSize: 12 }}>⇄</span>
        <div className="grow"><div className="sm b">Switch role</div><div className="tiny muted">Demo as another user</div></div>
        <span className="chip xs">{nav.role.badge}</span>
      </Tap>
      <Tap className="sk pad-s row" style={{ gap: 11 }} onClick={() => nav.logout()}>
        <span className="ico-ph" style={{ width: 30, height: 30, fontSize: 12, borderColor: "var(--urgent)", color: "var(--urgent)" }}>⏏</span>
        <div className="grow"><div className="sm b" style={{ color: "var(--urgent)" }}>Sign out</div><div className="tiny muted">Return to login</div></div>
      </Tap>
    </Screen>
  );
}

/* Priorities block — shown on EVERY role's dashboard: overdue, pending tasks,
   open requests, ordered by urgency. Role-aware data + tap destinations. */
const PRI = {
  staff: {
    overdue: [{ label: "File reply brief", case: "CV-0912", due: "2d late" }, { label: "Return signed order", case: "FC-0455", due: "1d late" }],
    today: [{ label: "Sign 3 scheduling orders", case: "Multiple", due: "Today" }, { label: "Prep motion hearing", case: "CV-0912", due: "Today" }],
    pending: 5, reqs: 3, reqLabel: "requests to decide",
  },
  counsel: {
    overdue: [{ label: "Reply brief — Mercado", case: "CV-0912", due: "2d late" }],
    today: [{ label: "Disclosure — Harlow", case: "CV-0788", due: "Jun 12" }],
    pending: 3, reqs: 2, reqLabel: "your open requests",
  },
  party: {
    overdue: [{ label: "Submit witness list", case: "CV-0912", due: "Jun 9" }],
    today: [{ label: "Confirm attendance", case: "CV-0912", due: "Jun 10" }],
    pending: 2, reqs: 1, reqLabel: "your open requests",
  },
};
function priBucket(id) { return id === "counsel" ? "counsel" : id === "party" ? "party" : "staff"; }

function PriorityBoard() {
  const nav = useNav();
  const b = PRI[priBucket(nav.role.id)];
  const canCreate = ["admin", "judge", "chief", "clerk"].includes(nav.role.id);
  const caseGo = (c) => () => (CASES[c] ? nav.go("case", { id: c }) : nav.go("tasks", {}));
  return (
    <>
      <SecLabel right={canCreate ? <span className="tap" style={{ color: "var(--info)", fontWeight: 700 }} onClick={() => nav.sheet("create")}>＋ New</span> : "prioritized"}>Priorities</SecLabel>
      <div className="row" style={{ gap: 6, flex: "0 0 auto" }}>
        <Tap className="tile tile-urgent grow center" onClick={() => nav.go("tasks", {})}><div className="b lg">{b.overdue.length}</div><div className="tiny" style={{opacity:.82}}>Overdue</div></Tap>
        <Tap className="tile tile-info grow center" onClick={() => nav.go("tasks", {})}><div className="b lg">{b.pending}</div><div className="tiny" style={{opacity:.82}}>Pending tasks</div></Tap>
        <Tap className="tile tile-amber grow center" onClick={() => nav.go("requests", {})}><div className="b lg">{b.reqs}</div><div className="tiny" style={{opacity:.82}}>Open requests</div></Tap>
      </div>
      <div className="sk pad-s tight">
        {b.overdue.map((t, i) => (
          <React.Fragment key={"o" + i}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={caseGo(t.case)}>
              <Dot k="urgent" /><div className="grow"><div className="sm b trunc">{t.label}</div><div className="tiny muted">{t.case} · overdue</div></div><span className="chip xs urgent">{t.due}</span>
            </Tap>
          </React.Fragment>
        ))}
        <div className="divide"></div>
        <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={() => nav.go("requests", {})}>
          <Dot k="warn" /><span className="grow sm trunc">{b.reqs} {b.reqLabel}</span><span className="chip xs warn">Open</span>
        </Tap>
        {b.today.map((t, i) => (
          <React.Fragment key={"t" + i}>
            <div className="divide"></div>
            <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={caseGo(t.case)}>
              <Dot k="warn" /><span className="grow sm trunc">{t.label}</span><span className="chip xs warn">{t.due}</span>
            </Tap>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { Screen, CaseRow, RoleSwitch, Home, HomeJudge, HomeChief, HomeClerk, HomeCounsel, HomeParty, More, tiles, PriorityBoard });
