/* Dashboard ×3 + Docket (case list) ×3 */

/* ───────── helpers local to these screens ───────── */
function DocketRow({ no, cap, parties, k, kk, date, prio }) {
  return (
    <div className="row" style={{ padding: "6px 0" }}>
      <Dot k={k} />
      <div className="grow">
        <div className="row" style={{ gap: 6 }}>
          <span className="b sm">{no}</span>
          {prio && <span className="chip xs hi">{prio}</span>}
        </div>
        <div className="sm trunc">{cap}</div>
        <div className="tiny muted trunc">{parties}</div>
      </div>
      <div className="col" style={{ alignItems: "flex-end", gap: 3 }}>
        <span className={"chip xs " + (kk || "")}>{date}</span>
      </div>
    </div>
  );
}

/* ═══════════ DASHBOARD ═══════════ */

/* A · Command center — dense KPI grid + today's docket + alerts */
function DashA() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="Hon. R. Alvarez · Division 4"
        right={<Av>RA</Av>} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <div className="tile"><span className="num">248</span><span className="lbl">Active cases</span></div>
        <div className="tile"><span className="num">6</span><span className="lbl">Hearings today</span></div>
        <div className="tile" style={{ borderColor: "var(--urgent)" }}><span className="num" style={{ color: "var(--urgent)" }}>12</span><span className="lbl">Deadlines overdue</span></div>
        <div className="tile"><span className="num">9</span><span className="lbl">Open requests</span></div>
      </div>

      <div className="between" style={{ marginTop: 2 }}>
        <span className="seclabel">Today's docket</span>
        <span className="tiny muted">Courtroom 4B</span>
      </div>
      <div className="sk pad-s">
        <DocketRow no="CV-2024-0912" cap="Mercado v. Northbay Ins." parties="9:00 · Motion hearing" k="info" kk="info" date="9:00" prio="HIGH" />
        <div className="divide"></div>
        <DocketRow no="CR-2024-1187" cap="State v. Okafor" parties="10:30 · Arraignment" k="warn" kk="warn" date="10:30" />
        <div className="divide"></div>
        <DocketRow no="FC-2023-0455" cap="In re Calderon" parties="13:30 · Status conf." k="open" kk="" date="1:30" />
      </div>

      <span className="seclabel">Needs attention</span>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--urgent)" }}>
        <div className="row"><Dot k="urgent" /><span className="grow sm trunc b">Brief due — Delgado appeal</span><span className="chip xs urgent solid">2d late</span></div>
        <div className="divide" style={{ margin: "6px 0" }}></div>
        <div className="row"><Dot k="warn" /><span className="grow sm trunc">Sign 3 orders · Calderon, Pham…</span><span className="chip xs warn">today</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Agenda-first — today timeline is the hero, stats as a footer strip */
function DashB() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Today" sub="Tue, 11 June" right={<Chip cls="info">6 events</Chip>} />}>
      <div className="seg" style={{ marginBottom: 2 }}>
        <div className="on">Today</div><div>Week</div><div>Mine</div>
      </div>
      <div className="tl" style={{ marginTop: 2 }}>
        <div className="node on">
          <div className="row"><span className="b sm">9:00</span><span className="chip xs info">Hearing</span></div>
          <div className="sm trunc">Mercado v. Northbay — Motion</div>
          <div className="tiny muted">Courtroom 4B · 4 parties</div>
        </div>
        <div className="node urgent">
          <div className="row"><span className="b sm">11:00</span><span className="chip xs urgent">Deadline</span></div>
          <div className="sm trunc">File pre-trial order · Okafor</div>
        </div>
        <div className="node">
          <div className="row"><span className="b sm">10:30</span><span className="chip xs">Arraign.</span></div>
          <div className="sm trunc">State v. Okafor</div>
          <div className="tiny muted">Courtroom 2A</div>
        </div>
        <div className="node">
          <div className="row"><span className="b sm">1:30</span><span className="chip xs">Conf.</span></div>
          <div className="sm trunc">In re Calderon — Status</div>
        </div>
      </div>
      <div className="row" style={{ gap: 6, marginTop: "auto" }}>
        <div className="sk-soft pad-s grow center"><div className="b lg">248</div><div className="tiny muted">Active</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>12</div><div className="tiny muted">Overdue</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">9</div><div className="tiny muted">Requests</div></div>
      </div>
    </Phone>
  );
}

