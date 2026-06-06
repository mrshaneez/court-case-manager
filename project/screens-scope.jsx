/* Case Visibility & Scope ×3 — who sees which cases.
   - Chief judge: every case, all sections (court-wide).
   - Judge: cases in THEIR section + separately the participating cases
     they're assigned to (e.g. on a panel in another section).
   - Party: only their assigned cases.
   A · Judge scope switcher (My section / Participating)
   B · Chief judge — court-wide, all sections
   C · Visibility model explainer (who sees what)
*/

/* ═══════════ A · Judge scope switcher ═══════════ */
function ScopeA() {
  return (
    <Phone tab="docket"
      bar={<WFAppBar title="Docket" sub="Hon. R. Alvarez" right={<Av style={{ borderColor: "var(--info)" }}>RA</Av>} />}
      fab>
      <div className="seg">
        <div className="on">My section · 248</div>
        <div>Participating · 5</div>
      </div>
      <div className="role-pill" style={{ alignSelf: "flex-start" }}><span className="ai-spark">§</span>Division 4 · your section</div>
      <div className="sk pad-s">
        <div className="row" style={{ padding: "5px 0" }}><Dot k="info" /><div className="grow"><div className="sm b trunc">Mercado v. Northbay</div><div className="tiny muted">CV-0912 · your section</div></div><span className="chip xs info">Jun 11</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "5px 0" }}><Dot k="warn" /><div className="grow"><div className="sm b trunc">State v. Okafor</div><div className="tiny muted">CR-1187 · your section</div></div><span className="chip xs warn">Jun 11</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "5px 0" }}><Dot k="open" /><div className="grow"><div className="sm b trunc">In re Calderon</div><div className="tiny muted">FC-0455 · your section</div></div><span className="chip xs">Jun 14</span></div>
      </div>
      <Note>Switch to "Participating" for cases in other sections where you sit on the panel — kept separate from your own docket.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Chief judge — court-wide ═══════════ */
function ScopeB() {
  const Sec = ({ name, judge, active, k, util }) => (
    <div className="sk pad-s">
      <div className="between"><span className="sm b">{name}</span><span className={"chip xs " + k}>{active} active</span></div>
      <div className="tiny muted">{judge}</div>
      <div className="prog" style={{ marginTop: 5 }}><i className={k === "ok" ? "ok" : k === "urgent" ? "" : "hi"} style={{ width: util, ...(k === "urgent" ? { background: "var(--urgent)" } : {}) }}></i></div>
    </div>
  );
  return (
    <Phone tab="docket"
      bar={<WFAppBar title="All sections" sub="Chief Judge · court-wide" right={<span className="chip xs solid">Chief</span>} />}
      fab>
      <WFSearch placeholder="Search every case, all sections…" />
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b lg">1,204</div><div className="tiny muted">All cases</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">7</div><div className="tiny muted">Sections</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>34</div><div className="tiny muted">Overdue</div></div>
      </div>
      <div className="between"><span className="seclabel">By section</span><span className="tiny muted">▾ Sort: backlog</span></div>
      <Sec name="Division 4" judge="Hon. R. Alvarez" active="248" k="info" util="60%" />
      <Sec name="Division 7" judge="Hon. K. Boateng" active="190" k="urgent" util="88%" />
      <Sec name="Family Division" judge="Hon. L. Pham" active="156" k="ok" util="40%" />
      <Note>Only the Chief Judge sees every section. Others are scoped to their own.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ C · Visibility model explainer ═══════════ */
function ScopeC() {
  const Tier = ({ role, scope, sees, k, faces }) => (
    <div className="sk pad-s">
      <div className="between">
        <span className="row" style={{ gap: 6 }}><span className={"sdot " + k}></span><span className="sm b">{role}</span></span>
        <span className="chip xs">{scope}</span>
      </div>
      <div className="tiny muted" style={{ marginTop: 3 }}>{sees}</div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar back title="Who sees what" sub="Case visibility rules" right={null} />}>
      <Tier role="Chief Judge" scope="Court-wide" k="info"
        sees="Every case across all 7 sections." />
      <Tier role="Judge" scope="Section + assigned" k="ok"
        sees="All cases in their own section, plus participating cases they're assigned to elsewhere — shown separately." />
      <Tier role="Clerk / staff" scope="Section (granted)" k="warn"
        sees="Cases in the section they support, per access granted by the judge." />
      <Tier role="Lawyer / firm / rep" scope="Assigned only" k="open"
        sees="Only cases they're counsel or representative on." />
      <Tier role="Party (claimant / respondent)" scope="Assigned only" k="open"
        sees="Only their own cases, with shared docs & tasks." />
      <Note>Scope is enforced everywhere — search, docket, stats and the assistant all respect it.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { ScopeA, ScopeB, ScopeC });
