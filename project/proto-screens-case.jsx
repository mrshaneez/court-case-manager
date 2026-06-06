/* Docket (case list) + Case detail with working sub-tabs. */

function Docket() {
  const nav = useNav();
  const [filter, setFilter] = React.useState("All");
  const chips = ["All", "Civil", "Criminal", "Family"];
  const ids = CASE_ORDER.filter((id) => filter === "All" || CASES[id].type === filter);
  return (
    <Screen bar={<AppBar title="Docket" sub={nav.role.id === "chief" ? "All sections · 1,204" : "Division 4 · 248 active"} right={<RoleSwitch />} />}
      bottom={<TabBar active="docket" badges={{ requests: 3 }} />}
      fab={{ icon: "+", go: nav.role.id === "admin" ? "newCase" : "newSubmission" }}>
      <Search placeholder="Search caption, no., party…" onClick={() => nav.toast("Search across the docket")} />
      <div className="row wrap" style={{ gap: 5, flex: "0 0 auto" }}>
        {chips.map((c) => <Chip key={c} cls={"xs" + (filter === c ? " solid" : "")} onClick={() => setFilter(c)}>{c}</Chip>)}
        <Chip cls="xs info" onClick={() => nav.toast("Filter by status, court, judge…")}>▾ Status</Chip>
      </div>
      <SecLabel right={ids.length + " results"}>Sorted: next hearing ↑</SecLabel>
      <div className="sk pad-s">
        {ids.map((id, i) => (
          <React.Fragment key={id}>
            {i > 0 && <div className="divide"></div>}
            <CaseRow id={id} sub={CASES[id].parties[0].name + " · " + CASES[id].type} />
          </React.Fragment>
        ))}
      </div>
    </Screen>
  );
}

