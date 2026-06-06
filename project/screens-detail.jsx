/* Case detail ×3 + Documents ×3 */

function ActionBar({ items }) {
  return (
    <div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
      {items.map((it, i) => (
        <span key={i} className={"wf-btn sm " + (it[1] || "")} style={{ flex: 1 }}>{it[0]}</span>
      ))}
    </div>
  );
}

function CaseHead({ extra }) {
  return (
    <WFAppBar back title="Mercado v. Northbay" sub="CV-2024-0912 · Civil · Div. 4"
      right={<span className="chip xs hi">HIGH</span>} />
  );
}

/* ═══════════ CASE DETAIL ═══════════ */

/* A · Tabbed — summary header + tab strip, Overview shown */
function CaseA() {
  return (
    <Phone
      bar={<CaseHead />}
      bottom={<ActionBar items={[["＋ Note"], ["Schedule"], ["Update", "info"]]} />}>
      <div className="sk pad-s">
        <div className="between"><span className="row" style={{ gap: 5 }}><Dot k="info" /><span className="sm b">Awaiting hearing</span></span><span className="tiny muted">Opened 14 Mar</span></div>
        <div className="prog" style={{ margin: "7px 0 4px" }}><i style={{ width: "40%" }}></i></div>
        <div className="between tiny muted"><span>Stage: Motions</span><span>Next: Jun 11, 4B</span></div>
      </div>
      <div className="tabs">
        <div className="on">Overview</div><div>Docket</div><div>Docs</div><div>Tasks</div><div>Parties</div>
      </div>
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow"><div className="tiny muted">Target dispo.</div><div className="sm b">Sep 30</div></div>
        <div className="sk-soft pad-s grow"><div className="tiny muted">Days open</div><div className="sm b">89</div></div>
        <div className="sk-soft pad-s grow"><div className="tiny muted">Filings</div><div className="sm b">23</div></div>
      </div>
      <span className="seclabel">Parties</span>
      <div className="sk pad-s tight">
        <div className="row"><Av>RM</Av><div className="grow"><div className="sm b">R. Mercado</div><div className="tiny muted">Plaintiff · self-rep</div></div></div>
        <div className="divide" style={{ margin: "6px 0" }}></div>
        <div className="row"><Av>NB</Av><div className="grow"><div className="sm b">Northbay Ins.</div><div className="tiny muted">Defendant · Reyes & Cole LLP</div></div></div>
      </div>
      <span className="seclabel">Latest activity</span>
      <div className="tiny muted">Jun 2 — Motion to compel filed · Reyes & Cole</div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · One scroll w/ collapsible sections */
function CaseB() {
  return (
    <Phone
      bar={<CaseHead />}
      bottom={<ActionBar items={[["Add filing"], ["＋ Task"], ["More", ""]]} />}>
      <div className="between"><span className="seclabel">⌄ Summary</span><span className="chip xs info">Awaiting hearing</span></div>
      <div className="sk-soft pad-s tight">
        <div className="between sm"><span className="muted">Judge</span><span className="b">Hon. R. Alvarez</span></div>
        <div className="between sm"><span className="muted">Courtroom</span><span className="b">4B</span></div>
        <div className="between sm"><span className="muted">Stage</span><span className="b">Motions</span></div>
        <div className="between sm"><span className="muted">Priority</span><span className="b" style={{ color: "#a8651a" }}>High</span></div>
      </div>
      <span className="seclabel">⌄ Key dates &amp; targets</span>
      <div className="sk pad-s tight">
        <div className="row"><Dot k="urgent" /><span className="grow sm">Reply brief due</span><span className="chip xs urgent">Jun 9</span></div>
        <div className="row"><Dot k="info" /><span className="grow sm">Motion hearing</span><span className="chip xs info">Jun 11</span></div>
        <div className="row"><Dot k="open" /><span className="grow sm">Target disposition</span><span className="chip xs">Sep 30</span></div>
      </div>
      <div className="between"><span className="seclabel">⌄ Parties &amp; reps</span><span className="tiny muted">4</span></div>
      <div className="sk-soft pad-s tight">
        <div className="between sm"><span>R. Mercado</span><span className="muted tiny">Plaintiff</span></div>
        <div className="between sm"><span>Northbay Ins.</span><span className="muted tiny">Reyes &amp; Cole</span></div>
      </div>
      <span className="seclabel">› Filings (23) · › Notes (8)</span>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Timeline-centric — docket history as the spine */
function CaseC() {
  return (
    <Phone
      bar={<CaseHead />}
      bottom={<ActionBar items={[["＋ Entry"], ["Jump to date"], ["Update", "info"]]} />}>
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b">23</div><div className="tiny muted">Filings</div></div>
        <div className="sk-soft pad-s grow center"><div className="b">Jun 11</div><div className="tiny muted">Next hearing</div></div>
        <div className="sk-soft pad-s grow center"><div className="b">89d</div><div className="tiny muted">Open</div></div>
      </div>
      <span className="seclabel">Docket timeline</span>
      <div className="tl">
        <div className="node urgent">
          <div className="row"><span className="b sm">Jun 9</span><span className="chip xs urgent">Deadline</span></div>
          <div className="sm">Reply brief due</div>
        </div>
        <div className="node on">
          <div className="row"><span className="b sm">Jun 2</span><span className="chip xs info">Filing</span></div>
          <div className="sm trunc">Motion to compel — Reyes &amp; Cole</div>
          <div className="tiny muted">PDF · 14 pp</div>
        </div>
        <div className="node">
          <div className="row"><span className="b sm">May 20</span><span className="chip xs">Order</span></div>
          <div className="sm trunc">Scheduling order entered</div>
        </div>
        <div className="node">
          <div className="row"><span className="b sm">Mar 14</span><span className="chip xs">Open</span></div>
          <div className="sm trunc">Complaint filed</div>
        </div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ DOCUMENTS ═══════════ */

function FileRow({ ext, name, meta, tag }) {
  return (
    <div className="row" style={{ padding: "6px 0" }}>
      <span className="ico-ph" style={{ width: 28, height: 32, fontSize: 8, fontWeight: 700, flexDirection: "column" }}>{ext}</span>
      <div className="grow">
        <div className="sm b trunc">{name}</div>
        <div className="tiny muted trunc">{meta}</div>
      </div>
      {tag && <span className={"chip xs " + (tag[1] || "")}>{tag[0]}</span>}
    </div>
  );
}

/* A · File list — search + type filters, scannable rows */
function DocsA() {
  return (
    <Phone tab="docs"
      bar={<WFAppBar title="Documents" sub="1,204 files" right={<span className="wf-btn sm info">＋</span>} />}
      fab>
      <WFSearch placeholder="Search files & contents…" />
      <div className="hscroll">
        <Chip cls="solid xs">All</Chip><Chip cls="xs">Pleadings</Chip><Chip cls="xs">Orders</Chip><Chip cls="xs">Evidence</Chip><Chip cls="xs">Briefs</Chip>
      </div>
      <div className="between"><span className="tiny muted">Recent · all cases</span><span className="tiny muted">▾ Sort</span></div>
      <div className="sk pad-s" style={{ flex: 1 }}>
        <FileRow ext="PDF" name="Motion to compel.pdf" meta="CV-0912 · 2 Jun · Reyes & Cole" tag={["New", "info"]} />
        <div className="divide"></div>
        <FileRow ext="PDF" name="Scheduling order.pdf" meta="CV-0912 · 20 May · signed" tag={["Signed", "ok"]} />
        <div className="divide"></div>
        <FileRow ext="DOC" name="Reply brief — draft.docx" meta="CV-0912 · you · 1d ago" tag={["Draft", ""]} />
        <div className="divide"></div>
        <FileRow ext="JPG" name="Exhibit 14 — scene.jpg" meta="CR-1187 · evidence" />
        <div className="divide"></div>
        <FileRow ext="PDF" name="Arraignment minutes.pdf" meta="CR-1187 · 28 May" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Folder grid — browse by category/case */
function DocsB() {
  const Folder = ({ name, n, k }) => (
    <div className="sk pad-s" style={{ display: "flex", flexDirection: "column", gap: 6, minHeight: 76 }}>
      <span style={{ width: 30, height: 22, border: "2px solid var(--ink)", borderRadius: "3px 8px 4px 4px", borderTopLeftRadius: 3, position: "relative", background: "var(--paper-2)" }}></span>
      <div className="sm b trunc">{name}</div>
      <div className="between tiny muted"><span>{n} files</span>{k && <span className={"sdot " + k}></span>}</div>
    </div>
  );
  return (
    <Phone tab="docs"
      bar={<WFAppBar title="Documents" sub="Browse by folder" right={<span className="wf-btn sm">⊞</span>} />}
      fab>
      <WFSearch placeholder="Search all folders…" />
      <span className="seclabel">By category</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <Folder name="Pleadings" n="312" />
        <Folder name="Orders & judgments" n="188" k="ok" />
        <Folder name="Evidence" n="421" />
        <Folder name="Briefs & motions" n="207" k="warn" />
      </div>
      <span className="seclabel">Pinned cases</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <Folder name="CV-0912 Mercado" n="23" k="info" />
        <Folder name="CR-1187 Okafor" n="41" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Recent + upload-forward */
function DocsC() {
  return (
    <Phone tab="docs"
      bar={<WFAppBar title="Documents" sub="Quick access" right={<Av>RA</Av>} />}>
      <div className="sk-3 pad center" style={{ padding: "14px 10px" }}>
        <div className="xl b" style={{ lineHeight: 1 }}>＋</div>
        <div className="sm b" style={{ marginTop: 4 }}>Upload or scan a document</div>
        <div className="tiny muted">Drop file · camera · import from email</div>
        <div className="row" style={{ gap: 6, marginTop: 8, justifyContent: "center" }}>
          <span className="wf-btn sm info">Upload</span><span className="wf-btn sm">Scan</span>
        </div>
      </div>
      <span className="seclabel">Recently opened</span>
      <div className="sk pad-s">
        <FileRow ext="PDF" name="Motion to compel.pdf" meta="CV-0912 · 2h ago" />
        <div className="divide"></div>
        <FileRow ext="DOC" name="Reply brief — draft.docx" meta="CV-0912 · yesterday" tag={["Draft", ""]} />
        <div className="divide"></div>
        <FileRow ext="PDF" name="Exhibit list.pdf" meta="CR-1187 · 2d ago" />
      </div>
      <span className="seclabel">Awaiting signature</span>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--warn)" }}>
        <FileRow ext="PDF" name="Scheduling order — Calderon" meta="ready to sign" tag={["Sign", "warn"]} />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { CaseA, CaseB, CaseC, DocsA, DocsB, DocsC });
