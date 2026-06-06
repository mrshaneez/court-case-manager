/* People & Roles ×3 + Requests ×3
   New requirements:
   - One judge = one Section (division). Views scope to a section.
   - Manage staff, judges, lawyers, representatives, law firms, claimants, respondents.
   - Role-based access (who can manage whom).
   - Parties / lawyers / reps / firms file requests (adjournment etc.) within
     cases they are ASSIGNED to; judge / staff review & decide.
*/

/* shared person row */
function Person({ initials, name, role, meta, tag, k }) {
  return (
    <div className="row" style={{ padding: "6px 0" }}>
      <Av style={k ? { borderColor: "var(--" + k + ")" } : {}}>{initials}</Av>
      <div className="grow">
        <div className="sm b trunc">{name}</div>
        <div className="tiny muted trunc">{role}{meta ? " · " + meta : ""}</div>
      </div>
      {tag && <span className={"chip xs " + (tag[1] || "")}>{tag[0]}</span>}
    </div>
  );
}

/* labeled form field */
function Field({ label, children, hint }) {
  return (
    <div className="col" style={{ gap: 3 }}>
      <span className="seclabel">{label}</span>
      {children}
      {hint && <span className="tiny muted">{hint}</span>}
    </div>
  );
}
function Input({ value, ph, right }) {
  return (
    <div className="sk-soft pad-s row" style={{ minHeight: 30 }}>
      <span className={"grow sm" + (value ? " b" : " muted")}>{value || ph}</span>
      {right && <span className="muted sm">{right}</span>}
    </div>
  );
}

/* ═══════════ PEOPLE & ROLES ═══════════ */