function Case({ params }) {
  const nav = useNav();
  const c = CASES[params.id] || CASES["CV-0912"];
  const [tab, setTab] = React.useState("Overview");
  const tabs = ["Overview", "Docket", "Docs", "Tasks", "Parties"];
  const caseDocs = DOCS.filter((d) => d.case === c.short);
  const caseTasks = TASKS.filter((t) => t.case === c.short);
  const external = nav.role.id === "party" || nav.role.id === "counsel";

  const actionBar = (
    <div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
      {external
        ? <>
            <Tap className="wf-btn sm grow" onClick={() => nav.go("messages", {})}>Message clerk</Tap>
            <Tap className="wf-btn sm info grow" onClick={() => nav.go("newRequest", { id: c.short })}>File a request</Tap>
          </>
        : <>
            <Tap className="wf-btn sm grow" onClick={() => nav.toast("Note added to case")}>＋ Note</Tap>
            <Tap className="wf-btn sm grow" onClick={() => nav.go("schedule", { id: c.short })}>Schedule</Tap>
            <Tap className="wf-btn sm info grow" onClick={() => nav.toast("Case updated")}>Update</Tap>
          </>}
    </div>
  );

  return (
    <Screen bar={<AppBar back title={c.cap.length > 22 ? c.short : c.cap} sub={c.no + " · " + c.type + " · " + c.section}
      right={c.prio === "High" ? <span className="chip xs hi">HIGH</span> : <span className="chip xs">{c.type}</span>} />}
      bottom={actionBar} bodyClass="tight">
      <Tap className="sk pad-s" style={{ flex: "0 0 auto" }} onClick={() => nav.go("timeline", { id: c.short })}>
        <div className="between"><span className="row" style={{ gap: 5 }}><Dot k={c.statusK} /><span className="sm b">{c.status}</span></span><span className="tiny muted">{c.progress}% · timeline ›</span></div>
        <div className="prog" style={{ margin: "7px 0 4px" }}><i style={{ width: c.progress + "%" }}></i></div>
        <div className="between tiny muted"><span>Stage: {c.stage}</span><span>Next: {c.next.date}, {c.next.room}</span></div>
      </Tap>
      <div className="tabs" style={{ flex: "0 0 auto" }}>
        {tabs.map((t) => <div key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</div>)}
      </div>

      {tab === "Overview" && <>
        <div className="row" style={{ gap: 6 }}>
          <div className="sk-soft pad-s grow"><div className="tiny muted">Target</div><div className="sm b">{c.target}</div></div>
          <div className="sk-soft pad-s grow"><div className="tiny muted">Days open</div><div className="sm b">{c.daysOpen}</div></div>
          <Tap className="sk-soft pad-s grow" onClick={() => setTab("Docs")}><div className="tiny muted">Filings</div><div className="sm b">{c.filings}</div></Tap>
        </div>
        <SecLabel right="next">Hearing</SecLabel>
        <Tap className="sk pad-s" onClick={() => nav.go("calendar", {})}>
          <div className="between"><span className="sm b">{c.next.kind}</span><span className="chip xs info">{c.next.date} · {c.next.time}</span></div>
          <div className="tiny muted">Courtroom {c.next.room} · {c.judge}</div>
        </Tap>
        {!external && <>
          <SecLabel>Create on this case</SecLabel>
          <div className="row wrap" style={{ gap: 6 }}>
            <Tap className="wf-btn sm" onClick={() => nav.go("newTask", { id: c.short })}>＋ Task</Tap>
            <Tap className="wf-btn sm" onClick={() => nav.go("newTarget", { id: c.short })}>＋ Target</Tap>
            <Tap className="wf-btn sm" onClick={() => nav.go("newDocument", { id: c.short })}>＋ Document</Tap>
            <Tap className="wf-btn sm" onClick={() => nav.go("docgen", { id: c.short })}>＋ Order</Tap>
            <Tap className="wf-btn sm" onClick={() => nav.go("schedule", { id: c.short })}>＋ Hearing</Tap>
          </div>
        </>}
        <SecLabel right={c.parties.length}>Parties</SecLabel>
        <Tap className="sk pad-s tight" onClick={() => setTab("Parties")}>
          {c.parties.slice(0, 2).map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="divide" style={{ margin: "6px 0" }}></div>}
              <div className="row"><Av>{p.init}</Av><div className="grow"><div className="sm b">{p.name}</div><div className="tiny muted">{p.role}</div></div></div>
            </React.Fragment>
          ))}
        </Tap>
      </>}

      {tab === "Docket" && <>
        <SecLabel>Docket timeline</SecLabel>
        <div className="tl">
          {c.timeline.map((e, i) => (
            <div key={i} className={"node " + e.k}>
              <div className="row"><span className="b sm">{e.date}</span><span className={"chip xs " + (e.k === "urgent" ? "urgent" : e.k === "on" ? "info" : "")}>{e.tag}</span></div>
              <div className="sm trunc">{e.text}</div>
            </div>
          ))}
        </div>
        <Tap className="wf-btn sm block" onClick={() => nav.go("timeline", { id: c.short })}>View progress timeline &amp; durations ›</Tap>
      </>}

      {tab === "Docs" && <>
        <SecLabel right={caseDocs.length + " files"}>Documents</SecLabel>
        <div className="sk pad-s">
          {caseDocs.length ? caseDocs.map((d, i) => (
            <React.Fragment key={d.id}>
              {i > 0 && <div className="divide"></div>}
              <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={() => nav.go("viewer", { id: d.id })}>
                <span className="ico-ph" style={{ width: 24, height: 28, fontSize: 6.5, fontWeight: 700 }}>{d.ext}</span>
                <div className="grow"><div className="sm b trunc">{d.name}</div><div className="tiny muted trunc">{d.meta}</div></div>
                {d.tag && <span className={"chip xs " + d.tagK}>{d.tag}</span>}
              </Tap>
            </React.Fragment>
          )) : <div className="empty">No documents yet</div>}
        </div>
        {!external && <div className="row" style={{ gap: 7 }}>
          <Tap className="wf-btn sm info grow" onClick={() => nav.go("newDocument", { id: c.short })}>＋ Add document</Tap>
          <Tap className="wf-btn sm grow" onClick={() => nav.go("docgen", { id: c.short })}>＋ Order</Tap>
        </div>}
      </>}

      {tab === "Tasks" && <>
        <SecLabel right={caseTasks.length}>Tasks</SecLabel>
        <div className="sk pad-s tight">
          {caseTasks.length ? caseTasks.map((t, i) => <TaskItem key={t.id} t={t} divide={i > 0} />) : <div className="empty">No open tasks</div>}
        </div>
        {!external && <Tap className="wf-btn sm block info" onClick={() => nav.go("newTask", { id: c.short })}>＋ Add task</Tap>}
      </>}

      {tab === "Parties" && <>
        <SecLabel right={c.parties.length}>Parties & representatives</SecLabel>
        <div className="sk pad-s">
          {c.parties.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="divide"></div>}
              <Tap row className="row" style={{ padding: "6px 0", gap: 8 }} onClick={() => nav.go("person", { name: p.name, role: p.role, init: p.init })}>
                <Av>{p.init}</Av>
                <div className="grow"><div className="sm b">{p.name}</div><div className="tiny muted">{p.role}</div></div>
                <span className="chip xs">{p.side}</span>
              </Tap>
            </React.Fragment>
          ))}
        </div>
        {!external && canManageParties(nav.role.id) && <Tap className="wf-btn sm block" onClick={() => nav.go("inviteParty", { id: c.short })}>＋ Add party</Tap>}
      </>}
    </Screen>
  );
}

