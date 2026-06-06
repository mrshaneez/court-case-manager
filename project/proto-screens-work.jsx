/* Calendar, Tasks, Requests (+detail), Filings, Schedule (+clash), Participating. */

function Participating() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Participating" sub="Panels in other sections" />}>
      <Note>Cases you sit on but don't preside — kept separate from your section's docket.</Note>
      <div className="sk pad-s">
        <div className="row" style={{ padding: "6px 0" }}><Dot k="open" /><div className="grow"><div className="sm b">In re Vance (Div 7)</div><div className="tiny muted">Panel of 3 · Hon. Boateng presiding</div></div><span className="chip xs">Jun 13</span></div>
        <div className="divide"></div>
        <div className="row" style={{ padding: "6px 0" }}><Dot k="ok" /><div className="grow"><div className="sm b">Okonjo v. State (Div 2)</div><div className="tiny muted">Panel of 3 · sitting judge</div></div><span className="chip xs ok">Jun 19</span></div>
      </div>
    </Screen>
  );
}

function Calendar() {
  const nav = useNav();
  const [view, setView] = React.useState("Month");
  const events = { 9: "urgent", 11: "info", 14: "info", 18: "info", 21: "info", 25: "info" };
  const cells = [];
  for (let i = 0; i < 35; i++) {
    const n = i - 2, inM = n >= 1 && n <= 30, today = n === 11;
    cells.push(
      <div key={i} className={"d" + (inM ? " on" : "") + (today ? " today" : "")}>
        {inM ? n : ""}{events[n] && !today && <span className={"ev " + events[n]}></span>}
      </div>
    );
  }
  const slot = (time, id, kind, k) => (
    <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={() => nav.go("case", { id })}>
      <span className="b sm" style={{ width: 42 }}>{time}</span><Dot k={k} />
      <span className="grow sm trunc">{CASES[id].cap} · {CASES[id].next.room}</span>
      <span className="tiny muted">{kind}</span>
    </Tap>
  );
  return (
    <Screen bar={<AppBar title="June 2024" sub="6 hearings this week" right={<RoleSwitch />} />}
      bottom={<TabBar active="calendar" badges={{ requests: 3 }} />}
      fab={{ icon: "+", go: "schedule" }}>
      <div className="seg" style={{ flex: "0 0 auto" }}>
        {["Day", "Week", "Month"].map((v) => <div key={v} className={view === v ? "on" : ""} onClick={() => setView(v)}>{v}</div>)}
      </div>
      <div className="cal" style={{ flex: "0 0 auto" }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="dow">{d}</div>)}
        {cells}
      </div>
      <SecLabel right="3 events">Tue, Jun 11</SecLabel>
      <div className="sk pad-s tight">
        {slot("9:00", "CV-0912", "Motion", "info")}
        <div className="divide" style={{ margin: "4px 0" }}></div>
        {slot("10:30", "CR-1187", "Arraign.", "warn")}
        <div className="divide" style={{ margin: "4px 0" }}></div>
        {slot("1:30", "FC-0455", "Conf.", "open")}
      </div>
    </Screen>
  );
}

function Tasks() {
  const nav = useNav();
  const groups = ["Overdue", "Today", "This week"];
  return (
    <Screen bar={<AppBar back title="Tasks" sub="34 open · 6 today" right={<RoleSwitch />} />}
      fab={{ icon: "+", go: "newTask" }}>
      <div className="seg" style={{ flex: "0 0 auto" }}><div className="on">By due</div><div onClick={() => nav.toast("Group by case")}>By case</div><div onClick={() => nav.toast("Your tasks only")}>Mine</div></div>
      {groups.map((g) => {
        const items = TASKS.filter((t) => t.group === g);
        if (!items.length) return null;
        const k = g === "Overdue" ? "urgent" : g === "Today" ? "warn" : "";
        return (
          <React.Fragment key={g}>
            <SecLabel right={items.length}><span style={k === "urgent" ? { color: "var(--urgent)" } : {}}>{g}</span></SecLabel>
            <div className={"sk pad-s tight" + (g === "Overdue" ? " sk-2" : "")} style={g === "Overdue" ? { borderColor: "var(--urgent)" } : {}}>
              {items.map((t, i) => <TaskItem key={t.id} t={t} divide={i > 0} />)}
            </div>
          </React.Fragment>
        );
      })}
    </Screen>
  );
}

