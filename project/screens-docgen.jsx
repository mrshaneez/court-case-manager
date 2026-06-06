/* Document Generator & Editor ×3 — staff generate orders/documents from
   uploaded Microsoft Word samples (templates), then edit in a Word-like editor
   with formatting + language options, including Dhivehi (Thaana, RTL).
   A · Template library + generate (Word samples → merge case data)
   B · Word-like editor (formatting toolbar, page, merge fields)
   C · Language options + Dhivehi (Thaana RTL editing)
*/

/* ═══════════ A · Template library + generate ═══════════ */
function DocGenA() {
  const T = ({ name, meta, lang, k }) => (
    <div className="row" style={{ padding: "6px 0", gap: 9 }}>
      <span className="ico-ph" style={{ width: 28, height: 33, fontSize: 7, fontWeight: 700, flexDirection: "column", borderColor: "var(--info)", color: "var(--info)" }}>DOC</span>
      <div className="grow"><div className="sm b trunc">{name}</div><div className="tiny muted trunc">{meta}</div></div>
      <span className={"chip xs " + (k || "")}>{lang}</span>
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">⬆ Upload sample</span>
        <span className="wf-btn sm info grow">Generate</span>
      </div>}
      bar={<WFAppBar back title="Templates" sub="From Word samples · staff" right={<span className="wf-btn sm">＋</span>} />}>
      <div className="sk-3 pad-s row center" style={{ justifyContent: "center", gap: 7 }}>
        <span className="b" style={{ color: "var(--info)" }}>⬆</span>
        <span className="sm muted">Upload a .docx sample to make a template</span>
      </div>
      <span className="seclabel">Order &amp; document templates</span>
      <div className="sk pad-s tight">
        <T name="Scheduling order" meta="3 merge fields · used 142×" lang="EN" />
        <div className="divide"></div>
        <T name="Summons / notice of hearing" meta="5 merge fields · used 96×" lang="EN" />
        <div className="divide"></div>
        <T name="ކޯޓު އަމުރު — Court order" meta="Thaana · 4 merge fields" lang="DV" k="info" />
        <div className="divide"></div>
        <T name="Judgment — civil" meta="7 merge fields · used 61×" lang="EN" />
      </div>
      <span className="seclabel">Generate for case</span>
      <div className="sk-soft pad-s row"><span className="grow sm b">CV-2024-0912 · Mercado v. Northbay</span><span className="muted sm">▾</span></div>
      <Note>Upload your own Word samples; merge fields (case no., parties, dates) fill from the case automatically.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Word-like editor ═══════════ */
function DocGenB() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm grow">Export .docx</span>
        <span className="wf-btn sm info grow">Finalize</span>
      </div>}
      bar={<WFAppBar back title="Scheduling order" sub="CV-0912 · editing"
        right={<span className="langtag">EN ▾</span>} />}
      bodyClass="tight">
      <div className="doctool">
        <span className="dbtn wide">Calibri ▾</span>
        <span className="dbtn wide">11 ▾</span>
        <span className="dsep"></span>
        <span className="dbtn on" style={{ fontWeight: 700 }}>B</span>
        <span className="dbtn" style={{ fontStyle: "italic" }}>I</span>
        <span className="dbtn" style={{ textDecoration: "underline" }}>U</span>
        <span className="dsep"></span>
        <span className="dbtn">≡</span>
        <span className="dbtn on">≣</span>
        <span className="dbtn">⋮≡</span>
        <span className="dbtn">• </span>
        <span className="dbtn">1.</span>
      </div>
      <div className="ruler"></div>
      <div className="docpage" style={{ flex: 1, overflow: "hidden" }}>
        <div className="dt">SCHEDULING ORDER</div>
        <div style={{ textAlign: "center", color: "#666", marginTop: 2 }}>Superior Court · Division 4</div>
        <div style={{ marginTop: 9 }}>Case No. <span className="merge">CV-2024-0912</span></div>
        <div style={{ fontWeight: 700, marginTop: 2 }}><span className="merge">R. Mercado</span> v. <span className="merge">Northbay Ins.</span></div>
        <div style={{ marginTop: 9 }}>The Court, having reviewed the matter, hereby ORDERS that a motion hearing be set for <span className="merge">June 11, 2024 at 9:00 AM</span> in Courtroom <span className="merge">4B</span>.</div>
        <div style={{ marginTop: 8 }}>All counsel shall appear. Discovery shall close on <span className="merge">July 15, 2024</span>.</div>
        <div style={{ marginTop: 14 }}>__________________________</div>
        <div>Hon. R. Alvarez</div>
      </div>
      <Note>Formatting works like Word — fonts, sizes, bold/italic, alignment, lists. Blue fields are merge data.</Note>
    </Phone>
  );
}