/* A · Directory grouped by role — the core people manager */
function PeopleA() {
  return (
    <Phone tab=""
      bar={<WFAppBar title="Directory" sub="Division 4 · 142 people" right={<span className="wf-btn sm">Filter</span>} />}
      fab>
      <WFSearch placeholder="Search people, firms, parties…" />
      <div className="hscroll">
        <Chip cls="solid xs">All</Chip><Chip cls="xs">Staff</Chip><Chip cls="xs">Judges</Chip>
        <Chip cls="xs">Lawyers</Chip><Chip cls="xs">Firms</Chip><Chip cls="xs">Parties</Chip>
      </div>
      <div className="between"><span className="seclabel">Section judge</span></div>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <Person initials="RA" name="Hon. R. Alvarez" role="Presiding judge" meta="Division 4" k="info" tag={["You", "info"]} />
      </div>
      <Note>One judge → one Section. Everyone below belongs to this section.</Note>
      <div className="between"><span className="seclabel">Staff</span><span className="chip xs">8</span></div>
      <div className="sk pad-s">
        <Person initials="JM" name="J. Mensah" role="Court clerk" meta="full access" tag={["Clerk", ""]} />
        <div className="divide"></div>
        <Person initials="DP" name="D. Park" role="Court reporter" meta="docs only" tag={["Staff", ""]} />
      </div>
      <div className="between"><span className="seclabel">Lawyers &amp; firms</span><span className="chip xs">46</span></div>
      <div className="sk pad-s">
        <Person initials="RC" name="Reyes &amp; Cole LLP" role="Law firm" meta="12 attorneys · 23 cases" tag={["Firm", ""]} />
        <div className="divide"></div>
        <Person initials="AL" name="A. Lin" role="Counsel · Reyes &amp; Cole" meta="9 cases" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Access & permissions — role-based access management */
function PeopleB() {
  const Cap = ({ on, children }) => (
    <div className="row tiny" style={{ gap: 5 }}>
      <span className="cbox" style={{ width: 13, height: 13, fontSize: 9, ...(on ? { background: "var(--ok)", borderColor: "var(--ok)", color: "#fff" } : {}) }}>{on ? "✓" : ""}</span>
      <span className={on ? "" : "muted"}>{children}</span>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar back title="Access &amp; roles" sub="Who can do what" right={<span className="wf-btn sm info">Invite</span>} />}>
      <div className="seg"><div className="on">Members</div><div>Roles</div></div>
      <div className="sk pad-s">
        <div className="between"><span className="row" style={{ gap: 6 }}><Av>JM</Av><span className="col"><span className="sm b">J. Mensah</span><span className="tiny muted">jmensah@court.gov</span></span></span><span className="chip xs info">Clerk ▾</span></div>
        <div className="divide" style={{ margin: "7px 0" }}></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Cap on>Manage cases</Cap><Cap on>Schedule hearings</Cap>
          <Cap on>Decide requests</Cap><Cap>Manage people</Cap>
        </div>
      </div>
      <div className="sk pad-s">
        <div className="between"><span className="row" style={{ gap: 6 }}><Av>AL</Av><span className="col"><span className="sm b">A. Lin</span><span className="tiny muted">Reyes &amp; Cole LLP</span></span></span><span className="chip xs">Counsel ▾</span></div>
        <div className="divide" style={{ margin: "7px 0" }}></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Cap on>View assigned cases</Cap><Cap on>File requests</Cap>
          <Cap>Manage cases</Cap><Cap>Decide requests</Cap>
        </div>
      </div>
      <Note>Judge &amp; granted staff manage people &amp; access. Counsel is scoped to assigned cases only.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Firm / party profile — a single record with its people, cases, requests */
function PeopleC() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Message</span>
        <span className="wf-btn sm info grow">Assign to case</span>
      </div>}
      bar={<WFAppBar back title="Reyes &amp; Cole LLP" sub="Law firm · Defense" right={<span className="chip xs">Firm</span>} />}>
      <div className="sk pad-s tight">
        <div className="between sm"><span className="muted">Cases (active)</span><span className="b">23</span></div>
        <div className="between sm"><span className="muted">Attorneys</span><span className="b">12</span></div>
        <div className="between sm"><span className="muted">Open requests</span><span className="b" style={{ color: "#a8651a" }}>3</span></div>
        <div className="between sm"><span className="muted">Contact</span><span className="b">file@reyescole.law</span></div>
      </div>
      <span className="seclabel">Attorneys of record</span>
      <div className="sk pad-s">
        <Person initials="AL" name="A. Lin" role="Lead counsel" meta="9 cases" />
        <div className="divide"></div>
        <Person initials="TR" name="T. Ruiz" role="Associate" meta="5 cases" />
      </div>
      <span className="seclabel">Assigned cases</span>
      <div className="sk pad-s tight">
        <div className="row"><Dot k="info" /><span className="grow sm trunc">CV-0912 Mercado v. Northbay</span><span className="tiny muted">Def.</span></div>
        <div className="row"><Dot k="ok" /><span className="grow sm trunc">CV-0788 Harlow v. Trent</span><span className="tiny muted">Def.</span></div>
      </div>
      <span className="seclabel" style={{ color: "var(--warn)" }}>Pending requests</span>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--warn)" }}>
        <div className="row"><span className="chip xs warn">Adjourn</span><span className="grow sm trunc">CV-0912 · move Jun 11</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ REQUESTS ═══════════ */

/* A · Request inbox (judge / staff) — review & decide */
function ReqA() {
  const Req = ({ type, typeCls, cap, no, who, when, k }) => (
    <div className="sk pad-s">
      <div className="between"><span className={"chip xs " + typeCls}>{type}</span><span className="tiny muted">{when}</span></div>
      <div className="sm b trunc" style={{ margin: "3px 0 1px" }}>{cap}</div>
      <div className="tiny muted trunc">{no} · filed by {who}</div>
      <div className="row" style={{ gap: 6, marginTop: 6 }}>
        <span className="wf-btn sm info">Grant</span><span className="wf-btn sm">Deny</span><span className="wf-btn sm">Open</span>
      </div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar title="Requests" sub="9 pending · Division 4" right={<span className="wf-btn sm">Filter</span>} />}>
      <div className="seg"><div className="on">Pending 9</div><div>Granted</div><div>Denied</div></div>
      <div className="hscroll"><Chip cls="xs">All types</Chip><Chip cls="xs warn">Adjournment</Chip><Chip cls="xs">Extension</Chip><Chip cls="xs">Substitution</Chip></div>
      <Req type="ADJOURNMENT" typeCls="warn" cap="Move motion hearing to Jun 25" no="CV-0912 Mercado" who="A. Lin · Reyes & Cole" when="2h ago" />
      <Req type="EXTENSION" typeCls="info" cap="14-day extension to file reply" no="CV-0788 Harlow" who="T. Ruiz · Reyes & Cole" when="yesterday" />
      <Req type="SUBSTITUTION" typeCls="" cap="Substitute counsel of record" no="FC-0455 Calderon" who="M. Calderon (Pet.)" when="2d ago" />
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Submit a request (party / lawyer perspective) — form */
function ReqB() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm info grow">Submit request</span>
      </div>}
      bar={<WFAppBar back title="New request" sub="as Counsel · Reyes &amp; Cole" right={null} />}>
      <Field label="Case" hint="You only see cases you're assigned to.">
        <Input value="CV-2024-0912 · Mercado v. Northbay" right="▾" />
      </Field>
      <Field label="Request type">
        <div className="row wrap" style={{ gap: 5 }}>
          <Chip cls="solid xs">Adjournment</Chip><Chip cls="xs">Extension</Chip>
          <Chip cls="xs">Substitution</Chip><Chip cls="xs">Transcript</Chip><Chip cls="xs">Other</Chip>
        </div>
      </Field>
      <Field label="Proposed new date">
        <Input value="Jun 25, 2024 · 9:00 AM" right="▦" />
      </Field>
      <Field label="Reason">
        <div className="sk-soft pad-s" style={{ minHeight: 52 }}>
          <Bar w="92%" /><Bar w="80%" style={{ marginTop: 6 }} /><Bar w="55%" cls="lite" style={{ marginTop: 6 }} />
        </div>
      </Field>
      <Field label="Attachment">
        <div className="sk-3 pad-s row center" style={{ justifyContent: "center", gap: 6 }}><span className="b">＋</span><span className="sm muted">Attach supporting doc</span></div>
      </Field>
      <Note>Goes to the section judge / clerk for a decision; opposing counsel is notified.</Note>
    </Phone>
  );
}