/* shared task item with toggle — done state persists in localStorage */
function TaskItem({ t, divide }) {
  const nav = useNav();
  const sk = "ccm_task_" + t.id;
  const [done, setDone] = React.useState(() => {
    try { const v = localStorage.getItem(sk); return v !== null ? JSON.parse(v) : t.done; } catch { return t.done; }
  });
  const toggle = () => {
    const nd = !done;
    setDone(nd);
    try { localStorage.setItem(sk, JSON.stringify(nd)); } catch {}
    nav.toast(nd ? "Task completed" : "Marked open", nd ? "ok" : "");
  };
  return (
    <>
      {divide && <div className="divide"></div>}
      <div className="row" style={{ padding: "5px 0", gap: 8 }}>
        <span className={"cbox tap" + (done ? " done" : "")} onClick={toggle}>{done ? "✓" : ""}</span>
        <Tap className="grow" onClick={() => t.case && CASES[t.case] && nav.go("case", { id: t.case })}>
          <div className={"sm trunc" + (done ? " muted" : " b")} style={done ? { textDecoration: "line-through" } : {}}>{t.label}</div>
          <div className="tiny muted trunc">{t.case}</div>
        </Tap>
        {t.due && <span className={"chip xs " + t.k}>{t.due}</span>}
      </div>
    </>
  );
}

Object.assign(window, { Docket, Case, TaskItem });

/* Progress timeline — case lifecycle stages with durations + task durations. */
function Timeline({ params }) {
  const nav = useNav();
  const c = CASES[params.id] || CASES["CV-0912"];
  const stages = STAGES[c.short] || [];
  const tasks = TASKS.filter((t) => t.case === c.short);
  const doneCount = stages.filter((s) => s.status === "done").length;
  return (
    <Screen bar={<AppBar back title="Progress timeline" sub={c.short + " · " + c.cap} right={<span className="chip xs">{c.type}</span>} />} bodyClass="tight">
      {/* duration summary */}
      <div className="sk-2 pad-s" style={{ flex: "0 0 auto", borderColor: "var(--info)" }}>
        <div className="between"><span className="row" style={{ gap: 5 }}><Dot k={c.statusK} /><span className="sm b">{c.status}</span></span><span className="chip xs info">{c.progress}% complete</span></div>
        <div className="prog" style={{ margin: "7px 0 5px" }}><i style={{ width: c.progress + "%" }}></i></div>
        <div className="row" style={{ gap: 6 }}>
          <div className="grow center"><div className="b sm">{c.daysOpen}d</div><div className="tiny muted">open</div></div>
          <div className="grow center"><div className="b sm">{doneCount}/{stages.length}</div><div className="tiny muted">stages</div></div>
          <div className="grow center"><div className="b sm">{c.target}</div><div className="tiny muted">target</div></div>
        </div>
      </div>
      <div className="between tiny muted" style={{ flex: "0 0 auto", padding: "0 2px" }}><span>Opened {c.opened}</span><span>Stage: {c.stage}</span></div>

      <SecLabel>Lifecycle &amp; duration</SecLabel>
      <div className="tl">
        {stages.map((s, i) => (
          <div key={i} className={"node " + (s.status === "current" ? "on" : "")}>
            <div className="row" style={{ gap: 6 }}>
              <span className="b sm">{s.date}</span>
              <span className={"chip xs " + (s.status === "done" ? "ok" : s.status === "current" ? "info" : "")}>{s.status === "current" ? "Current" : s.status === "done" ? "Done" : "Upcoming"}</span>
            </div>
            <div className="sm b" style={{ opacity: s.status === "upcoming" ? .55 : 1 }}>{s.label}</div>
            <div className="tiny muted">{s.dur === "—" ? "start" : s.dur === "target" ? "target date" : s.dur === "est." ? "estimated" : "took " + s.dur}</div>
          </div>
        ))}
      </div>

      <SecLabel right={tasks.length}>Task progress &amp; duration</SecLabel>
      <div className="sk pad-s tight">
        {tasks.length ? tasks.map((t, i) => (
          <React.Fragment key={t.id}>
            {i > 0 && <div className="divide" style={{ margin: "7px 0" }}></div>}
            <div>
              <div className="between"><span className={"sm b" + (t.done ? " muted" : "")} style={t.done ? { textDecoration: "line-through" } : {}}>{t.label}</span><span className={"chip xs " + (t.done ? "ok" : t.k)}>{t.done ? "Done" : t.due}</span></div>
              <div className="prog" style={{ margin: "5px 0 3px" }}><i className={t.done ? "ok" : ""} style={{ width: t.elapsed + "%", ...(t.k === "urgent" && !t.done ? { background: "var(--urgent)" } : t.k === "warn" && !t.done ? { background: "var(--warn)" } : {}) }}></i></div>
              <div className="between tiny muted"><span>Started {t.start}</span><span>{t.done ? "Completed" : t.elapsed >= 100 ? "Overdue" : t.elapsed + "% of window"}</span></div>
            </div>
          </React.Fragment>
        )) : <div className="empty">No tasks on this case</div>}
      </div>
      <Note>Durations show how long each stage took and how far each task is through its window — so progress &amp; pace are visible at a glance.</Note>
    </Screen>
  );
}

Object.assign(window, { Timeline });