/* ═══════════ C · Language options + Dhivehi (Thaana) ═══════════ */
function DocGenC() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm info grow">Finalize</span>
      </div>}
      bar={<WFAppBar back title="ކޯޓު އަމުރު" sub="Court order · editing"
        right={<span className="langtag">DV ▾</span>} />}
      bodyClass="tight">
      <div className="between">
        <span className="seclabel">Document language</span>
        <div className="row" style={{ gap: 5 }}><Chip cls="xs">English</Chip><Chip cls="xs solid">ދިވެހި Dhivehi</Chip><Chip cls="xs">العربية</Chip></div>
      </div>
      <div className="doctool">
        <span className="dbtn wide thaana" style={{ direction: "rtl" }}>ފަރުމާ ▾</span>
        <span className="dbtn wide">14 ▾</span>
        <span className="dsep"></span>
        <span className="dbtn" style={{ fontWeight: 700 }}>B</span>
        <span className="dbtn">I</span>
        <span className="dsep"></span>
        <span className="dbtn on">≣</span>
        <span className="dbtn">≡</span>
        <span className="dbtn wide on">RTL ⇄</span>
      </div>
      <div className="docpage rtl" lang="dv" style={{ flex: 1, overflow: "hidden" }}>
        <div className="dt thaana">ކޯޓުގެ އަމުރު</div>
        <div className="thaana" style={{ textAlign: "center", color: "#666", fontSize: 9.5 }}>ދިވެހިރާއްޖޭގެ ކޯޓު · ޑިވިޜަން 4</div>
        <div className="thaana" style={{ marginTop: 9 }}>މައްސަލަ ނަންބަރު: <span className="merge">CV-2024-0912</span></div>
        <div className="thaana" style={{ marginTop: 8 }}>ޝަރީޢަތުން ކަނޑައަޅާ ގޮތުގައި، މި މައްސަލައިގެ އަޑުއެހުން ބޭއްވޭނީ <span className="merge">11 ޖޫން 2024</span> ވަނަ ދުވަހު ކޯޓުރޫމް <span className="merge">4B</span> ގައެވެ.</div>
        <div className="thaana" style={{ marginTop: 14 }}>______________________</div>
        <div className="thaana">ފަނޑިޔާރު</div>
      </div>
      <Note>Full Dhivehi (Thaana) support — right-to-left editing, Thaana keyboard &amp; fonts, with merge fields intact.</Note>
    </Phone>
  );
}

Object.assign(window, { DocGenA, DocGenB, DocGenC });

/* ═══════════ D · Header & footer from sample ═══════════ */
function DocGenD() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Edit header</span>
        <span className="wf-btn sm info grow">Apply to template</span>
      </div>}
      bar={<WFAppBar back title="Header &amp; footer" sub="Detected from sample.docx" right={null} />}>
      <div className="sk-3 pad-s row" style={{ gap: 7, alignItems: "center" }}>
        <span className="ico-ph" style={{ width: 24, height: 28, fontSize: 6.5, fontWeight: 700, flexDirection: "column", borderColor: "var(--info)", color: "var(--info)" }}>DOC</span>
        <div className="grow"><div className="sm b">scheduling-order.docx</div><div className="tiny muted">Header &amp; footer extracted automatically</div></div>
        <span className="chip xs ok">Found</span>
      </div>
      <span className="seclabel">Header</span>
      <div className="sk pad-s" style={{ background: "#fff" }}>
        <div className="row" style={{ gap: 8, justifyContent: "center", alignItems: "center" }}>
          <span className="seal">SEAL</span>
          <div className="center" style={{ fontFamily: "Inter, sans-serif" }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: "#222" }}>SUPERIOR COURT · DIVISION 4</div>
            <div style={{ fontSize: 7.5, color: "#777" }}>Case No. <span className="merge">{"{{case_no}}"}</span></div>
          </div>
        </div>
      </div>
      <div className="row wrap" style={{ gap: 5 }}>
        <Chip cls="xs info">Logo / seal</Chip><Chip cls="xs info">Court name</Chip><Chip cls="xs info">{"{{case_no}}"}</Chip>
      </div>
      <span className="seclabel">Footer</span>
      <div className="sk pad-s" style={{ background: "#fff" }}>
        <div className="docftr" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
          <span>Registry · 3rd Floor, Justice Bldg</span><span>Page <span className="merge">{"{{n}}"}</span> of <span className="merge">{"{{total}}"}</span></span>
        </div>
      </div>
      <div className="between sk-soft pad-s">
        <span className="sm">Different first page</span><span className="tgl on"></span>
      </div>
      <Note>Header &amp; footer are lifted from your Word sample and repeat on every generated page \u2014 merge fields stay live.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ E · Editor page with header/footer zones ═══════════ */
function DocGenE() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm grow">Export .docx</span>
        <span className="wf-btn sm info grow">Finalize</span>
      </div>}
      bar={<WFAppBar back title="Scheduling order" sub="Header &amp; footer on"
        right={<span className="langtag">EN ▾</span>} />}
      bodyClass="tight">
      <div className="doctool">
        <span className="dbtn wide">Insert ▾</span>
        <span className="dbtn on wide">Header</span>
        <span className="dbtn wide">Footer</span>
        <span className="dsep"></span>
        <span className="dbtn">#</span>
        <span className="dbtn wide">Page #</span>
        <span className="dbtn">⌗</span>
      </div>
      <div className="docpage" style={{ flex: 1, overflow: "hidden" }}>
        <div className="hfband">
          <span className="hf-tag">HEADER</span>
          <div className="dochdr">
            <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
              <span className="seal">SEAL</span>
              <div><div style={{ fontWeight: 700, fontSize: 9.5 }}>SUPERIOR COURT · DIVISION 4</div>
              <div style={{ fontSize: 7.5, color: "#777" }}>Case No. <span className="merge">CV-2024-0912</span></div></div>
            </div>
          </div>
        </div>
        <div className="dt" style={{ fontSize: 11 }}>SCHEDULING ORDER</div>
        <div style={{ marginTop: 6 }}>The Court ORDERS that a motion hearing be set for <span className="merge">June 11, 2024</span> in Courtroom <span className="merge">4B</span>.</div>
        <div style={{ marginTop: 5 }}><PLines n={2} /></div>
        <div className="hfband">
          <span className="hf-tag">FOOTER</span>
          <div className="docftr">
            <span>Registry · Justice Bldg</span><span>Page 1 of 2</span>
          </div>
        </div>
      </div>
      <Note>Header &amp; footer zones repeat on every page; edit them once, page numbers auto-fill.</Note>
    </Phone>
  );
}

Object.assign(window, { DocGenD, DocGenE });
