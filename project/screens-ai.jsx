/* AI Assistant ×3 — available to ANY user, scoped to their assigned role.
   Same bot, different capabilities & suggestions per role; never crosses
   permission boundaries (e.g. counsel only sees assigned cases).
   A · Full chat        — role: Counsel
   B · Quick-ask answer — role: Judge
   C · Agentic draft     — role: Counsel (drafts an adjournment to file)
*/

function RolePill({ children }) {
  return <span className="role-pill"><span className="ai-spark">✦</span>{children}</span>;
}
function AiBar({ ph = "Ask about your cases…" }) {
  return (
    <div className="askbar">
      <span className="ai-ava">✦</span>
      <span className="grow trunc">{ph}</span>
      <span className="b" style={{ fontSize: 15 }}>↑</span>
    </div>
  );
}

/* A · Role-aware chat — Counsel */
function AiA() {
  return (
    <Phone tab=""
      bottom={<div style={{ borderTop: "2px solid var(--ink)", padding: "8px 10px" }}><AiBar /></div>}
      bar={<WFAppBar title="Assistant" sub="Scoped to your role"
        right={<span className="ai-ava">✦</span>} />}>
      <div className="between">
        <RolePill>Counsel · Reyes &amp; Cole</RolePill>
        <span className="tiny muted">9 assigned cases</span>
      </div>
      <div className="col" style={{ gap: 7, flex: 1 }}>
        <div className="bubble me">What's due on my cases this week?</div>
        <div className="row" style={{ alignItems: "flex-start", gap: 6 }}>
          <span className="ai-ava">✦</span>
          <div className="bubble ai">
            You have <b>3 deadlines</b> across your assigned cases:
            <div className="sk pad-s" style={{ background: "var(--paper)", marginTop: 6 }}>
              <div className="row"><Dot k="urgent" /><span className="grow sm trunc">Reply brief — Mercado</span><span className="chip xs urgent">Jun 9</span></div>
              <div className="divide" style={{ margin: "5px 0" }}></div>
              <div className="row"><Dot k="warn" /><span className="grow sm trunc">Disclosure — Harlow</span><span className="chip xs warn">Jun 12</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col" style={{ gap: 5 }}>
        <span className="seclabel">Try</span>
        <div className="hscroll">
          <Chip cls="xs info">Draft an adjournment</Chip><Chip cls="xs">Summarize Mercado</Chip><Chip cls="xs">My next hearing</Chip>
        </div>
      </div>
      <Note>Counsel sees only their assigned cases — the bot can't surface others.</Note>
    </Phone>
  );
}

/* B · Quick-ask answer card — Judge */
function AiB() {
  return (
    <Phone tab=""
      bar={<WFAppBar title="Ask the assistant" sub="Hon. R. Alvarez · Division 4"
        right={<span className="ai-ava">✦</span>} />}>
      <RolePill>Judge · full section access</RolePill>
      <div className="askbar" style={{ borderStyle: "solid" }}>
        <span className="ai-ava">✦</span><span className="grow b" style={{ color: "var(--ink)" }}>Oldest cases past target?</span>
      </div>
      <div className="sk pad-s">
        <div className="row" style={{ gap: 6, marginBottom: 4 }}><span className="ai-ava">✦</span><span className="seclabel">Answer</span></div>
        <div className="sm"><b>4 cases</b> in Division 4 are past their target disposition date:</div>
        <div className="sk-soft pad-s tight" style={{ marginTop: 6 }}>
          <div className="between sm"><span className="trunc grow">CV-2023-0440 Okonjo</span><span className="chip xs urgent">+88d</span></div>
          <div className="between sm"><span className="trunc grow">FC-2023-0301 In re Vance</span><span className="chip xs urgent">+61d</span></div>
          <div className="between sm"><span className="trunc grow">CV-2023-0512 Bayliss</span><span className="chip xs warn">+22d</span></div>
        </div>
      </div>
      <span className="seclabel">Suggested actions</span>
      <div className="col" style={{ gap: 6 }}>
        <span className="wf-btn sm block info">Schedule status conferences</span>
        <span className="wf-btn sm block">Draft show-cause orders</span>
      </div>
      <div className="col" style={{ gap: 5, marginTop: "auto" }}>
        <span className="seclabel">Ask next</span>
        <div className="hscroll"><Chip cls="xs">Clearance rate trend</Chip><Chip cls="xs">Pending requests</Chip><Chip cls="xs">Today's docket</Chip></div>
      </div>
    </Phone>
  );
}

/* C · Agentic draft & confirm — Counsel filing an adjournment */
function AiC() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Edit</span>
        <span className="wf-btn sm info grow">Review &amp; submit</span>
      </div>}
      bar={<WFAppBar back title="Assistant" sub="Drafted a request" right={<span className="ai-ava">✦</span>} />}>
      <div className="row" style={{ alignItems: "flex-start", gap: 6 }}>
        <span className="ai-ava">✦</span>
        <div className="bubble ai">I've drafted an <b>adjournment request</b> for Mercado based on your note. Review before it's filed.</div>
      </div>
      <div className="sk pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="between"><span className="chip xs warn">ADJOURNMENT</span><span className="tiny muted">draft</span></div>
        <div className="sk-soft pad-s tight" style={{ marginTop: 6 }}>
          <div className="between sm"><span className="muted">Case</span><span className="b">CV-0912 Mercado</span></div>
          <div className="between sm"><span className="muted">Current</span><span className="b">Jun 11, 9:00</span></div>
          <div className="between sm"><span className="muted">Proposed</span><span className="b" style={{ color: "var(--info)" }}>Jun 25, 9:00</span></div>
        </div>
        <span className="seclabel" style={{ display: "block", marginTop: 7 }}>Reason (drafted)</span>
        <div className="sm" style={{ marginTop: 2 }}>Lead counsel has a conflicting trial setting; opposing counsel consents to the new date.</div>
      </div>
      <Note>The bot drafts within your permissions — you file it; the judge decides. It can't grant its own request.</Note>
    </Phone>
  );
}

Object.assign(window, { AiA, AiB, AiC });
