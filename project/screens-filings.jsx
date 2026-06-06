/* Filings & Submissions ×3 — parties file motions, applications, submissions,
   pleadings, etc. into a case; the court receives, dockets & rules.
   A · Party filings hub (what I can file + my submissions w/ status)
   B · New submission form (type, title, relief, attachments, fee)
   C · Court intake / review (staff/judge accept · docket · return · refer)
*/

/* local form helpers (scoped to this babel file) */
function FField({ label, children, hint }) {
  return (
    <div className="col" style={{ gap: 3 }}>
      <span className="seclabel">{label}</span>
      {children}
      {hint && <span className="tiny muted">{hint}</span>}
    </div>
  );
}
function FInput({ value, ph, right }) {
  return (
    <div className="sk-soft pad-s row" style={{ minHeight: 30 }}>
      <span className={"grow sm" + (value ? " b" : " muted")}>{value || ph}</span>
      {right && <span className="muted sm">{right}</span>}
    </div>
  );
}

/* ═══════════ A · Party filings hub ═══════════ */
function FilingA() {
  const Sub = ({ type, title, date, status, k }) => (
    <div className="row" style={{ padding: "5px 0", gap: 8 }}>
      <span className="ico-ph" style={{ width: 26, height: 30, fontSize: 6.5, fontWeight: 700, flexDirection: "column" }}>{type}</span>
      <div className="grow"><div className="sm b trunc">{title}</div><div className="tiny muted trunc">Filed {date}</div></div>
      <span className={"chip xs " + k}>{status}</span>
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm info block">＋ New submission</span>
      </div>}
      bar={<WFAppBar back title="My filings" sub="CV-0912 · You: Counsel" right={null} />}>
      <span className="seclabel">File into this case</span>
      <div className="row wrap" style={{ gap: 5 }}>
        <Chip cls="xs info">Motion</Chip><Chip cls="xs info">Application</Chip><Chip cls="xs info">Submission</Chip>
        <Chip cls="xs info">Pleading</Chip><Chip cls="xs info">Affidavit</Chip><Chip cls="xs">＋ Other</Chip>
      </div>
      <span className="seclabel">Your submissions</span>
      <div className="sk pad-s tight">
        <Sub type="MOTION" title="Motion to compel discovery" date="Jun 2" status="Accepted" k="ok" />
        <div className="divide"></div>
        <Sub type="APP" title="Application to amend pleadings" date="Jun 5" status="Under review" k="warn" />
        <div className="divide"></div>
        <Sub type="SUB" title="Written submissions — liability" date="Jun 6" status="Submitted" k="info" />
        <div className="divide"></div>
        <Sub type="MOTION" title="Motion for summary judgment" date="May 28" status="Returned" k="urgent" />
      </div>
      <Note>You can only file into cases you're assigned to; the clerk dockets it and the judge rules.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · New submission form ═══════════ */
function FilingB() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm info grow">File submission</span>
      </div>}
      bar={<WFAppBar back title="New submission" sub="as Counsel · Reyes &amp; Cole" right={null} />}>
      <FField label="Case" hint="Only cases you're assigned to.">
        <FInput value="CV-2024-0912 · Mercado v. Northbay" right="▾" />
      </FField>
      <FField label="Type of filing">
        <div className="row wrap" style={{ gap: 5 }}>
          <Chip cls="solid xs">Motion</Chip><Chip cls="xs">Application</Chip>
          <Chip cls="xs">Submission</Chip><Chip cls="xs">Pleading</Chip><Chip cls="xs">Affidavit</Chip>
        </div>
      </FField>
      <FField label="Title">
        <FInput value="Motion for summary judgment" />
      </FField>
      <FField label="Relief sought / summary">
        <div className="sk-soft pad-s" style={{ minHeight: 46 }}>
          <Bar w="90%" /><Bar w="76%" style={{ marginTop: 6 }} /><Bar w="48%" cls="lite" style={{ marginTop: 6 }} />
        </div>
      </FField>
      <FField label="Attachments">
        <div className="sk pad-s tight">
          <div className="row"><span className="ico-ph" style={{ width: 22, height: 26, fontSize: 7, fontWeight: 700 }}>PDF</span><span className="grow sm trunc">Motion-SJ.pdf</span><span className="tiny muted">14 pp</span></div>
          <div className="divide" style={{ margin: "5px 0" }}></div>
          <div className="row center" style={{ justifyContent: "center", gap: 6, color: "var(--info)" }}><span className="b">＋</span><span className="sm">Add document</span></div>
        </div>
      </FField>
      <div className="between sk-soft pad-s"><span className="sm muted">Filing fee</span><span className="sm b">$60 · pay on file</span></div>
      <Note>On filing, opposing parties are served &amp; it enters the docket as "Submitted".</Note>
    </Phone>
  );
}

/* ═══════════ C · Court intake / review ═══════════ */
function FilingC() {
  const In = ({ type, typeCls, title, no, who, when, k, status }) => (
    <div className="sk pad-s">
      <div className="between"><span className={"chip xs " + typeCls}>{type}</span><span className="tiny muted">{when}</span></div>
      <div className="sm b trunc" style={{ margin: "3px 0 1px" }}>{title}</div>
      <div className="tiny muted trunc">{no} · {who}</div>
      <div className="row" style={{ gap: 6, marginTop: 6 }}>
        <span className="wf-btn sm info">Docket</span><span className="wf-btn sm">Return</span><span className="wf-btn sm">Refer to judge</span>
      </div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar title="Filings intake" sub="14 pending · Division 4" right={<span className="wf-btn sm">Filter</span>} />}>
      <div className="seg"><div className="on">Pending 14</div><div>Docketed</div><div>Returned</div></div>
      <div className="hscroll"><Chip cls="xs">All</Chip><Chip cls="xs info">Motions 6</Chip><Chip cls="xs">Applications 4</Chip><Chip cls="xs">Submissions 4</Chip></div>
      <In type="MOTION" typeCls="info" title="Motion for summary judgment" no="CV-0912 Mercado" who="A. Lin · Reyes & Cole" when="20m ago" />
      <In type="APPLICATION" typeCls="warn" title="Application to amend pleadings" no="CV-0788 Harlow" who="T. Ruiz · Reyes & Cole" when="1h ago" />
      <In type="SUBMISSION" typeCls="" title="Written submissions — liability" no="FC-0455 Calderon" who="M. Calderon (Pet.)" when="2h ago" />
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { FilingA, FilingB, FilingC });
