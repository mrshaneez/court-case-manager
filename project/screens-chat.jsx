/* Messaging ×3 — in-app chat with role-based permissions.
   Allowed channels: judge ↔ judge, judge ↔ staff, party/counsel ↔ staff.
   Parties do NOT message judges directly (avoids ex-parte contact) — they
   reach the court through staff. Threads can be linked to a case.
   A · Conversations inbox
   B · Chat thread (judge ↔ clerk, case-linked)
   C · New message — role-aware recipient picker
*/

/* ═══════════ A · Conversations inbox ═══════════ */
function ChatA() {
  const C = ({ initials, k, name, role, last, when, unread, tag }) => (
    <div className="row" style={{ padding: "7px 0", gap: 9 }}>
      <span className="av" style={{ width: 34, height: 34, borderColor: k ? "var(--" + k + ")" : "var(--ink)", position: "relative" }}>
        {initials}
        <span className="sdot" style={{ position: "absolute", right: -1, bottom: -1, width: 9, height: 9, background: "var(--ok)", borderColor: "var(--paper)", borderWidth: 2 }}></span>
      </span>
      <div className="grow">
        <div className="between"><span className={"sm trunc" + (unread ? " b" : "")}>{name}</span><span className="tiny muted">{when}</span></div>
        <div className="tiny muted trunc">{last}</div>
        <div className="row" style={{ gap: 5, marginTop: 2 }}>
          <span className="chip xs">{role}</span>{tag && <span className="chip xs info">{tag}</span>}
        </div>
      </div>
      {unread && <span className="sdot info" style={{ alignSelf: "center" }}></span>}
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar title="Messages" sub="3 unread" right={<span className="wf-btn sm info">＋</span>} />}
      fab fabIcon="✎">
      <WFSearch placeholder="Search people & messages…" />
      <div className="hscroll"><Chip cls="solid xs">All</Chip><Chip cls="xs">Judges</Chip><Chip cls="xs">Staff</Chip><Chip cls="xs">Parties</Chip></div>
      <div className="sk pad-s">
        <C initials="JM" name="J. Mensah" role="Clerk" last="The Calderon order is ready for signature." when="9:12" unread tag="CV-0912" />
        <div className="divide"></div>
        <C initials="KB" k="info" name="Hon. K. Boateng" role="Judge · Div 7" last="Can you cover the panel on FC-0455?" when="8:40" unread />
        <div className="divide"></div>
        <C initials="DP" name="D. Park" role="Court reporter" last={<span className="thaana" style={{ display: "inline-block", direction: "rtl" }}>ޓްރާންސްކްރިޕްޓް ޑޮކެޓަށް އަޕްލޯޑްކޮށްފިން</span>} when="Yest" tag="ދިވެހި" />
        <div className="divide"></div>
        <C initials="RC" name="Front desk ↔ Reyes &amp; Cole" role="Party channel" last="Counsel asked about the hearing notice." when="Yest" tag="Staff-mediated" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Chat thread ═══════════ */
function ChatB() {
  const composer = (
    <div style={{ borderTop: "2px solid var(--ink)", padding: "8px 10px" }}>
      <div className="askbar" style={{ borderColor: "var(--ink)", color: "var(--ink-soft)" }}>
        <span className="langtag" style={{ padding: "0 6px", fontSize: 9 }}>ދ/EN</span>
        <span className="grow trunc thaana" style={{ direction: "rtl", color: "var(--ink-soft)" }}>މެސެޖް ލިޔުއްވާ…</span>
        <span className="b" style={{ fontSize: 15, color: "var(--info)" }}>↑</span>
      </div>
    </div>
  );
  return (
    <Phone tab="" bottom={composer}
      bar={<WFAppBar back title="J. Mensah" sub="Clerk · Division 4"
        right={<span className="av" style={{ width: 28, height: 28 }}>JM</span>} />}>
      <div className="row center" style={{ justifyContent: "center" }}>
        <span className="chip xs">Linked to CV-0912 Mercado</span>
      </div>
      <div className="col" style={{ gap: 7, flex: 1 }}>
        <div className="tiny muted center">Today</div>
        <div className="bubble ai" style={{ alignSelf: "flex-start" }}>The Calderon scheduling order is drafted — ready for your signature.</div>
        <div className="bubble me thaana" style={{ direction: "rtl", textAlign: "right" }}>ޝުކުރިއްޔާ. އިދިކޮޅު ވަކީލު ޖޫން 25 ކަށަވަރުކުރިތަ؟</div>
        <div className="bubble ai thaana" style={{ alignSelf: "flex-start", direction: "rtl", textAlign: "right" }}>އާދެ — އޭ. ލިން ކަށަވަރުކޮށްފި. ޑޮކެޓްކުރަނީ.</div>
        <div className="bubble me">Great, signing now.</div>
        <div className="tiny muted" style={{ alignSelf: "flex-end" }}>Read 9:13</div>
      </div>
      <Note>Chat supports Dhivehi (Thaana) — messages render right-to-left; tap ދ/EN to switch keyboard.</Note>
    </Phone>
  );
}

/* ═══════════ C · New message — role-aware recipients ═══════════ */
function ChatC() {
  const P = ({ initials, name, role, k, ok }) => (
    <div className="row" style={{ padding: "6px 0", gap: 9, opacity: ok ? 1 : .45 }}>
      <span className="av" style={{ borderColor: k ? "var(--" + k + ")" : "var(--ink)" }}>{initials}</span>
      <div className="grow"><div className="sm b">{name}</div><div className="tiny muted">{role}</div></div>
      {ok ? <span className="chip xs ok">Can message</span> : <span className="chip xs">Via staff</span>}
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px" }}>
        <span className="wf-btn sm info block">Start chat</span>
      </div>}
      bar={<WFAppBar back title="New message" sub="as Counsel · Reyes &amp; Cole" right={null} />}>
      <WFSearch placeholder="Search people you can reach…" />
      <span className="seclabel">Court staff</span>
      <div className="sk pad-s tight">
        <P initials="JM" name="J. Mensah" role="Clerk · Division 4" ok />
        <div className="divide"></div>
        <P initials="FD" name="Front desk" role="Registry · Division 4" ok />
      </div>
      <span className="seclabel">Judicial</span>
      <div className="sk pad-s tight">
        <P initials="RA" k="info" name="Hon. R. Alvarez" role="Presiding judge" />
      </div>
      <div className="banner warn">
        <span className="b" style={{ color: "#a8651a" }}>!</span>
        <div className="grow tiny">Parties &amp; counsel can't message judges directly. Reach the court through staff — they relay if needed.</div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { ChatA, ChatB, ChatC });