/* C · Triage feed — action inbox grouped by what needs a decision */
function DashC() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Action inbox" sub="27 items need you" right={<Av>RA</Av>} />}>
      <div className="seg">
        <div className="on">Deadlines 12</div><div>Requests 9</div><div>Sign 6</div>
      </div>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--urgent)" }}>
        <div className="between"><span className="chip xs urgent solid">OVERDUE 2d</span><span className="tiny muted">CV-0912</span></div>
        <div className="sm b" style={{ margin: "3px 0" }}>Reply brief — Delgado appeal</div>
        <div className="row" style={{ gap: 6 }}><span className="wf-btn sm solid">Review</span><span className="wf-btn sm">Reassign</span><span className="wf-btn sm">Extend</span></div>
      </div>
      <div className="sk pad-s">
        <div className="between"><span className="chip xs warn">Due today</span><span className="tiny muted">FC-0455</span></div>
        <div className="sm b" style={{ margin: "3px 0" }}>Continuance request — Calderon</div>
        <div className="row" style={{ gap: 6 }}><span className="wf-btn sm info">Grant</span><span className="wf-btn sm">Deny</span><span className="wf-btn sm">Open</span></div>
      </div>
      <div className="sk pad-s">
        <div className="between"><span className="chip xs">In 3 days</span><span className="tiny muted">CR-1187</span></div>
        <div className="sm b" style={{ margin: "3px 0" }}>Sign scheduling order — Okafor</div>
        <div className="row" style={{ gap: 6 }}><span className="wf-btn sm info">Sign</span><span className="wf-btn sm">Open file</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ DOCKET (case list) ═══════════ */