/* C · Request detail / thread — decision view */
function ReqC() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Deny</span>
        <span className="wf-btn sm grow">Reschedule</span>
        <span className="wf-btn sm info grow">Grant</span>
      </div>}
      bar={<WFAppBar back title="Adjournment" sub="CV-0912 · Mercado" right={<span className="chip xs warn">Pending</span>} />}>
      <div className="sk pad-s tight">
        <div className="between sm"><span className="muted">Requested by</span><span className="b">A. Lin · Reyes &amp; Cole</span></div>
        <div className="between sm"><span className="muted">Current date</span><span className="b">Jun 11, 9:00 · 4B</span></div>
        <div className="between sm"><span className="muted">Proposed</span><span className="b" style={{ color: "var(--info)" }}>Jun 25, 9:00</span></div>
      </div>
      <span className="seclabel">Reason</span>
      <div className="sk-soft pad-s"><Bar w="95%" /><Bar w="85%" style={{ marginTop: 6 }} /><Bar w="40%" cls="lite" style={{ marginTop: 6 }} /></div>
      <span className="seclabel">Thread</span>
      <div className="tl">
        <div className="node on">
          <div className="row"><span className="b sm">Jun 6</span><span className="chip xs info">Filed</span></div>
          <div className="tiny muted">A. Lin requested adjournment</div>
        </div>
        <div className="node">
          <div className="row"><span className="b sm">Jun 6</span><span className="chip xs">Response</span></div>
          <div className="tiny muted">Pl. R. Mercado — no objection</div>
        </div>
        <div className="node urgent">
          <div className="row"><span className="b sm">Now</span><span className="chip xs urgent">Awaiting you</span></div>
          <div className="tiny muted">Judge decision required</div>
        </div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { PeopleA, PeopleB, PeopleC, ReqA, ReqB, ReqC });
