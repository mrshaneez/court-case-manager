/* Notifications ×3 — app-wide notification system.
   Every feature emits notifications: deadlines, hearings, scheduling clashes,
   requests, filings/submissions, decisions, assignments, shared targets.
   Role-aware & scope-respecting (you're only notified about what you can see).
   A · Notification center (grouped feed, filters, mark-read)
   B · In-context delivery (toast + banner + tab badges)
   C · Preferences (per-type × per-channel, quiet hours)
*/

/* ═══════════ A · Notification center ═══════════ */
function NotifA() {
  const N = ({ ico, k, title, body, when, unread }) => (
    <div className={"noti" + (unread ? " unread" : "")}>
      <span className={"ni " + k}>{ico}</span>
      <div className="grow">
        <div className="sm nt trunc">{title}</div>
        <div className="tiny muted" style={{ lineHeight: 1.25 }}>{body}</div>
        <div className="tiny muted" style={{ marginTop: 1 }}>{when}</div>
      </div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar back title="Notifications" sub="8 unread"
        right={<span className="wf-btn sm">Mark all</span>} />}>
      <div className="hscroll">
        <Chip cls="solid xs">All</Chip><Chip cls="xs urgent">Deadlines</Chip><Chip cls="xs">Hearings</Chip>
        <Chip cls="xs">Filings</Chip><Chip cls="xs">Requests</Chip><Chip cls="xs">Decisions</Chip>
      </div>
      <span className="seclabel">Today</span>
      <div className="sk pad-s">
        <N ico="⏰" k="urgent" title="Deadline overdue" body="Reply brief — CV-0912 Mercado is 2 days late" when="2h ago" unread />
        <div className="divide"></div>
        <N ico="⚠" k="warn" title="Scheduling clash" body="A. Lin double-booked Jun 11 · confirm to proceed" when="3h ago" unread />
        <div className="divide"></div>
        <N ico="▭" k="info" title="New filing to docket" body="Motion for SJ filed by A. Lin · CV-0912" when="4h ago" unread />
        <div className="divide"></div>
        <N ico="⇄" k="" title="Adjournment request" body="Calderon — move hearing to Jun 25" when="5h ago" />
      </div>
      <span className="seclabel">Yesterday</span>
      <div className="sk pad-s">
        <N ico="✓" k="ok" title="Request granted" body="Your extension on CV-0788 was granted" when="1d ago" />
        <div className="divide"></div>
        <N ico="§" k="info" title="Assigned to a panel" body="You were added to FC-0455 (participating)" when="1d ago" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · In-context delivery ═══════════ */
function NotifB() {
  const tabbar = (
    <div className="wf-tabbar">
      {[["Home", "⌂", 0], ["Docket", "≣", 0], ["Filings", "▭", 3], ["Requests", "⇄", 5], ["Alerts", "◔", 8]].map(([l, i, b], idx) => (
        <div key={idx} className={"tab" + (l === "Alerts" ? " on" : "")} style={{ position: "relative" }}>
          <span className="ico" style={{ position: "relative" }}>{i}{b > 0 && <span className="nbadge">{b}</span>}</span>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
  const toast = (
    <div style={{ position: "absolute", left: 12, right: 12, top: 30, zIndex: 7 }}>
      <div className="toast urgent">
        <span className="ni urgent" style={{ width: 26, height: 26, fontSize: 12 }}>⚠</span>
        <div className="grow"><div className="sm b">Scheduling clash</div><div className="tiny muted">A. Lin double-booked Jun 11 · 9:00</div></div>
        <span className="wf-btn sm" style={{ borderColor: "var(--urgent)", color: "var(--urgent)" }}>View</span>
      </div>
    </div>
  );
  return (
    <Phone tab="" bottom={tabbar} overlay={toast}
      bar={<WFAppBar title="Case detail" sub="CV-0912 · Mercado" right={<span className="ni info" style={{ width: 26, height: 26, fontSize: 12, position: "relative" }}>◔<span className="nbadge" style={{ transform: "translateX(7px)", top: -3 }}>8</span></span>} />}>
      <div style={{ height: 34 }}></div>
      <span className="seclabel">In-line banners</span>
      <div className="banner urgent">
        <span className="b" style={{ color: "var(--urgent)" }}>⏰</span>
        <div className="grow"><div className="sm b">Reply brief overdue</div><div className="tiny muted">Due Jun 9 · file or request an extension</div></div>
      </div>
      <div className="banner">
        <span className="b" style={{ color: "var(--info)" }}>▭</span>
        <div className="grow"><div className="sm b">New filing awaiting docket</div><div className="tiny muted">Motion for SJ · tap to review</div></div>
      </div>
      <div className="banner warn">
        <span className="b" style={{ color: "#a8651a" }}>⇄</span>
        <div className="grow"><div className="sm b">Adjournment needs your decision</div><div className="tiny muted">Calderon · proposed Jun 25</div></div>
      </div>
      <Note>Same alert, three surfaces: a toast on arrival, persistent in-line banners, and a count badge on the tab + bell.</Note>
    </Phone>
  );
}

/* ═══════════ C · Notification preferences ═══════════ */
function NotifC() {
  const Row = ({ label, sub, push, email, sms }) => (
    <div className="row" style={{ padding: "6px 0", gap: 8 }}>
      <div className="grow"><div className="sm b">{label}</div><div className="tiny muted">{sub}</div></div>
      <div className="row" style={{ gap: 9 }}>
        <span className={"tgl" + (push ? " on" : "")}></span>
      </div>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar back title="Notifications" sub="Preferences" right={null} />}>
      <div className="between">
        <span className="seclabel">Channels</span>
        <div className="row" style={{ gap: 6 }}><Chip cls="xs solid">Push</Chip><Chip cls="xs">Email</Chip><Chip cls="xs">SMS</Chip></div>
      </div>
      <span className="seclabel">Notify me about</span>
      <div className="sk pad-s tight">
        <Row label="Deadlines &amp; due dates" sub="Approaching &amp; overdue" push />
        <div className="divide"></div>
        <Row label="Hearings &amp; scheduling" sub="New, changed, clashes" push />
        <div className="divide"></div>
        <Row label="Filings &amp; submissions" sub="To docket / served on you" push />
        <div className="divide"></div>
        <Row label="Requests" sub="Filed &amp; decided" push />
        <div className="divide"></div>
        <Row label="Case assignments" sub="Added to a case / panel" />
        <div className="divide"></div>
        <Row label="Shared targets" sub="Progress milestones" />
      </div>
      <div className="between sk-soft pad-s">
        <div><div className="sm b">Quiet hours</div><div className="tiny muted">9 PM – 7 AM · urgent only</div></div>
        <span className="tgl on"></span>
      </div>
      <Note>Defaults follow your role — a judge gets decisions &amp; clashes; a party gets their own case updates.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { NotifA, NotifB, NotifC });
