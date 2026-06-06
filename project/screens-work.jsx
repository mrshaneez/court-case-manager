/* Tasks ×3 + Calendar ×3 + Statistics ×3 */

/* ═══════════ TASKS ═══════════ */
function Task({ label, meta, tag, done }) {
  return (
    <div className="row" style={{ padding: "5px 0" }}>
      <span className={"cbox" + (done ? " done" : "")}>{done ? "✓" : ""}</span>
      <div className="grow">
        <div className={"sm trunc" + (done ? " muted" : " b")} style={done ? { textDecoration: "line-through" } : {}}>{label}</div>
        {meta && <div className="tiny muted trunc">{meta}</div>}
      </div>
      {tag && <span className={"chip xs " + (tag[1] || "")}>{tag[0]}</span>}
    </div>
  );
}

/* A · Grouped by due date — checklist */
function TasksA() {
  return (
    <Phone tab="tasks"
      bar={<WFAppBar title="Tasks" sub="34 open · 6 today" right={<span className="wf-btn sm">Filter</span>} />}
      fab>
      <div className="seg"><div className="on">By due</div><div>By case</div><div>Mine</div></div>
      <div className="between"><span className="seclabel" style={{ color: "var(--urgent)" }}>Overdue</span><span className="chip xs urgent">4</span></div>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--urgent)" }}>
        <Task label="File reply brief" meta="CV-0912 Mercado" tag={["2d late", "urgent"]} />
        <Task label="Return signed order" meta="FC-0455 Calderon" tag={["1d late", "urgent"]} />
      </div>
      <div className="between"><span className="seclabel">Today</span><span className="chip xs warn">6</span></div>
      <div className="sk pad-s">
        <Task label="Prep motion hearing" meta="CV-0912 · 9:00 · 4B" tag={["High", "hi"]} />
        <Task label="Review continuance request" meta="CR-1187 Okafor" />
        <Task label="Sign 3 scheduling orders" meta="Calderon, Pham, Reyes" />
      </div>
      <div className="between"><span className="seclabel">This week</span><span className="chip xs">12</span></div>
      <div className="sk pad-s">
        <Task label="Draft findings" meta="PR-0231 Estate of Nguyen" done />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Kanban board — horizontal columns */
function TasksB() {
  const KCard = ({ t, c, tag }) => (
    <div className="sk pad-s tight">
      <div className="sm b" style={{ lineHeight: 1.15 }}>{t}</div>
      <div className="between"><span className="tiny muted trunc">{c}</span>{tag && <span className={"sdot " + tag}></span>}</div>
    </div>
  );
  return (
    <Phone tab="tasks"
      bar={<WFAppBar title="Task board" sub="Drag across stages" right={<span className="wf-btn sm">＋</span>} />}>
      <div className="hscroll" style={{ flex: 1, alignItems: "stretch" }}>
        <div className="kcol">
          <div className="between"><span className="seclabel">To do</span><span className="chip xs">14</span></div>
          <KCard t="File reply brief" c="CV-0912" tag="urgent" />
          <KCard t="Review request" c="CR-1187" tag="warn" />
          <KCard t="Prep hearing" c="CV-0912" tag="info" />
        </div>
        <div className="kcol">
          <div className="between"><span className="seclabel">In progress</span><span className="chip xs info">7</span></div>
          <KCard t="Draft findings" c="PR-0231" tag="info" />
          <KCard t="Annotate exhibits" c="CR-1187" />
        </div>
        <div className="kcol">
          <div className="between"><span className="seclabel">Done</span><span className="chip xs ok">21</span></div>
          <KCard t="Sign order" c="FC-0455" tag="ok" />
        </div>
      </div>
      <Note>Columns scroll sideways; cards carry their case &amp; priority.</Note>
    </Phone>
  );
}

/* C · By priority — matrix-style buckets with assignee */
function TasksC() {
  return (
    <Phone tab="tasks"
      bar={<WFAppBar title="Tasks" sub="By priority" right={<Av>RA</Av>} />}
      fab>
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>5</div><div className="tiny muted">Critical</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "#a8651a" }}>11</div><div className="tiny muted">High</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">18</div><div className="tiny muted">Normal</div></div>
      </div>
      <div className="between"><span className="seclabel">⚑ Critical · do now</span></div>
      <div className="sk pad-s">
        <Task label="File reply brief" meta="CV-0912 · assigned: you" tag={["Overdue", "urgent"]} />
        <Task label="Emergency custody order" meta="FC-0455 · assigned: clerk" tag={["Today", "urgent"]} />
      </div>
      <div className="between"><span className="seclabel">⚑ High</span></div>
      <div className="sk pad-s">
        <Task label="Prep motion hearing" meta="CV-0912 · you" tag={["Jun 11", "warn"]} />
        <Task label="Approve transcript request" meta="CR-1187 · clerk" />
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ CALENDAR / HEARINGS ═══════════ */

/* A · Month grid + selected-day agenda */
function CalA() {
  const days = [];
  for (let i = 0; i < 35; i++) {
    const n = i - 2; // start offset
    const inMonth = n >= 1 && n <= 30;
    const today = n === 11;
    const ev = [4, 6, 9, 11, 14, 18, 21, 25].includes(n);
    const urgent = n === 9;
    days.push(
      <div key={i} className={"d" + (inMonth ? " on" : "") + (today ? " today" : "")}>
        {inMonth ? n : ""}
        {ev && !today && <span className={"ev" + (urgent ? " urgent" : "")}></span>}
      </div>
    );
  }
  return (
    <Phone tab="cal"
      bar={<WFAppBar title="June 2024" sub="6 hearings this week" right={<span className="wf-btn sm">Today</span>} />}>
      <div className="seg"><div>Day</div><div>Week</div><div className="on">Month</div></div>
      <div className="cal">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="dow">{d}</div>)}
        {days}
      </div>
      <div className="between"><span className="seclabel">Tue, Jun 11</span><span className="chip xs info">3 events</span></div>
      <div className="sk pad-s tight">
        <div className="row"><span className="b sm" style={{ width: 38 }}>9:00</span><Dot k="info" /><span className="grow sm trunc">Mercado — Motion · 4B</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><span className="b sm" style={{ width: 38 }}>10:30</span><Dot k="warn" /><span className="grow sm trunc">State v. Okafor · 2A</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><span className="b sm" style={{ width: 38 }}>1:30</span><Dot k="open" /><span className="grow sm trunc">In re Calderon · conf.</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Agenda list — upcoming hearings with courtroom & parties */
function CalB() {
  const Slot = ({ time, ampm, cap, no, court, k, tag }) => (
    <div className="row" style={{ alignItems: "stretch", gap: 8 }}>
      <div className="center" style={{ width: 40, flex: "0 0 auto" }}><div className="b sm">{time}</div><div className="tiny muted">{ampm}</div></div>
      <div className="sk pad-s grow" style={{ borderLeft: "4px solid var(--" + k + ")" }}>
        <div className="between"><span className="sm b trunc">{cap}</span>{tag && <span className={"chip xs " + tag[1]}>{tag[0]}</span>}</div>
        <div className="tiny muted trunc">{no} · {court}</div>
      </div>
    </div>
  );
  return (
    <Phone tab="cal"
      bar={<WFAppBar title="Hearings" sub="Upcoming" right={<span className="wf-btn sm">＋</span>} />}>
      <div className="hscroll"><Chip cls="solid xs">All</Chip><Chip cls="xs">Mine</Chip><Chip cls="xs">4B</Chip><Chip cls="xs">▾ Type</Chip></div>
      <span className="seclabel">Today · Tue 11 Jun</span>
      <Slot time="9:00" ampm="AM" cap="Mercado v. Northbay" no="CV-0912" court="Motion · Rm 4B" k="info" tag={["High", "hi"]} />
      <Slot time="10:30" ampm="AM" cap="State v. Okafor" no="CR-1187" court="Arraign. · Rm 2A" k="warn" />
      <Slot time="1:30" ampm="PM" cap="In re Calderon" no="FC-0455" court="Status · Rm 4B" k="ok" />
      <span className="seclabel">Tomorrow · Wed 12 Jun</span>
      <Slot time="9:30" ampm="AM" cap="Harlow LLC v. Trent" no="CV-0788" court="Pre-trial · 4B" k="open" />
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Week timeline with courtroom lanes */
function CalC() {
  const Lane = ({ room, blocks }) => (
    <div className="row" style={{ alignItems: "stretch", gap: 5, marginBottom: 5 }}>
      <div className="seclabel" style={{ width: 26, flex: "0 0 auto", paddingTop: 7 }}>{room}</div>
      <div className="grow" style={{ position: "relative", height: 30, borderBottom: "1.5px solid var(--line-2)", display: "flex", gap: 3 }}>
        {blocks.map((b, i) => (
          <div key={i} className="sk-soft" style={{ position: "absolute", left: b.l, width: b.w, top: 2, bottom: 4, background: "var(--" + b.k + ")", borderColor: "var(--ink)", borderRadius: 4, opacity: .85 }}></div>
        ))}
      </div>
    </div>
  );
  return (
    <Phone tab="cal"
      bar={<WFAppBar title="Week" sub="10–14 Jun · by courtroom" right={<span className="wf-btn sm">▦</span>} />}>
      <div className="seg"><div>Day</div><div className="on">Week</div><div>Month</div></div>
      <div className="row between tiny muted" style={{ padding: "0 2px" }}>
        <span>9</span><span>10</span><span>11</span><span>12</span><span>1</span><span>2</span><span>3</span><span>4</span>
      </div>
      <div style={{ marginTop: 2 }}>
        <Lane room="4B" blocks={[{ l: "2%", w: "26%", k: "info" }, { l: "55%", w: "20%", k: "ok" }]} />
        <Lane room="2A" blocks={[{ l: "20%", w: "22%", k: "warn" }]} />
        <Lane room="3C" blocks={[{ l: "40%", w: "30%", k: "info" }]} />
        <Lane room="1A" blocks={[{ l: "8%", w: "18%", k: "open" }, { l: "70%", w: "22%", k: "warn" }]} />
      </div>
      <span className="seclabel">Selected · 4B 9:00</span>
      <div className="sk pad-s">
        <div className="between"><span className="sm b">Mercado v. Northbay</span><span className="chip xs info">Motion</span></div>
        <div className="tiny muted">CV-0912 · 60 min · 4 parties · Hon. Alvarez</div>
      </div>
      <div className="row" style={{ gap: 5, marginTop: 4 }}>
        <Chip cls="xs info">■ Civil</Chip><Chip cls="xs warn">■ Criminal</Chip><Chip cls="xs ok">■ Family</Chip>
      </div>
    </Phone>
  );
}

/* ═══════════ STATISTICS ═══════════ */

/* A · KPI tiles + bar charts */
function StatsA() {
  return (
    <Phone tab="cal"
      bottom={<WFTabBar active="" />}
      bar={<WFAppBar title="Statistics" sub="Division 4 · this quarter" right={<span className="wf-btn sm">▾ Q2</span>} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <div className="tile"><span className="num">248</span><span className="lbl">Active cases</span></div>
        <div className="tile"><span className="num">312</span><span className="lbl">Closed YTD</span></div>
        <div className="tile"><span className="num">94<span style={{ fontSize: 12 }}>%</span></span><span className="lbl">Clearance rate</span></div>
        <div className="tile"><span className="num">41<span style={{ fontSize: 11 }}>d</span></span><span className="lbl">Avg to dispo.</span></div>
      </div>
      <span className="seclabel">New vs. closed · 6 mo</span>
      <div className="sk pad-s">
        <div className="barchart">
          <div className="b-col" style={{ height: "50%" }}></div>
          <div className="b-col fill" style={{ height: "70%" }}></div>
          <div className="b-col" style={{ height: "45%" }}></div>
          <div className="b-col fill" style={{ height: "80%" }}></div>
          <div className="b-col" style={{ height: "60%" }}></div>
          <div className="b-col fill" style={{ height: "95%" }}></div>
        </div>
        <div className="row" style={{ gap: 10, marginTop: 5 }}>
          <span className="tiny muted">▨ Filed</span><span className="tiny" style={{ color: "var(--info)" }}>■ Closed</span>
        </div>
      </div>
      <span className="seclabel">Caseload by type</span>
      <div className="sk-soft pad-s tight">
        <div className="row"><span className="sm" style={{ width: 56 }}>Civil</span><div className="prog grow"><i style={{ width: "62%" }}></i></div><span className="tiny b">154</span></div>
        <div className="row"><span className="sm" style={{ width: 56 }}>Criminal</span><div className="prog grow"><i className="hi" style={{ width: "30%" }}></i></div><span className="tiny b">74</span></div>
        <div className="row"><span className="sm" style={{ width: 56 }}>Family</span><div className="prog grow"><i className="ok" style={{ width: "16%" }}></i></div><span className="tiny b">40</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* B · Trends + donut breakdown + table */
function StatsB() {
  return (
    <Phone tab="cal"
      bottom={<WFTabBar active="" />}
      bar={<WFAppBar title="Reports" sub="Disposition trends" right={<span className="wf-btn sm">Export</span>} />}>
      <div className="sk pad-s">
        <div className="between"><span className="seclabel">Pending caseload</span><span className="chip xs ok">▼ 8%</span></div>
        <div className="spark" style={{ marginTop: 6 }}>
          {[40, 55, 48, 62, 58, 70, 65, 80, 72, 60, 52, 45].map((h, i) => <i key={i} style={{ height: h + "%", opacity: i > 8 ? .9 : .5 }}></i>)}
        </div>
        <div className="between tiny muted" style={{ marginTop: 3 }}><span>Jan</span><span>Dec</span></div>
      </div>
      <span className="seclabel">Status breakdown</span>
      <div className="sk-soft pad-s row" style={{ gap: 12 }}>
        <span className="donut"></span>
        <div className="col grow" style={{ gap: 4 }}>
          <div className="row tiny"><span className="sdot info" style={{ width: 8, height: 8 }}></span><span className="grow">Awaiting hearing</span><b>45%</b></div>
          <div className="row tiny"><span className="sdot" style={{ background: "var(--hi)", borderColor: "#c9a91f", width: 8, height: 8 }}></span><span className="grow">In trial</span><b>25%</b></div>
          <div className="row tiny"><span className="sdot open" style={{ width: 8, height: 8 }}></span><span className="grow">Judgment / other</span><b>30%</b></div>
        </div>
      </div>
      <span className="seclabel">By case type</span>
      <div className="sk-soft pad-s tight">
        <div className="between tiny muted"><span style={{ width: 60 }}>Type</span><span>Active</span><span>Closed</span><span>Avg d</span></div>
        <div className="between sm divide" style={{ paddingTop: 4 }}><span style={{ width: 60 }}>Civil</span><span>154</span><span>180</span><span>52</span></div>
        <div className="between sm"><span style={{ width: 60 }}>Criminal</span><span>74</span><span>96</span><span>33</span></div>
        <div className="between sm"><span style={{ width: 60 }}>Family</span><span>40</span><span>36</span><span>61</span></div>
      </div>
      <div className="fade-b"></div>
    </Phone>
  );
}

/* C · Performance scorecards — targets vs actual */
function StatsC() {
  const Score = ({ label, val, target, pct, k, note }) => (
    <div className="sk pad-s">
      <div className="between"><span className="sm b">{label}</span><span className={"chip xs " + k}>{note}</span></div>
      <div className="row" style={{ alignItems: "flex-end", gap: 6, margin: "3px 0" }}>
        <span className="xl b" style={{ lineHeight: 1 }}>{val}</span>
        <span className="tiny muted" style={{ paddingBottom: 3 }}>target {target}</span>
      </div>
      <div className="prog"><i className={k} style={{ width: pct }}></i></div>
    </div>
  );
  return (
    <Phone tab="cal"
      bottom={<WFTabBar active="" />}
      bar={<WFAppBar title="Scorecard" sub="Performance vs. targets" right={<Av>RA</Av>} />}>
      <Score label="Clearance rate" val="94%" target="90%" pct="94%" k="ok" note="On target" />
      <Score label="Avg days to disposition" val="41d" target="45d" pct="78%" k="ok" note="Ahead" />
      <Score label="Cases > 12 months old" val="18" target="≤ 10" pct="64%" k="hi" note="Watch" />
      <Score label="Hearings adjourned" val="11%" target="≤ 8%" pct="80%" k="hi" note="Over" />
      <Note>Bars compare actual to the court's target; color flags status.</Note>
    </Phone>
  );
}

Object.assign(window, {
  TasksA, TasksB, TasksC, CalA, CalB, CalC, StatsA, StatsB, StatsC,
});