function Requests() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Requests" sub={REQUESTS.length + " pending · Division 4"} right={<RoleSwitch />} />}
      bottom={<TabBar active="requests" badges={{ requests: REQUESTS.length }} />}>
      <div className="seg" style={{ flex: "0 0 auto" }}><div className="on">Pending {REQUESTS.length}</div><div onClick={() => nav.toast("Granted requests")}>Granted</div><div onClick={() => nav.toast("Denied requests")}>Denied</div></div>
      {REQUESTS.map((r) => (
        <Tap key={r.id} className={"sk pad-s" + (r.typeK === "warn" ? " sk-2" : "")} style={r.typeK === "warn" ? { borderColor: "var(--warn)" } : {}} onClick={() => nav.go("requestDetail", { id: r.id })}>
          <div className="between"><span className={"chip xs " + r.typeK}>{r.type}</span><span className="tiny muted">{r.when}</span></div>
          <div className="sm b trunc" style={{ margin: "3px 0 1px" }}>{r.title}</div>
          <div className="tiny muted trunc">{CASES[r.case] ? CASES[r.case].short : r.case} · {r.who}</div>
          <div className="row" style={{ gap: 6, marginTop: 6 }}>
            <Tap className="wf-btn sm info" onClick={(e) => { e.stopPropagation(); nav.toast("Request granted", "ok"); }}>Grant</Tap>
            <Tap className="wf-btn sm" onClick={(e) => { e.stopPropagation(); nav.toast("Request denied"); }}>Deny</Tap>
            <Tap className="wf-btn sm" onClick={(e) => { e.stopPropagation(); nav.go("requestDetail", { id: r.id }); }}>Open</Tap>
          </div>
        </Tap>
      ))}
    </Screen>
  );
}

function RequestDetail({ params }) {
  const nav = useNav();
  const r = REQUESTS.find((x) => x.id === params.id) || REQUESTS[0];
  const c = CASES[r.case];
  const decide = (verb, k) => { nav.toast("Request " + verb, k); nav.back(); };
  return (
    <Screen bar={<AppBar back title={r.type[0] + r.type.slice(1).toLowerCase()} sub={(c ? c.short : r.case) + " · " + r.title.slice(0, 18)} right={<span className="chip xs warn">Pending</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => decide("denied")}>Deny</Tap>
        <Tap className="wf-btn sm grow" onClick={() => nav.go("schedule", { id: r.case })}>Reschedule</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => decide("granted", "ok")}>Grant</Tap>
      </div>}>
      <div className="sk pad-s tight">
        <div className="between sm"><span className="muted">Requested by</span><span className="b">{r.who}</span></div>
        <div className="between sm"><span className="muted">Case</span><span className="b">{c ? c.cap : r.case}</span></div>
        <div className="between sm"><span className="muted">Filed</span><span className="b">{r.when}</span></div>
      </div>
      <SecLabel>Reason</SecLabel>
      <div className="sk-soft pad-s"><span className="bar"></span><span className="bar" style={{ width: "85%", marginTop: 6 }}></span><span className="bar lite" style={{ width: "45%", marginTop: 6 }}></span></div>
      <SecLabel>Thread</SecLabel>
      <div className="tl">
        <div className="node on"><div className="row"><span className="b sm">Jun 6</span><span className="chip xs info">Filed</span></div><div className="tiny muted">{r.who} filed the request</div></div>
        <div className="node"><div className="row"><span className="b sm">Jun 6</span><span className="chip xs">Response</span></div><div className="tiny muted">Opposing party — no objection</div></div>
        <div className="node urgent"><div className="row"><span className="b sm">Now</span><span className="chip xs urgent">Awaiting you</span></div><div className="tiny muted">Decision required</div></div>
      </div>
    </Screen>
  );
}

