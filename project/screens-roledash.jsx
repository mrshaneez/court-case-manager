/* Role-based Dashboards — the home screen adapts to the signed-in role.
   Chief Judge · Judge (presiding/participating, see DashD) · Clerk/Staff ·
   Counsel/Lawyer · Party. Each surfaces what THAT role acts on, scope-respecting.
*/

/* local compact row */
function RRow({ k, title, sub, tag, tagK }) {
  return (
    <div className="row" style={{ padding: "5px 0", gap: 8 }}>
      {k && <Dot k={k} />}
      <div className="grow"><div className="sm b trunc">{title}</div>{sub && <div className="tiny muted trunc">{sub}</div>}</div>
      {tag && <span className={"chip xs " + (tagK || "")}>{tag}</span>}
    </div>
  );
}

/* ═══════════ Chief Judge ═══════════ */
function DashChief() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="Chief Judge · court-wide" right={<span className="chip xs solid">Chief</span>} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <div className="tile"><span className="num">1,204</span><span className="lbl">All cases · 7 sections</span></div>
        <div className="tile"><span className="num">94<span style={{ fontSize: 12 }}>%</span></span><span className="lbl">Clearance rate</span></div>
        <div className="tile" style={{ borderColor: "var(--urgent)" }}><span className="num" style={{ color: "var(--urgent)" }}>34</span><span className="lbl">Overdue court-wide</span></div>
        <div className="tile"><span className="num">11</span><span className="lbl">Approvals pending</span></div>
      </div>
      <span className="seclabel">Sections needing attention</span>
      <div className="sk pad-s tight">
        <RRow k="urgent" title="Division 7" sub="Backlog 88% · 12 cases past target" tag="Review" tagK="urgent" />
        <div className="divide"></div>
        <RRow k="warn" title="Division 2" sub="3 judges on leave next week" tag="Cover" tagK="warn" />
      </div>
      <span className="seclabel">For your decision</span>
      <div className="sk pad-s tight">
        <RRow k="info" title="Reassign panel — In re Vance" sub="Div 7 · recusal" tag="Assign" tagK="info" />
        <div className="divide"></div>
        <RRow k="open" title="Approve new courtroom (3D)" sub="Admin request" tag="Open" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ Clerk / Staff ═══════════ */
function DashClerk() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="J. Mensah · Clerk · Div 4" right={<Av>JM</Av>} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <div className="tile"><span className="num">14</span><span className="lbl">Filings to docket</span></div>
        <div className="tile"><span className="num">6</span><span className="lbl">Orders to prepare</span></div>
        <div className="tile" style={{ borderColor: "var(--warn)" }}><span className="num" style={{ color: "#a8651a" }}>9</span><span className="lbl">Requests to process</span></div>
        <div className="tile"><span className="num">4</span><span className="lbl">Hearings to set up</span></div>
      </div>
      <span className="seclabel">Filings inbox · to docket</span>
      <div className="sk pad-s tight">
        <RRow k="info" title="Motion for SJ — Mercado" sub="A. Lin · 20m ago" tag="Docket" tagK="info" />
        <div className="divide"></div>
        <RRow k="open" title="Application to amend — Harlow" sub="T. Ruiz · 1h ago" tag="Review" />
      </div>
      <span className="seclabel">Awaiting signature</span>
      <div className="sk-2 pad-s tight" style={{ borderColor: "var(--warn)" }}>
        <RRow title="Scheduling order — Calderon" sub="prepared · send to judge" tag="Send" tagK="warn" />
      </div>
      <Note>Staff dashboard is a work queue — what to docket, prepare, process &amp; schedule today.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ Counsel / Lawyer ═══════════ */
function DashCounsel() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="A. Lin · Reyes &amp; Cole" right={<Av>AL</Av>} />}>
      <div className="role-pill" style={{ alignSelf: "flex-start" }}><span className="ai-spark">§</span>Counsel · 9 assigned cases</div>
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>3</div><div className="tiny muted">Deadlines</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">2</div><div className="tiny muted">Filings out</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">1</div><div className="tiny muted">Today</div></div>
      </div>
      <span className="seclabel" style={{ color: "var(--urgent)" }}>My deadlines</span>
      <div className="sk-2 pad-s tight" style={{ borderColor: "var(--urgent)" }}>
        <RRow k="urgent" title="Reply brief — Mercado" sub="CV-0912" tag="2d late" tagK="urgent" />
        <div className="divide"></div>
        <RRow k="warn" title="Disclosure — Harlow" sub="CV-0788" tag="Jun 12" tagK="warn" />
      </div>
      <span className="seclabel">Next hearing</span>
      <div className="sk pad-s">
        <div className="between"><span className="sm b">Mercado v. Northbay</span><span className="chip xs info">Jun 11 · 9:00</span></div>
        <div className="tiny muted">Motion · Courtroom 4B · Hon. Alvarez</div>
      </div>
      <span className="seclabel">My filings</span>
      <div className="sk pad-s tight">
        <RRow title="Motion for SJ" sub="CV-0912" tag="Under review" tagK="warn" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ Party (claimant / respondent) ═══════════ */
function DashParty() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="R. Mercado · Claimant" right={<Av>RM</Av>} />}>
      <div className="role-pill" style={{ alignSelf: "flex-start" }}><span className="ai-spark">§</span>2 cases you're a party to</div>
      <span className="seclabel">Your next hearing</span>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="between"><span className="sm b">Mercado v. Northbay</span><span className="chip xs info">Jun 11</span></div>
        <div className="tiny muted" style={{ marginTop: 2 }}>9:00 AM · Courtroom 4B · bring witness list</div>
      </div>
      <span className="seclabel">Action needed</span>
      <div className="sk pad-s tight">
        <div className="row" style={{ padding: "4px 0" }}><span className="cbox"></span><span className="grow sm b trunc">Submit witness list</span><span className="chip xs urgent">Jun 9</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "4px 0" }}><span className="cbox"></span><span className="grow sm trunc">Confirm attendance</span><span className="chip xs warn">Jun 10</span></div>
      </div>
      <span className="seclabel">Case status</span>
      <div className="sk pad-s tight">
        <RRow k="info" title="Mercado v. Northbay" sub="CV-0912 · Awaiting hearing" tag="On track" tagK="info" />
        <div className="divide"></div>
        <RRow k="ok" title="Mercado v. City Parking" sub="SC-0210 · Judgment" tag="Closed" tagK="ok" />
      </div>
      <Note>A party sees only their own cases, next steps &amp; what's shared with them.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { DashChief, DashClerk, DashCounsel, DashParty });
