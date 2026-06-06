/* Due Dates & Deadlines ×3 — due dates attach to BOTH tasks and cases.
   A · Set-due-date picker (sheet) — presets, calendar, reminder
   B · Case deadlines — a case carries its own target/disposition + key dates
   C · Unified deadline list — tasks + cases together, by urgency
*/

/* compact month grid for the picker */
function MiniCal({ sel = 18, events = [9, 12, 25] }) {
  const cells = [];
  for (let i = 0; i < 35; i++) {
    const n = i - 2;
    const inM = n >= 1 && n <= 30;
    cells.push(
      <div key={i} className={"d" + (inM ? " on" : "") + (n === sel ? " today" : "")}>
        {inM ? n : ""}{inM && events.includes(n) && n !== sel && <span className="ev"></span>}
      </div>
    );
  }
  return (
    <div className="cal">
      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="dow">{d}</div>)}
      {cells}
    </div>
  );
}

/* ═══════════ A · Set due date (sheet) ═══════════ */
function DueA() {
  const sheet = (
    <div className="scrim">
      <div className="sheet">
        <span className="grab"></span>
        <div><div className="b">Set due date</div><div className="tiny muted">Task: File reply brief · CV-0912</div></div>
        <div className="hscroll">
          <Chip cls="xs">Today</Chip><Chip cls="xs">+3 days</Chip><Chip cls="solid xs">+7 days</Chip>
          <Chip cls="xs">End of month</Chip><Chip cls="xs">Hearing −2d</Chip>
        </div>
        <MiniCal sel={18} />
        <div className="between sk-soft pad-s"><span className="sm muted">Time</span><span className="sm b">5:00 PM ▾</span></div>
        <div className="between"><span className="row" style={{ gap: 6 }}><span className="cbox done" style={{ width: 16, height: 16, fontSize: 10 }}>✓</span><span className="sm">Remind 2 days before</span></span></div>
        <div className="row" style={{ gap: 7 }}>
          <span className="wf-btn sm grow">Cancel</span>
          <span className="wf-btn sm info grow">Set due date</span>
        </div>
      </div>
    </div>
  );
  return (
    <Phone tab="" overlay={sheet}
      bar={<WFAppBar back title="Tasks" sub="Assign a due date" right={null} />}>
      <div className="sk pad-s">
        <div className="row"><span className="cbox"></span><span className="grow sm b">File reply brief</span><span className="chip xs muted">No due date</span></div>
        <div className="tiny muted" style={{ marginTop: 4 }}>CV-0912 Mercado · assigned to you</div>
      </div>
      <div className="sk-soft pad-s row" style={{ opacity: .5 }}><span className="cbox"></span><span className="grow sm">Prep witness binder</span></div>
    </Phone>
  );
}

/* ═══════════ B · Case deadlines ═══════════ */
function DueB() {
  const Dl = ({ label, sub, date, k, linked }) => (
    <div className="row" style={{ padding: "5px 0" }}>
      <Dot k={k} />
      <div className="grow"><div className="sm b trunc">{label}</div><div className="tiny muted trunc">{sub}{linked ? " · linked task" : ""}</div></div>
      <span className={"chip xs " + (k || "")}>{date}</span>
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm info block">＋ Add deadline</span>
      </div>}
      bar={<WFAppBar back title="Deadlines" sub="CV-0912 · Mercado" right={<span className="wf-btn sm">Edit</span>} />}>
      <span className="seclabel">Case target</span>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="between"><span className="sm b">Target disposition</span><span className="chip xs info">Sep 30</span></div>
        <div className="prog" style={{ margin: "7px 0 4px" }}><i style={{ width: "40%" }}></i></div>
        <div className="between tiny muted"><span>89 days elapsed</span><span>112 to target</span></div>
      </div>
      <span className="seclabel">Key dates</span>
      <div className="sk pad-s tight">
        <Dl label="Reply brief due" sub="Filing" date="Jun 9" k="urgent" linked />
        <div className="divide"></div>
        <Dl label="Discovery cutoff" sub="Court-ordered" date="Jul 15" k="warn" />
        <div className="divide"></div>
        <Dl label="Pre-trial order" sub="Filing" date="Aug 1" k="open" linked />
        <div className="divide"></div>
        <Dl label="Service of process" sub="Statutory · 90d — met" date="Done" k="ok" />
      </div>
      <Note>A case carries its own due dates (target / disposition) plus per-deadline dates — separate from individual tasks.</Note>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ C · Unified deadline list (tasks + cases) ═══════════ */
function DueC() {
  const Item = ({ kind, label, sub, date, k }) => (
    <div className="row" style={{ padding: "5px 0" }}>
      <span className={"chip xs " + (kind === "Case" ? "info" : "")} style={{ width: 38, justifyContent: "center" }}>{kind}</span>
      <div className="grow"><div className="sm b trunc">{label}</div><div className="tiny muted trunc">{sub}</div></div>
      <span className={"chip xs " + k}>{date}</span>
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar title="Deadlines" sub="All · next 30 days" right={<span className="wf-btn sm">Filter</span>} />}>
      <div className="seg"><div className="on">All</div><div>Tasks</div><div>Cases</div></div>
      <div className="between"><span className="seclabel" style={{ color: "var(--urgent)" }}>Overdue</span><span className="chip xs urgent">3</span></div>
      <div className="sk-2 pad-s tight" style={{ borderColor: "var(--urgent)" }}>
        <Item kind="Task" label="File reply brief" sub="CV-0912 Mercado" date="2d late" k="urgent" />
        <div className="divide"></div>
        <Item kind="Case" label="Target disposition" sub="CV-2023-0440 Okonjo" date="88d late" k="urgent" />
      </div>
      <div className="between"><span className="seclabel">This week</span><span className="chip xs warn">7</span></div>
      <div className="sk pad-s tight">
        <Item kind="Task" label="Sign scheduling orders" sub="3 cases" date="Today" k="warn" />
        <div className="divide"></div>
        <Item kind="Case" label="Discovery cutoff" sub="CV-0912 Mercado" date="Jun 12" k="warn" />
        <div className="divide"></div>
        <Item kind="Task" label="Review continuance" sub="CR-1187 Okafor" date="Jun 13" k="open" />
      </div>
      <div className="between"><span className="seclabel">Later</span><span className="chip xs">14</span></div>
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { DueA, DueB, DueC });
