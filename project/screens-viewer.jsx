/* Document Viewer ×3 — view uploaded documents in-app, Adobe-Reader style.
   A · Reader (page view + toolbar: page nav, zoom, search, fit)
   B · Annotate & sign (highlight, sticky note, signature)
   C · Thumbnails / outline + search results
*/

/* page body placeholder lines */
function PLines({ n = 6, first }) {
  return (
    <>
      {first && <div style={{ fontWeight: 700, marginBottom: 5 }}>{first}</div>}
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="ph-line" style={{ width: (i % 3 === 2 ? 60 : 100 - (i % 4) * 6) + "%", marginTop: 5 }}></div>
      ))}
    </>
  );
}

/* ═══════════ A · Reader ═══════════ */
function ViewerA() {
  const bar = (
    <div className="pdfbar">
      <span className="b" style={{ fontSize: 16, lineHeight: 1 }}>‹</span>
      <span className="grow trunc">Motion to compel.pdf</span>
      <span className="pb">⤢</span><span className="pb">⌕</span><span className="pb">⤓</span>
    </div>
  );
  const foot = (
    <div className="pdfbar" style={{ justifyContent: "center", gap: 12 }}>
      <span className="pb">−</span><span>140%</span><span className="pb">+</span>
      <span className="dsep" style={{ background: "#5a554d" }}></span>
      <span className="pb">‹</span><span>3 / 14</span><span className="pb">›</span>
    </div>
  );
  return (
    <Phone tab="" bar={bar} bottom={foot}>
      <div className="pdfstage" style={{ margin: -10, marginBottom: -10 }}>
        <div className="pdfpage">
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 10.5 }}>MOTION TO COMPEL DISCOVERY</div>
          <div style={{ textAlign: "center", color: "#666" }}>CV-2024-0912 · Mercado v. Northbay</div>
          <div style={{ marginTop: 8 }}></div>
          <PLines n={7} />
        </div>
        <div className="pdfpage" style={{ opacity: .96 }}>
          <PLines n={6} first="I. BACKGROUND" />
        </div>
      </div>
    </Phone>
  );
}

/* ═══════════ B · Annotate & sign ═══════════ */
function ViewerB() {
  const bar = (
    <div className="pdfbar">
      <span className="grow trunc">Scheduling order.pdf</span>
      <span className="pb on">✎ Markup</span>
    </div>
  );
  const tools = (
    <div className="pdfbar" style={{ justifyContent: "center", gap: 8 }}>
      <span className="pb on" style={{ background: "var(--hi)", color: "#33302b", borderColor: "#c9a91f" }}>Highlight</span>
      <span className="pb">Note</span>
      <span className="pb">Draw</span>
      <span className="pb">✍ Sign</span>
    </div>
  );
  return (
    <Phone tab="" bar={bar} bottom={tools}>
      <div className="pdfstage" style={{ margin: -10, marginBottom: -10 }}>
        <div className="pdfpage" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 10.5 }}>SCHEDULING ORDER</div>
          <div style={{ marginTop: 7 }}>It is hereby <span className="hl">ORDERED that a hearing be set for June 11</span>, 2024 at 9:00 AM.</div>
          <div style={{ marginTop: 6 }}><PLines n={3} /></div>
          <span className="annpin" style={{ top: 30, right: 8 }}>!</span>
          <div className="signbox" style={{ marginTop: 12 }}>Tap to sign — Hon. R. Alvarez</div>
        </div>
      </div>
      <div className="banner" style={{ position: "absolute", left: 12, right: 12, bottom: 46, zIndex: 5 }}>
        <span className="b" style={{ color: "var(--info)" }}>✎</span>
        <div className="grow tiny"><b>Note added</b> — "Confirm courtroom availability"</div>
      </div>
    </Phone>
  );
}

/* ═══════════ C · Thumbnails / outline + search ═══════════ */
function ViewerC() {
  const bar = (
    <div className="pdfbar">
      <span className="grow trunc">Motion to compel.pdf</span>
      <span className="pb on">⊞ Pages</span><span className="pb">⌕</span>
    </div>
  );
  return (
    <Phone tab="" bar={bar} bottom={null} bodyClass="tight">
      <div className="wf-search" style={{ borderColor: "var(--ink)" }}><span className="mag"></span><span className="grow b sm">discovery</span><span className="tiny muted">6 hits</span></div>
      <div className="seg"><div className="on">Thumbnails</div><div>Outline</div><div>Search</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, justifyItems: "center" }}>
        {[1, 2, 3, 4, 5, 6].map((p) => (
          <div key={p} className="col" style={{ alignItems: "center", gap: 2 }}>
            <div className={"pdfthumb" + (p === 3 ? " on" : "")}>
              {p === 1 && <i style={{ height: 5, width: "70%", margin: "0 auto 2px" }}></i>}
              {Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ width: (i % 3 === 2 ? 60 : 92) + "%" }}></i>)}
            </div>
            <span className="tiny muted">{p}</span>
          </div>
        ))}
      </div>
      <span className="seclabel">Search results · "discovery"</span>
      <div className="sk pad-s tight">
        <div className="row"><span className="chip xs">p.3</span><span className="grow tiny trunc">…compel <span className="mark">discovery</span> responses by…</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><span className="chip xs">p.7</span><span className="grow tiny trunc">…close of <span className="mark">discovery</span> on July 15…</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { ViewerA, ViewerB, ViewerC });