function Filings() {
  const nav = useNav();
  const [done, setDone] = React.useState({});
  return (
    <Screen bar={<AppBar back title="Filings intake" sub="14 pending · Division 4" right={<RoleSwitch />} />}>
      <div className="seg" style={{ flex: "0 0 auto" }}><div className="on">Pending 14</div><div onClick={() => nav.toast("Docketed filings")}>Docketed</div><div onClick={() => nav.toast("Returned filings")}>Returned</div></div>
      {FILINGS.filter((f) => !done[f.id]).map((f) => (
        <div key={f.id} className="sk pad-s">
          <div className="between"><span className={"chip xs " + f.typeK}>{f.type}</span><span className="tiny muted">{f.when}</span></div>
          <div className="sm b trunc" style={{ margin: "3px 0 1px" }}>{f.title}</div>
          <div className="tiny muted trunc">{CASES[f.case] ? CASES[f.case].short : f.case} · {f.who}</div>
          <div className="row" style={{ gap: 6, marginTop: 6 }}>
            <Tap className="wf-btn sm info" onClick={() => { setDone((d) => ({ ...d, [f.id]: 1 })); nav.toast("Filing docketed", "ok"); }}>Docket</Tap>
            <Tap className="wf-btn sm" onClick={() => { setDone((d) => ({ ...d, [f.id]: 1 })); nav.toast("Returned to filer"); }}>Return</Tap>
            <Tap className="wf-btn sm" onClick={() => nav.toast("Referred to judge")}>Refer</Tap>
          </div>
        </div>
      ))}
      {FILINGS.every((f) => done[f.id]) && <div className="empty">All filings processed ✓</div>}
    </Screen>
  );
}

function Schedule({ params }) {
  const nav = useNav();
  const [room, setRoom] = React.useState("2A");
  return (
    <Screen bar={<AppBar back title="Schedule hearing" sub="Conflict-checked" />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.toast("Draft saved")}>Save draft</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => nav.sheet("clash")}>Check & schedule</Tap>
      </div>}>
      <div className="col" style={{ gap: 3 }}><span className="seclabel">Case</span>
        <div className="sk-soft pad-s row" style={{ minHeight: 30 }}><span className="grow sm b">{params.id ? (CASES[params.id] ? CASES[params.id].no : params.id) : "CV-2024-0912 · Mercado v. Northbay"}</span><span className="muted">▾</span></div>
      </div>
      <div className="row" style={{ gap: 7 }}>
        <div className="grow col" style={{ gap: 3 }}><span className="seclabel">Date</span><div className="sk-soft pad-s row"><span className="grow sm b">Jun 11, 2024</span><span className="muted">▦</span></div></div>
        <div style={{ width: 96 }} className="col"><span className="seclabel" style={{ marginBottom: 3 }}>Time</span><div className="sk-soft pad-s row"><span className="grow sm b">9:00 AM</span><span className="muted">▾</span></div></div>
      </div>
      <span className="seclabel">Courtroom</span>
      <div className="row" style={{ gap: 6 }}>
        {[["4B", "busy"], ["2A", ""], ["3C", ""]].map(([r, b]) => (
          <span key={r} className={"room tap" + (room === r ? " on" : b ? " busy" : "")} onClick={() => setRoom(r)}>{r}<span className="cap">{b || "free"}</span></span>
        ))}
        <span className="room add tap" onClick={() => nav.toast("Only admins add rooms")}>＋</span>
      </div>
      <SecLabel>Participants · auto-checked</SecLabel>
      <div className="sk pad-s tight">
        <div className="row"><Av k="info">RA</Av><span className="grow sm trunc">Hon. Alvarez (judge)</span><span className="chip xs ok">free</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><Av>AL</Av><span className="grow sm trunc">A. Lin · Counsel</span><span className="chip xs urgent">clash</span></div>
      </div>
      <div className="clash">
        <span className="warn-ico">⚠</span>
        <div className="grow"><div className="sm b" style={{ color: "var(--urgent)" }}>1 conflict found</div><div className="tiny muted">A. Lin is in CR-1187 at 9:30.</div></div>
      </div>
    </Screen>
  );
}

Object.assign(window, { Participating, Calendar, Tasks, Requests, RequestDetail, Filings, Schedule });