/* A · Dense list — filter chips + scannable rows, power-user */
function DocketA() {
  return (
    <Phone tab="docket"
      bar={<WFAppBar title="Docket" sub="248 active" right={<span className="wf-btn sm">Filter</span>} />}
      fab>
      <WFSearch placeholder="Search caption, no., party…" />
      <div className="row wrap" style={{ gap: 5 }}>
        <Chip cls="solid xs">All</Chip><Chip cls="xs">Civil</Chip><Chip cls="xs">Criminal</Chip>
        <Chip cls="xs">Family</Chip><Chip cls="xs info">▾ Status</Chip><Chip cls="xs">▾ Court</Chip>
      </div>
      <div className="between"><span className="tiny muted">Sorted: next hearing ↑</span><span className="tiny muted">248 results</span></div>
      <div className="sk pad-s" style={{ flex: 1 }}>
        <DocketRow no="CV-2024-0912" cap="Mercado v. Northbay Ins." parties="Pl. R. Mercado · 4 parties" k="info" kk="info" date="Jun 11" prio="HIGH" />
        <div className="divide"></div>
        <DocketRow no="CR-2024-1187" cap="State v. Okafor" parties="Def. D. Okafor · custody" k="warn" kk="warn" date="Jun 11" />
        <div className="divide"></div>
        <DocketRow no="FC-2023-0455" cap="In re Calderon" parties="Pet. M. Calderon" k="open" kk="" date="Jun 14" />
        <div className="divide"></div>
        <DocketRow no="CV-2024-0788" cap="Harlow LLC v. Trent" parties="Pl. Harlow LLC · 6 parties" k="ok" kk="ok" date="Jun 18" prio="" />
        <div className="divide"></div>
        <DocketRow no="PR-2024-0231" cap="Estate of Nguyen" parties="Probate · 3 parties" k="open" kk="" date="Jun 21" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Grouped by status — segmented control + collapsible status groups */
function DocketB() {
  return (
    <Phone tab="docket"
      bar={<WFAppBar title="Docket" sub="By status" right={<span className="wf-btn sm">＋</span>} />}
      fab>
      <WFSearch placeholder="Search docket…" />
      <div className="hscroll">
        <Chip cls="solid xs">All 248</Chip><Chip cls="xs">Awaiting 42</Chip><Chip cls="xs">In hearing 18</Chip><Chip cls="xs">Judgment 11</Chip>
      </div>
      <div className="between"><span className="seclabel">⌄ Awaiting hearing</span><span className="chip xs warn">42</span></div>
      <div className="sk pad-s">
        <DocketRow no="CV-2024-0912" cap="Mercado v. Northbay" parties="Next: Jun 11 · 4B" k="warn" kk="warn" date="3d" prio="HIGH" />
        <div className="divide"></div>
        <DocketRow no="FC-2023-0455" cap="In re Calderon" parties="Next: Jun 14 · 2A" k="open" kk="" date="6d" />
      </div>
      <div className="between"><span className="seclabel">⌄ In hearing</span><span className="chip xs info">18</span></div>
      <div className="sk pad-s">
        <DocketRow no="CR-2024-1187" cap="State v. Okafor" parties="Day 2 of 5 · 2A" k="info" kk="info" date="now" />
      </div>
      <div className="between"><span className="seclabel">› Judgment pending</span><span className="chip xs">11</span></div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Priority cards — big cards w/ priority spine, countdown & progress */
function DocketC() {
  const Card = ({ spine, no, cap, parties, stage, prog, due, dueCls, prio }) => (
    <div className="sk pad-s" style={{ position: "relative", overflow: "hidden", paddingLeft: 12 }}>
      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: spine }}></span>
      <div className="between"><span className="b sm">{no}</span>{prio && <span className="chip xs hi">{prio}</span>}</div>
      <div className="sm b trunc" style={{ margin: "1px 0" }}>{cap}</div>
      <div className="tiny muted trunc">{parties}</div>
      <div className="prog" style={{ margin: "6px 0 4px" }}><i style={{ width: prog }}></i></div>
      <div className="between"><span className="tiny muted">{stage}</span><span className={"chip xs " + dueCls}>{due}</span></div>
    </div>
  );
  return (
    <Phone tab="docket"
      bar={<WFAppBar title="Docket" sub="Priority view" right={<span className="wf-btn sm">⚲</span>} />}
      fab>
      <Card spine="var(--urgent)" no="CV-2024-0912" cap="Mercado v. Northbay Ins." parties="Pl. R. Mercado · Div. 4" stage="Stage: Motions" prog="40%" due="Hearing in 3d" dueCls="urgent" prio="HIGH" />
      <Card spine="var(--warn)" no="CR-2024-1187" cap="State v. Okafor" parties="Def. D. Okafor · custody" stage="Stage: Trial" prog="65%" due="Active" dueCls="warn" />
      <Card spine="var(--ok)" no="CV-2024-0788" cap="Harlow LLC v. Trent" parties="Pl. Harlow LLC · 6 parties" stage="Stage: Discovery" prog="25%" due="Jun 18" dueCls="ok" />
      <div className="fade-b"></div>
    </Phone>
  );
}

/* D · Presiding vs participating — judge dashboard split by role on the case */
function DashD() {
  return (
    <Phone tab="home"
      bar={<WFAppBar title="Good morning" sub="Hon. R. Alvarez · Division 4" right={<Av style={{ borderColor: "var(--info)" }}>RA</Av>} />}>
      <div className="row" style={{ gap: 7 }}>
        <div className="tile grow" style={{ borderColor: "var(--info)" }}><span className="num">248</span><span className="lbl">Presiding · my section</span></div>
        <div className="tile grow"><span className="num">5</span><span className="lbl">Participating · panels</span></div>
      </div>

      <div className="between" style={{ marginTop: 2 }}>
        <span className="seclabel" style={{ color: "var(--info)" }}>Presiding · today</span>
        <span className="tiny muted">Courtroom 4B</span>
      </div>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <DocketRow no="CV-2024-0912" cap="Mercado v. Northbay" parties="9:00 · Motion · you preside" k="info" kk="info" date="9:00" prio="HIGH" />
        <div className="divide"></div>
        <DocketRow no="CR-2024-1187" cap="State v. Okafor" parties="10:30 · Arraignment" k="warn" kk="warn" date="10:30" />
        <div className="divide"></div>
        <DocketRow no="FC-2023-0455" cap="In re Calderon" parties="13:30 · Status conf." k="open" kk="" date="1:30" />
      </div>

      <div className="between">
        <span className="seclabel">Participating · panels</span>
        <span className="tiny muted">other sections</span>
      </div>
      <div className="sk pad-s">
        <DocketRow no="FC-2024-0501" cap="In re Vance (Div 7)" parties="Panel of 3 · Hon. Boateng presiding" k="open" kk="" date="Jun 13" />
        <div className="divide"></div>
        <DocketRow no="CV-2024-0667" cap="Okonjo v. State (Div 2)" parties="Panel of 3 · sitting judge" k="ok" kk="ok" date="Jun 19" />
      </div>
      <Note>Cases you preside over (your section) stay separate from panels you only sit on elsewhere.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { DashA, DashB, DashC, DashD, DocketA, DocketB, DocketC });
