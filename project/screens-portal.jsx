/* Party / Counsel Portal ×3 — the EXTERNAL signed-in view.
   When a party / lawyer / representative / claimant / respondent signs in
   they see ONLY: their assigned cases, each case's status, and the documents
   & tasks explicitly shared/assigned to them. Everything else is hidden.
   A · My cases (home)
   B · Case status (external)
   C · Shared documents & tasks
*/

/* simplified portal bottom nav */
function PortalNav({ active = "cases" }) {
  const tabs = [["cases", "My cases", "⌂"], ["docs", "Documents", "▭"], ["tasks", "Tasks", "✓"], ["req", "Requests", "⇄"]];
  return (
    <div className="wf-tabbar">
      {tabs.map(([k, label, ico]) => (
        <div key={k} className={"tab" + (k === active ? " on" : "")}>
          <span className="ico">{ico}</span><span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ A · My cases (party home) ═══════════ */
function PortalA() {
  const CaseCard = ({ no, cap, role, status, statusK, next }) => (
    <div className="sk pad-s">
      <div className="between"><span className="b sm">{no}</span><span className={"chip xs " + statusK}>{status}</span></div>
      <div className="sm b trunc" style={{ margin: "2px 0 1px" }}>{cap}</div>
      <div className="tiny muted">Your role: {role}</div>
      <div className="divide" style={{ margin: "6px 0 5px" }}></div>
      <div className="between"><span className="tiny muted">{next}</span><span className="wf-btn sm">View</span></div>
    </div>
  );
  return (
    <Phone tab="" bottom={<PortalNav active="cases" />}
      bar={<WFAppBar title="My cases" sub="Signed in · R. Mercado" right={<Av>RM</Av>} />}>
      <div className="between">
        <RolePill>Claimant · self-represented</RolePill>
        <span className="tiny muted">2 cases</span>
      </div>
      <CaseCard no="CV-2024-0912" cap="Mercado v. Northbay Ins." role="Claimant (Plaintiff)" status="Awaiting hearing" statusK="info" next="Next hearing: Jun 11, 9:00 · 4B" />
      <CaseCard no="SC-2023-0210" cap="Mercado v. City Parking" role="Claimant" status="Judgment" statusK="ok" next="Closed · Judgment May 2" />
      <Note>You only see cases you're a party to — nothing else on the court's docket.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Case status (external view) ═══════════ */
function PortalB() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Message clerk</span>
        <span className="wf-btn sm info grow">File a request</span>
      </div>}
      bar={<WFAppBar back title="Mercado v. Northbay" sub="CV-0912 · You: Claimant" right={null} />}>
      <div className="sk pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="row"><Dot k="info" /><span className="grow sm b">Awaiting hearing</span><span className="chip xs info">On track</span></div>
        <div className="prog" style={{ margin: "7px 0 5px" }}><i style={{ width: "40%" }}></i></div>
        <div className="between tiny muted"><span>Stage: Motions</span><span>Filed Mar 14</span></div>
      </div>
      <div className="sk-soft pad-s tight">
        <div className="between sm"><span className="muted">Next hearing</span><span className="b">Jun 11, 9:00</span></div>
        <div className="between sm"><span className="muted">Courtroom</span><span className="b">4B · Hon. Alvarez</span></div>
        <div className="between sm"><span className="muted">Opposing</span><span className="b">Northbay · Reyes &amp; Cole</span></div>
      </div>
      <div className="between"><span className="seclabel">Shared with you</span><span className="tiny muted">3 docs · 2 tasks</span></div>
      <div className="sk pad-s tight">
        <div className="row"><span className="ico-ph" style={{ width: 22, height: 26, fontSize: 7, fontWeight: 700 }}>PDF</span><span className="grow sm trunc">Hearing notice</span><span className="chip xs ok">View</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><span className="cbox"></span><span className="grow sm trunc">Submit witness list</span><span className="chip xs urgent">Jun 9</span></div>
      </div>
      <div className="sk-soft pad-s row" style={{ opacity: .55, gap: 7 }}>
        <span className="ico-ph ico-x" style={{ width: 22, height: 26 }}></span>
        <span className="grow sm trunc">12 other case documents</span><span className="chip xs">Not shared</span>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ C · Shared documents & tasks ═══════════ */
function PortalC() {
  return (
    <Phone tab="" bottom={<PortalNav active="docs" />}
      bar={<WFAppBar back title="Shared with you" sub="CV-0912 · Mercado" right={<Av>RM</Av>} />}>
      <div className="seg"><div className="on">Documents 3</div><div>Tasks 2</div></div>
      <span className="seclabel">Documents shared with you</span>
      <div className="sk pad-s tight">
        <div className="row" style={{ padding: "4px 0" }}><span className="ico-ph" style={{ width: 26, height: 30, fontSize: 7, fontWeight: 700 }}>PDF</span><div className="grow"><div className="sm b trunc">Scheduling order.pdf</div><div className="tiny muted">shared by clerk · May 20</div></div><span className="chip xs ok">Download</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "4px 0" }}><span className="ico-ph" style={{ width: 26, height: 30, fontSize: 7, fontWeight: 700 }}>PDF</span><div className="grow"><div className="sm b trunc">Hearing notice.pdf</div><div className="tiny muted">shared by clerk · Jun 2</div></div><span className="chip xs">View</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "4px 0" }}><span className="ico-ph" style={{ width: 26, height: 30, fontSize: 7, fontWeight: 700 }}>DOC</span><div className="grow"><div className="sm b trunc">Witness list — template</div><div className="tiny muted">to complete · due Jun 9</div></div><span className="chip xs ok">Edit</span></div>
      </div>
      <span className="seclabel">Tasks assigned to you</span>
      <div className="sk pad-s tight">
        <div className="row" style={{ padding: "3px 0" }}><span className="cbox"></span><span className="grow sm trunc b">Submit witness list</span><span className="chip xs urgent">Jun 9</span></div>
        <div className="row" style={{ padding: "3px 0" }}><span className="cbox"></span><span className="grow sm trunc">Confirm attendance — Jun 11</span><span className="chip xs warn">Jun 10</span></div>
      </div>
      <Note>Only items the judge or clerk shared appear here — access is per-document.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { PortalA, PortalB, PortalC });
