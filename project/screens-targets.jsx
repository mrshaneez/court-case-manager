/* Shared Targets ×3 — a target can be shared across sections; everyone it's
   shared with sees the same live progress.
   A · Target detail (owner) — combined + per-section progress, manage sharing
   B · Share target (sheet) — pick sections + access, notify
   C · Shared targets overview — mine / shared-with-me / all, with progress
*/

/* a section's progress row */
function SecRow({ name, pct, k, tag }) {
  return (
    <div className="row" style={{ padding: "4px 0", gap: 7 }}>
      <span className="chip xs" style={{ width: 46, justifyContent: "center" }}>{name}</span>
      <div className="prog grow"><i className={k} style={{ width: pct }}></i></div>
      <span className="tiny b" style={{ width: 30, textAlign: "right" }}>{pct}</span>
      {tag && <span className={"sdot " + tag}></span>}
    </div>
  );
}

/* ═══════════ A · Target detail (owner) ═══════════ */
function TargetA() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Edit target</span>
        <span className="wf-btn sm info grow">Manage sharing</span>
      </div>}
      bar={<WFAppBar back title="Target" sub="Owned by Division 4" right={<span className="chip xs info">Shared</span>} />}>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="sm b">Resolve cases older than 12 months</div>
        <div className="row" style={{ gap: 12, marginTop: 7, alignItems: "center" }}>
          <span className="donut"></span>
          <div className="col grow" style={{ gap: 2 }}>
            <div><span className="xl b">63%</span> <span className="tiny muted">combined</span></div>
            <div className="tiny muted">58 of 92 cases cleared</div>
            <div className="tiny muted">Due: end of Q3</div>
          </div>
        </div>
      </div>
      <div className="between"><span className="seclabel">Shared with 4 sections</span><span className="chip xs ok">live</span></div>
      <div className="sk pad-s tight">
        <SecRow name="Div 4" pct="72%" k="ok" tag="ok" />
        <SecRow name="Div 7" pct="58%" k="" tag="warn" />
        <SecRow name="Div 2" pct="40%" k="" tag="warn" />
        <SecRow name="Family" pct="81%" k="ok" tag="ok" />
      </div>
      <Note>Every shared section sees the same progress as it updates — Division 4 owns &amp; edits the target.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Share target (sheet) ═══════════ */
function TargetB() {
  const Sec = ({ name, sub, on, owner }) => (
    <div className="row" style={{ padding: "5px 0", gap: 8 }}>
      <span className={"cbox" + (on ? " done" : "")} style={{ width: 18, height: 18, fontSize: 11 }}>{on ? "✓" : ""}</span>
      <div className="grow"><div className="sm b trunc">{name}</div><div className="tiny muted trunc">{sub}</div></div>
      {owner && <span className="chip xs info">Owner</span>}
    </div>
  );
  const sheet = (
    <div className="scrim">
      <div className="sheet">
        <span className="grab"></span>
        <div><div className="b">Share target</div><div className="tiny muted">Resolve cases older than 12 months</div></div>
        <div className="seg"><div className="on">View progress</div><div>Contribute</div></div>
        <span className="seclabel">Sections</span>
        <div className="sk-soft pad-s tight" style={{ maxHeight: 150, overflow: "hidden" }}>
          <Sec name="Division 4" sub="Hon. Alvarez" on owner />
          <div className="divide"></div>
          <Sec name="Division 7" sub="Hon. Boateng" on />
          <div className="divide"></div>
          <Sec name="Division 2" sub="Hon. Cruz" on />
          <div className="divide"></div>
          <Sec name="Family Division" sub="Hon. Pham" on />
          <div className="divide"></div>
          <Sec name="Probate" sub="Hon. Reyes" />
        </div>
        <div className="between"><span className="row" style={{ gap: 6 }}><span className="cbox done" style={{ width: 16, height: 16, fontSize: 10 }}>✓</span><span className="sm">Notify section leads</span></span></div>
        <div className="row" style={{ gap: 7 }}>
          <span className="wf-btn sm grow">Cancel</span>
          <span className="wf-btn sm info grow">Share with 4</span>
        </div>
      </div>
    </div>
  );
  return (
    <Phone tab="" overlay={sheet}
      bar={<WFAppBar back title="Target" sub="Manage sharing" right={null} />}>
      <div className="sk-2 pad-s"><div className="sm b">Resolve cases older than 12 months</div><div className="tiny muted">63% combined · due Q3</div></div>
    </Phone>
  );
}

/* ═══════════ C · Shared targets overview ═══════════ */
function TargetC() {
  const Card = ({ title, val, pct, k, secs, note, owner }) => (
    <div className="sk pad-s">
      <div className="between"><span className="sm b trunc grow">{title}</span><span className={"chip xs " + k}>{note}</span></div>
      <div className="row" style={{ alignItems: "flex-end", gap: 6, margin: "2px 0 5px" }}>
        <span className="lg b">{val}</span><span className="tiny muted">{owner}</span>
      </div>
      <div className="prog"><i className={k === "ok" ? "ok" : k === "urgent" ? "" : "hi"} style={{ width: pct, ...(k === "urgent" ? { background: "var(--urgent)" } : {}) }}></i></div>
      <div className="row wrap" style={{ gap: 4, marginTop: 6 }}>
        {secs.map((s, i) => <span key={i} className="chip xs">{s}</span>)}
      </div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar title="Targets" sub="Court-wide · shared" right={<span className="wf-btn sm">＋</span>} />}>
      <div className="seg"><div>Mine</div><div className="on">Shared with me</div><div>All</div></div>
      <Card title="Avg disposition ≤ 40 days" val="41d" pct="78%" k="hi" note="Watch" owner="owner: Div 2" secs={["Div 4", "Div 7", "Div 2", "Family"]} />
      <Card title="Clear 12-month backlog" val="63%" pct="63%" k="ok" note="On track" owner="owner: Div 4" secs={["Div 4", "Div 7", "Div 2", "+1"]} />
      <Card title="Adjournments ≤ 8%" val="11%" pct="72%" k="urgent" note="Over" owner="owner: Admin" secs={["All sections"]} />
      <Note>Targets shared with your section appear here — you see progress but only the owner edits.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { TargetA, TargetB, TargetC });
