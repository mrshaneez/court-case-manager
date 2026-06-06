/* Documents, Viewer, People, Person, Messages, Thread, Notifications,
   Stats, Assistant, DocGen, NewRequest, NewSubmission. */

function Documents() {
  const nav = useNav();
  const [f, setF] = React.useState("All");
  const cats = ["All", "Pleadings", "Orders", "Evidence"];
  return (
    <Screen bar={<AppBar back title="Documents" sub="1,204 files" right={<RoleSwitch />} />}
      fab={{ icon: "+", go: "docgen" }}>
      <Search placeholder="Search files & contents…" onClick={() => nav.toast("Full-text search")} />
      <div className="hscroll" style={{ flex: "0 0 auto" }}>{cats.map((c) => <Chip key={c} cls={"xs" + (f === c ? " solid" : "")} onClick={() => setF(c)}>{c}</Chip>)}</div>
      <Tap className="sk-3 pad-s row center" style={{ justifyContent: "center", gap: 7 }} onClick={() => nav.go("docgen", {})}>
        <span className="b" style={{ color: "var(--info)" }}>⬆</span><span className="sm muted">Upload, scan, or generate a document</span>
      </Tap>
      <SecLabel right="recent">All cases</SecLabel>
      <div className="sk pad-s">
        {DOCS.map((d, i) => (
          <React.Fragment key={d.id}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={() => nav.go("viewer", { id: d.id })}>
              <span className="ico-ph" style={{ width: 26, height: 30, fontSize: 7, fontWeight: 700 }}>{d.ext}</span>
              <div className="grow"><div className="sm b trunc">{d.name}</div><div className="tiny muted trunc">{d.case} · {d.meta}</div></div>
              {d.tag && <span className={"chip xs " + d.tagK}>{d.tag}</span>}
            </Tap>
          </React.Fragment>
        ))}
      </div>
    </Screen>
  );
}

function Viewer({ params }) {
  const nav = useNav();
  const d = DOCS.find((x) => x.id === params.id) || DOCS[0];
  const [tool, setTool] = React.useState(null);
  const bar = (
    <div className="pdfbar" style={{ flex: "0 0 auto" }}>
      <span className="tap b" style={{ fontSize: 16 }} onClick={() => nav.back()}>‹</span>
      <span className="grow trunc">{d.name}</span>
      <span className="pb tap" onClick={() => nav.toast("Fit width")}>⤢</span>
      <span className="pb tap" onClick={() => nav.toast("Search in document")}>⌕</span>
    </div>
  );
  const foot = (
    <div className="pdfbar" style={{ justifyContent: "center", gap: 10, flex: "0 0 auto" }}>
      {["Highlight", "Note", "Sign"].map((t) => (
        <span key={t} className={"pb tap" + (tool === t ? " on" : "")} onClick={() => { setTool(t); nav.toast(t + " mode on"); }}>{t}</span>
      ))}
      <span className="dsep" style={{ background: "#5a554d" }}></span>
      <span>3 / 14</span>
    </div>
  );
  return (
    <>
      <StatusBar />
      <div className="app-screen">
        {bar}
        <div style={{ flex: 1, overflowY: "auto", background: "#54504a", padding: 12, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div className="pdfpage">
            <div style={{ textAlign: "center", fontWeight: 700, fontSize: 10.5 }}>{d.name.replace(/\.[a-z]+$/, "").toUpperCase()}</div>
            <div style={{ textAlign: "center", color: "#666" }}>{d.case}</div>
            <div style={{ marginTop: 8 }}>It is hereby <span className={tool === "Highlight" ? "hl" : ""}>ORDERED that a hearing be set for June 11</span>, 2024.</div>
            {[80, 95, 70, 90, 60].map((w, i) => <div key={i} className="ph-line" style={{ width: w + "%", marginTop: 5 }}></div>)}
            {tool === "Sign" && <div className="signbox" style={{ marginTop: 10 }}>✍ Hon. R. Alvarez</div>}
          </div>
          <div className="pdfpage" style={{ opacity: .96 }}>{[100, 92, 80, 95, 70, 88].map((w, i) => <div key={i} className="ph-line" style={{ width: w + "%", marginTop: 5 }}></div>)}</div>
        </div>
        {foot}
      </div>
    </>
  );
}

function People() {
  const nav = useNav();
  const p = (init, name, role, k, side) => (
    <Tap row className="row" style={{ padding: "6px 0", gap: 9 }} onClick={() => nav.go("person", { name, role, init })}>
      <Av k={k}>{init}</Av><div className="grow"><div className="sm b">{name}</div><div className="tiny muted">{role}</div></div>
      <span className="muted b" style={{ fontSize: 14 }}>›</span>
    </Tap>
  );
  return (
    <Screen bar={<AppBar back title="Directory" sub="Division 4 · 142 people" right={<RoleSwitch />} />}
      fab={{ icon: "+", go: "" }}>
      <Search placeholder="Search people, firms, parties…" onClick={() => nav.toast("Search directory")} />
      <div className="hscroll" style={{ flex: "0 0 auto" }}><Chip cls="solid xs">All</Chip><Chip cls="xs">Staff</Chip><Chip cls="xs">Judges</Chip><Chip cls="xs">Lawyers</Chip><Chip cls="xs">Parties</Chip></div>
      <SecLabel>Section judge</SecLabel>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>{p("RA", "Hon. R. Alvarez", "Presiding judge · Division 4", "info")}</div>
      <SecLabel right="8">Staff</SecLabel>
      <div className="sk pad-s">{p("JM", "J. Mensah", "Court clerk")}<div className="divide"></div>{p("DP", "D. Park", "Court reporter")}</div>
      <SecLabel right="46">Lawyers & firms</SecLabel>
      <div className="sk pad-s">{p("RC", "Reyes & Cole LLP", "Law firm · 23 cases")}<div className="divide"></div>{p("AL", "A. Lin", "Counsel · Reyes & Cole")}</div>
      <SecLabel right="shared">Parties directory</SecLabel>
      <div className="sk pad-s">
        {DIRECTORY.map((d, i) => (
          <React.Fragment key={d.email}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "6px 0", gap: 9 }} onClick={() => nav.go("person", { name: d.name, role: d.role, init: d.name.split(" ").map((x) => x[0]).join("").slice(0, 2) })}>
              <Av>{d.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</Av>
              <div className="grow"><div className="sm b trunc">{d.name}</div><div className="tiny muted trunc">{d.role} · {d.email}</div></div>
              <span className="chip xs info">in {d.cases.length} cases</span>
            </Tap>
          </React.Fragment>
        ))}
      </div>
      <Note>One shared directory across the court — a person added in one case is reusable in any other.</Note>
    </Screen>
  );
}

function Person({ params }) {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title={params.name || "A. Lin"} sub={params.role || "Counsel"} right={<span className="chip xs">Profile</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.go("messages", {})}>Message</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => nav.toast("Assigned to case")}>Assign to case</Tap>
      </div>}>
      <div className="row" style={{ gap: 11, alignItems: "center" }}>
        <Av style={{ width: 48, height: 48, fontSize: 16 }}>{params.init || "AL"}</Av>
        <div><div className="b lg">{params.name || "A. Lin"}</div><div className="tiny muted">{params.role || "Counsel · Reyes & Cole"}</div></div>
      </div>
      <div className="sk pad-s tight">
        <div className="between sm"><span className="muted">Active cases</span><span className="b">9</span></div>
        <div className="between sm"><span className="muted">Open requests</span><span className="b" style={{ color: "#a8651a" }}>2</span></div>
        <div className="between sm"><span className="muted">Contact</span><span className="b">a.lin@reyescole.law</span></div>
      </div>
      <SecLabel>Assigned cases</SecLabel>
      <div className="sk pad-s tight">
        <CaseRow id="CV-0912" sub="Defense counsel" right={<span className="tiny muted">Def.</span>} />
        <div className="divide"></div>
        <CaseRow id="CV-0788" sub="Defense counsel" right={<span className="tiny muted">Def.</span>} />
      </div>
    </Screen>
  );
}

function Messages() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Messages" sub="3 unread" right={<RoleSwitch />} />}
      fab={{ icon: "✎", go: "" }}>
      <Search placeholder="Search people & messages…" onClick={() => nav.toast("Search messages")} />
      <div className="hscroll" style={{ flex: "0 0 auto" }}><Chip cls="solid xs">All</Chip><Chip cls="xs">Judges</Chip><Chip cls="xs">Staff</Chip><Chip cls="xs">Parties</Chip></div>
      <div className="sk pad-s">
        {CHATS.map((c, i) => (
          <React.Fragment key={c.id}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "7px 0", gap: 9 }} onClick={() => nav.go("thread", { id: c.id })}>
              <Av k={c.k} style={{ width: 34, height: 34 }}>{c.init}</Av>
              <div className="grow">
                <div className="between"><span className={"sm trunc" + (c.unread ? " b" : "")}>{c.name}</span><span className="tiny muted">{c.when}</span></div>
                <div className={"tiny muted trunc" + (c.dv ? " thaana" : "")} style={c.dv ? { direction: "rtl", textAlign: "left" } : {}}>{c.last}</div>
                <div className="row" style={{ gap: 5, marginTop: 2 }}><span className="chip xs">{c.role}</span>{c.tag && <span className={"chip xs " + (c.dv ? "" : "info")}>{c.tag}</span>}</div>
              </div>
              {c.unread && <span className="sdot info" style={{ alignSelf: "center" }}></span>}
            </Tap>
          </React.Fragment>
        ))}
      </div>
    </Screen>
  );
}

function Thread({ params }) {
  const nav = useNav();
  const c = CHATS.find((x) => x.id === params.id) || CHATS[0];
  const [msgs, setMsgs] = React.useState([
    { me: false, text: "The Calderon scheduling order is drafted — ready for your signature." },
    { me: true, dv: true, text: "ޝުކުރިއްޔާ. އިދިކޮޅު ވަކީލު ޖޫން 25 ކަށަވަރުކުރިތަ؟" },
    { me: false, dv: true, text: "އާދެ — އޭ. ލިން ކަށަވަރުކޮށްފި. ޑޮކެޓްކުރަނީ." },
  ]);
  const send = (dv) => { setMsgs((m) => [...m, dv ? { me: true, dv: true, text: "ރަނގަޅު، ސޮއިކުރަނީ." } : { me: true, text: "Great, signing now." }]); };
  const composer = (
    <div style={{ borderTop: "2px solid var(--ink)", padding: "8px 10px", flex: "0 0 auto" }}>
      <div className="wf-search" style={{ borderColor: "var(--ink)" }}>
        <span className="langtag tap" style={{ padding: "0 6px", fontSize: 9 }} onClick={() => send(true)}>ދ</span>
        <span className="grow trunc muted">Message {c.name}…</span>
        <span className="tap b" style={{ fontSize: 15, color: "var(--info)" }} onClick={() => send(false)}>↑</span>
      </div>
    </div>
  );
  return (
    <>
      <StatusBar />
      <div className="app-screen">
        <AppBar back title={c.name} sub={c.role + " · Division 4"} right={<Av style={{ width: 28, height: 28 }}>{c.init}</Av>} />
        <div className="app-body">
          {c.tag === "CV-0912" || true ? <div className="center" style={{ flex: "0 0 auto" }}><span className="chip xs">Linked to CV-0912 Mercado</span></div> : null}
          <div className="col" style={{ gap: 7 }}>
            {msgs.map((m, i) => (
              <div key={i} className={"bubble " + (m.me ? "me" : "ai") + (m.dv ? " thaana" : "")}
                style={{ alignSelf: m.me ? "flex-end" : "flex-start", ...(m.dv ? { direction: "rtl", textAlign: "right" } : {}) }}>{m.text}</div>
            ))}
          </div>
        </div>
        {composer}
      </div>
    </>
  );
}

function Notifications() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Notifications" sub="8 unread" right={<Tap className="wf-btn sm" onClick={() => nav.toast("All marked read")}>Mark all</Tap>} />}>
      <div className="hscroll" style={{ flex: "0 0 auto" }}><Chip cls="solid xs">All</Chip><Chip cls="xs urgent">Deadlines</Chip><Chip cls="xs">Filings</Chip><Chip cls="xs">Requests</Chip></div>
      <div className="sk pad-s">
        {NOTIFS.map((n, i) => (
          <React.Fragment key={n.id}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className={"noti" + (n.unread ? " unread" : "")} onClick={() => nav.go(n.go[0], n.go[1])}>
              <span className={"ni " + n.k}>{n.ico}</span>
              <div className="grow"><div className="sm nt trunc">{n.title}</div><div className="tiny muted" style={{ lineHeight: 1.25 }}>{n.body}</div><div className="tiny muted">{n.when}</div></div>
            </Tap>
          </React.Fragment>
        ))}
      </div>
    </Screen>
  );
}

function Stats() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Statistics" sub="Division 4 · this quarter" right={<Tap className="wf-btn sm" onClick={() => nav.toast("Period: Q2")}>▾ Q2</Tap>} />}>
      {tiles([
        { num: "248", lbl: "Active cases" }, { num: "312", lbl: "Closed YTD" },
        { num: "94%", lbl: "Clearance rate" }, { num: "41d", lbl: "Avg to dispo." },
      ])}
      <SecLabel>New vs. closed · 6 mo</SecLabel>
      <div className="sk pad-s">
        <div className="barchart">
          {[50, 70, 45, 80, 60, 95].map((h, i) => <div key={i} className={"b-col" + (i % 2 ? " fill" : "")} style={{ height: h + "%" }}></div>)}
        </div>
        <div className="row" style={{ gap: 10, marginTop: 5 }}><span className="tiny muted">▨ Filed</span><span className="tiny" style={{ color: "var(--info)" }}>■ Closed</span></div>
      </div>
      <SecLabel>Caseload by type</SecLabel>
      <div className="sk-soft pad-s tight">
        <div className="row"><span className="sm" style={{ width: 56 }}>Civil</span><div className="prog grow"><i style={{ width: "62%" }}></i></div><span className="tiny b">154</span></div>
        <div className="row"><span className="sm" style={{ width: 56 }}>Criminal</span><div className="prog grow"><i className="hi" style={{ width: "30%" }}></i></div><span className="tiny b">74</span></div>
        <div className="row"><span className="sm" style={{ width: 56 }}>Family</span><div className="prog grow"><i className="ok" style={{ width: "16%" }}></i></div><span className="tiny b">40</span></div>
      </div>
    </Screen>
  );
}

function Assistant() {
  const nav = useNav();
  const role = nav.role;
  const [mode, setMode] = React.useState("cases");        // "cases" | "research"
  const [msgs, setMsgs] = React.useState([]);
  const [view, setView] = React.useState("chat");          // "chat" | "saved"
  const [naming, setNaming] = React.useState(false);
  const [nameVal, setNameVal] = React.useState("");
  const [saved, setSaved] = React.useState([
    { id: "s1", name: "Mercado — discovery research", mode: "research", preview: "Standard for a motion to compel…" },
    { id: "s2", name: "Limitation periods — contract", mode: "research", preview: "Time limits for contract claims…" },
  ]);
  const ask = (q, a) => setMsgs((m) => [...m, { me: true, text: q }, { me: false, text: a, research: mode === "research" }]);
  const newChat = () => { setMsgs([]); setView("chat"); setNaming(false); };
  const saveChat = () => {
    const nm = nameVal.trim() || (mode === "research" ? "Research note" : "Case chat");
    setSaved((s) => [{ id: "s" + Date.now(), name: nm, mode, preview: msgs.length ? msgs[0].text : "Empty chat" }, ...s]);
    setNaming(false); setNameVal(""); nav.toast("Chat saved as “" + nm + "”", "ok");
  };

  const suggCases = role.id === "party"
    ? [["My next hearing?", "Your next hearing is Jun 11 at 9:00 AM in Courtroom 4B (Mercado v. Northbay). Bring your witness list."], ["What do I owe?", "One task is due: submit your witness list by Jun 9."]]
    : [["What's due this week?", "3 deadlines: Reply brief (Mercado, overdue), Disclosure (Harlow, Jun 12), and a status conference (Calderon, Jun 14)."], ["Oldest cases past target?", "4 cases are past target — the oldest is FC-0455 Calderon at +30 days."], ["Draft an adjournment", "Drafted an adjournment for Mercado moving Jun 11 → Jun 25. Review before filing."]];
  const suggResearch = [
    ["Standard for a motion to compel?", "Research aid — a motion to compel typically requires showing: (1) the discovery sought is relevant and proportional, (2) a proper request was served, (3) the response was deficient or absent, and (4) a good-faith effort to confer. Apply your jurisdiction's civil procedure rules and local practice. Verify primary sources before relying on this."],
    ["Limitation period — contract claim?", "Research aid — limitation periods for contract claims vary by jurisdiction and contract type (written vs. oral). Identify the governing statute of limitations, the accrual date, and any tolling. Confirm against the controlling statute and recent case law."],
    ["Elements of adverse possession", "Research aid — adverse possession generally requires possession that is actual, open and notorious, exclusive, hostile, and continuous for the statutory period. Exact elements and periods are jurisdiction-specific — check the controlling statute and precedent."],
    ["Summarize relevant case law", "Research aid — I can outline the issue, the leading authorities, and how courts have applied them, with pin-points to verify. Tell me the jurisdiction and the precise question."],
  ];
  const sugg = mode === "research" ? suggResearch : suggCases;

  const composer = (
    <div style={{ borderTop: "2px solid var(--ink)", padding: "8px 10px", flex: "0 0 auto" }}>
      <div className="askbar"><span className="ai-ava">✦</span><span className="grow trunc">{mode === "research" ? "Ask a legal research question…" : "Ask about your cases…"}</span><span className="b" style={{ fontSize: 15 }}>↑</span></div>
    </div>
  );

  /* saved-chats list view */
  if (view === "saved") {
    return (
      <>
        <StatusBar />
        <div className="app-screen">
          <AppBar back title="Saved chats" sub={saved.length + " conversations" } right={<Tap className="wf-btn sm info" onClick={newChat}>＋ New</Tap>} />
          <div className="app-body">
            <div className="sk pad-s">
              {saved.map((c, i) => (
                <React.Fragment key={c.id}>
                  {i > 0 && <div className="divide"></div>}
                  <Tap row className="row" style={{ padding: "7px 2px", gap: 9 }} onClick={() => { setMode(c.mode); setMsgs([{ me: false, text: c.preview, research: c.mode === "research" }]); setView("chat"); }}>
                    <span className="ai-ava">{c.mode === "research" ? "§" : "✦"}</span>
                    <div className="grow"><div className="sm b trunc">{c.name}</div><div className="tiny muted trunc">{c.preview}</div></div>
                    <span className={"chip xs " + (c.mode === "research" ? "info" : "")}>{c.mode === "research" ? "Research" : "Cases"}</span>
                  </Tap>
                </React.Fragment>
              ))}
            </div>
            <Note>Name and save any conversation — legal-research threads and case chats are kept separately.</Note>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <div className="app-screen">
        <AppBar back title="Assistant" sub={mode === "research" ? "Legal research" : "Scoped to your role"}
          right={<Tap className="wf-btn sm" onClick={() => setView("saved")}>Saved {saved.length}</Tap>} />
        <div className="app-body">
          <div className="seg" style={{ flex: "0 0 auto" }}>
            <div className={mode === "cases" ? "on" : ""} onClick={() => { setMode("cases"); }}>My cases</div>
            <div className={mode === "research" ? "on" : ""} onClick={() => { setMode("research"); }}>Legal research</div>
          </div>
          <div className="between" style={{ flex: "0 0 auto" }}>
            <span className="role-pill"><span className="ai-spark">✦</span>{mode === "research" ? "Research mode" : role.label + " · " + role.sub}</span>
            <div className="row" style={{ gap: 6 }}>
              {msgs.length > 0 && <Tap className="wf-btn sm" onClick={() => setNaming(true)}>Save</Tap>}
              <Tap className="wf-btn sm" onClick={newChat}>New</Tap>
            </div>
          </div>
          {naming && (
            <div className="sk-2 pad-s" style={{ borderColor: "var(--info)", display: "flex", flexDirection: "column", gap: 7, flex: "0 0 auto" }}>
              <span className="seclabel">Name this chat</span>
              <input value={nameVal} autoFocus placeholder={mode === "research" ? "e.g. Adverse possession research" : "e.g. Mercado strategy"}
                onChange={(e) => setNameVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveChat(); }}
                style={{ border: "1.5px solid var(--line)", borderRadius: 9, padding: "7px 9px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)" }} />
              <div className="row" style={{ gap: 7 }}><Tap className="wf-btn sm grow" onClick={() => setNaming(false)}>Cancel</Tap><Tap className="wf-btn sm info grow" onClick={saveChat}>Save chat</Tap></div>
            </div>
          )}
          {msgs.length === 0 && !naming && <div className="empty" style={{ padding: "16px 10px" }}>{mode === "research" ? "Ask a legal-research question.\nAnswers are a research aid — verify sources." : "Ask anything about your cases.\nThe assistant only sees what your role can."}</div>}
          <div className="col" style={{ gap: 7 }}>
            {msgs.map((m, i) => (
              <div key={i} className={"bubble " + (m.me ? "me" : "ai")} style={{ alignSelf: m.me ? "flex-end" : "flex-start" }}>
                {m.research && !m.me && <div className="tiny b" style={{ color: "var(--info)", marginBottom: 2 }}>§ Research</div>}
                {m.text}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}></div>
          <div className="col" style={{ gap: 5, flex: "0 0 auto" }}>
            <span className="seclabel">{mode === "research" ? "Research prompts" : "Try"}</span>
            <div className="hscroll" style={{ flexWrap: "wrap" }}>{sugg.map((s, i) => <Chip key={i} cls="xs info" onClick={() => ask(s[0], s[1])}>{s[0]}</Chip>)}</div>
          </div>
        </div>
        {composer}
      </div>
    </>
  );
}

function DocGen({ params }) {
  const nav = useNav();
  const cc = params && params.id && CASES[params.id] ? CASES[params.id] : null;
  return (
    <Screen bar={<AppBar back title="New order" sub={cc ? "for " + cc.short + " · from Word samples" : "From Word samples · staff"} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.toast("Upload .docx sample")}>⬆ Upload sample</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => nav.toast("Generating document…", "ok")}>Generate</Tap>
      </div>}>
      <SecLabel>Order & document templates</SecLabel>
      <div className="sk pad-s tight">
        {[["Scheduling order", "3 merge fields", "EN", ""], ["Summons / notice", "5 merge fields", "EN", ""], ["ކޯޓު އަމުރު — Court order", "Thaana · 4 fields", "DV", "info"], ["Judgment — civil", "7 merge fields", "EN", ""]].map((t, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "6px 0", gap: 9 }} onClick={() => nav.toast('Generating "' + t[0] + '"', "ok")}>
              <span className="ico-ph" style={{ width: 26, height: 31, fontSize: 6.5, fontWeight: 700, borderColor: "var(--info)", color: "var(--info)" }}>DOC</span>
              <div className="grow"><div className="sm b trunc">{t[0]}</div><div className="tiny muted">{t[1]}</div></div>
              <span className={"chip xs " + t[3]}>{t[2]}</span>
            </Tap>
          </React.Fragment>
        ))}
      </div>
      <Note>Upload Word samples; merge fields & header/footer fill from the case automatically. Dhivehi supported.</Note>
    </Screen>
  );
}

function FormScreen({ title, sub, type, rows, submit }) {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title={title} sub={sub} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.toast("Draft saved")}>Save draft</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => { nav.toast(submit, "ok"); nav.back(); }}>{type}</Tap>
      </div>}>
      {rows}
    </Screen>
  );
}

function NewRequest({ params }) {
  const nav = useNav();
  const [t, setT] = React.useState("Adjournment");
  const types = ["Adjournment", "Extension", "Substitution", "Transcript", "Other"];
  return (
    <FormScreen title="New request" sub={"as " + nav.role.label} type="Submit request" submit="Request filed — sent for decision"
      rows={<>
        <div className="col" style={{ gap: 3 }}><span className="seclabel">Case</span>
          <div className="sk-soft pad-s row"><span className="grow sm b">{params.id && CASES[params.id] ? CASES[params.id].no : "CV-2024-0912 · Mercado"}</span><span className="muted">▾</span></div>
          <span className="tiny muted">Only cases you're assigned to.</span>
        </div>
        <span className="seclabel">Request type</span>
        <div className="row wrap" style={{ gap: 5 }}>{types.map((x) => <Chip key={x} cls={"xs" + (t === x ? " solid" : "")} onClick={() => setT(x)}>{x}</Chip>)}</div>
        <span className="seclabel">Proposed new date</span>
        <div className="sk-soft pad-s row"><span className="grow sm b">Jun 25, 2024 · 9:00 AM</span><span className="muted">▦</span></div>
        <span className="seclabel">Reason</span>
        <div className="sk-soft pad-s" style={{ minHeight: 50 }}><span className="bar"></span><span className="bar" style={{ width: "78%", marginTop: 6 }}></span><span className="bar lite" style={{ width: "50%", marginTop: 6 }}></span></div>
        <Note>Goes to the section judge / clerk for a decision; opposing counsel is notified.</Note>
      </>} />
  );
}

function NewSubmission() {
  const nav = useNav();
  const [t, setT] = React.useState("Motion");
  const types = ["Motion", "Application", "Submission", "Pleading", "Affidavit"];
  return (
    <FormScreen title="New submission" sub={"as " + nav.role.label} type="File submission" submit="Submission filed & served"
      rows={<>
        <div className="col" style={{ gap: 3 }}><span className="seclabel">Case</span>
          <div className="sk-soft pad-s row"><span className="grow sm b">CV-2024-0912 · Mercado v. Northbay</span><span className="muted">▾</span></div>
        </div>
        <span className="seclabel">Type of filing</span>
        <div className="row wrap" style={{ gap: 5 }}>{types.map((x) => <Chip key={x} cls={"xs" + (t === x ? " solid" : "")} onClick={() => setT(x)}>{x}</Chip>)}</div>
        <span className="seclabel">Title</span>
        <div className="sk-soft pad-s row"><span className="grow sm b">{t} — Mercado</span></div>
        <span className="seclabel">Attachments</span>
        <Tap className="sk pad-s row center" style={{ justifyContent: "center", gap: 6, color: "var(--info)" }} onClick={() => nav.toast("Attach document")}><span className="b">＋</span><span className="sm">Add document</span></Tap>
        <div className="between sk-soft pad-s"><span className="sm muted">Filing fee</span><span className="sm b">$60 · pay on file</span></div>
      </>} />
  );
}

Object.assign(window, { Documents, Viewer, People, Person, Messages, Thread, Notifications, Stats, Assistant, DocGen, NewRequest, NewSubmission, FormScreen });

/* ───── Create a task (within a case or from the dashboard) ───── */
function NewTask({ params }) {
  const nav = useNav();
  const [title, setTitle] = React.useState("");
  const [cs, setCs] = React.useState(params.id && CASES[params.id] ? params.id : "");
  const [assignee, setAssignee] = React.useState("Me");
  const [due, setDue] = React.useState("");
  const [prio, setPrio] = React.useState("Normal");
  const [err, setErr] = React.useState("");
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const submit = () => {
    if (!title) { setErr("Give the task a title."); return; }
    nav.toast("Task created" + (cs ? " · " + CASES[cs].short : ""), "ok"); nav.back();
  };
  return (
    <Screen bar={<AppBar back title="New task" sub={params.id ? "On " + (CASES[params.id] ? CASES[params.id].short : params.id) : "Assign to a case"} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.back()}>Cancel</Tap>
        <Tap className="wf-btn sm info grow" onClick={submit}>Create task</Tap>
      </div>}>
      <SecLabel>Task</SecLabel>
      <input value={title} placeholder="What needs doing?" onChange={(e) => { setTitle(e.target.value); setErr(""); }} style={fld} />
      <SecLabel>Case</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>
        {CASE_ORDER.map((id) => <Chip key={id} cls={"xs" + (cs === id ? " solid" : "")} onClick={() => setCs(id)}>{CASES[id].short}</Chip>)}
        <Chip cls={"xs" + (cs === "" ? " solid" : "")} onClick={() => setCs("")}>None</Chip>
      </div>
      <div className="row" style={{ gap: 7 }}>
        <div className="grow col" style={{ gap: 3 }}><span className="seclabel">Assign to</span>
          <div className="row wrap" style={{ gap: 5 }}>{["Me", "Clerk", "Reporter"].map((a) => <Chip key={a} cls={"xs" + (assignee === a ? " solid" : "")} onClick={() => setAssignee(a)}>{a}</Chip>)}</div>
        </div>
      </div>
      <SecLabel>Due date</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{["Today", "+3 days", "+7 days", "Pick date"].map((d) => <Chip key={d} cls={"xs" + (due === d ? " solid" : "")} onClick={() => setDue(d)}>{d}</Chip>)}</div>
      <SecLabel>Priority</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{["Critical", "High", "Normal"].map((p) => <Chip key={p} cls={"xs" + (prio === p ? (p === "Critical" ? " urgent solid" : p === "High" ? " hi" : " solid") : "")} onClick={() => setPrio(p)}>{p}</Chip>)}</div>
      {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
      <Note>Tasks can be created inside a case or from the dashboard, with a due date for the timeline.</Note>
    </Screen>
  );
}

/* ───── Create a target (case / section / court-wide) ───── */
function NewTarget({ params }) {
  const nav = useNav();
  const [title, setTitle] = React.useState("");
  const [scope, setScope] = React.useState(params.id && CASES[params.id] ? "This case" : "My section");
  const [metric, setMetric] = React.useState("Disposition date");
  const [value, setValue] = React.useState("");
  const [share, setShare] = React.useState(false);
  const [err, setErr] = React.useState("");
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const submit = () => {
    if (!title || !value) { setErr("Add a title and a target value."); return; }
    nav.toast("Target set" + (share ? " & shared" : ""), "ok"); nav.back();
  };
  return (
    <Screen bar={<AppBar back title="New target" sub={params.id ? "On " + (CASES[params.id] ? CASES[params.id].short : params.id) : "Set a goal"} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.back()}>Cancel</Tap>
        <Tap className="wf-btn sm info grow" onClick={submit}>Set target</Tap>
      </div>}>
      <SecLabel>Target</SecLabel>
      <input value={title} placeholder="e.g. Resolve within 120 days" onChange={(e) => { setTitle(e.target.value); setErr(""); }} style={fld} />
      <SecLabel>Scope</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{["This case", "My section", "Court-wide"].map((s) => <Chip key={s} cls={"xs" + (scope === s ? " solid" : "")} onClick={() => setScope(s)}>{s}</Chip>)}</div>
      <SecLabel>Measure</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{["Disposition date", "Days to dispose", "Clearance %", "Backlog count"].map((m) => <Chip key={m} cls={"xs" + (metric === m ? " solid" : "")} onClick={() => setMetric(m)}>{m}</Chip>)}</div>
      <SecLabel>Target value</SecLabel>
      <input value={value} placeholder={metric.includes("date") ? "e.g. Sep 30" : metric.includes("%") ? "e.g. 90%" : "e.g. 45"} onChange={(e) => { setValue(e.target.value); setErr(""); }} style={fld} />
      {scope !== "This case" && <div className="between sk-soft pad-s">
        <div><div className="sm b">Share with other sections</div><div className="tiny muted">They see live progress; you stay owner</div></div>
        <span className={"tgl tap" + (share ? " on" : "")} onClick={() => setShare(!share)}></span>
      </div>}
      {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
      <Note>Targets can be set on a single case or for a whole section, and tracked on the timeline &amp; stats.</Note>
    </Screen>
  );
}

Object.assign(window, { NewTask, NewTarget });

/* ───── Add a document to a case (upload / scan / attach) ───── */
function NewDocument({ params }) {
  const nav = useNav();
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("Pleading");
  const [source, setSource] = React.useState("Upload");
  const [err, setErr] = React.useState("");
  const c = params.id && CASES[params.id] ? CASES[params.id] : null;
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const submit = () => {
    if (!title) { setErr("Name the document."); return; }
    nav.toast("Document added" + (c ? " to " + c.short : ""), "ok"); nav.back();
  };
  return (
    <Screen bar={<AppBar back title="Add document" sub={c ? "to " + c.short + " · " + c.cap : "to a case"} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.back()}>Cancel</Tap>
        <Tap className="wf-btn sm info grow" onClick={submit}>Add document</Tap>
      </div>}>
      <SecLabel>Source</SecLabel>
      <div className="row" style={{ gap: 7 }}>
        {[["Upload", "⬆"], ["Scan", "▣"], ["From library", "▭"]].map(([s, ic]) => (
          <Tap key={s} className={"sk pad-s grow center" + (source === s ? " sk-2" : "")} style={source === s ? { borderColor: "var(--info)" } : {}} onClick={() => setSource(s)}>
            <div className="lg b">{ic}</div><div className="tiny muted">{s}</div>
          </Tap>
        ))}
      </div>
      <SecLabel>Document name</SecLabel>
      <input value={title} placeholder="e.g. Reply brief.pdf" onChange={(e) => { setTitle(e.target.value); setErr(""); }} style={fld} />
      <SecLabel>Type</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{["Pleading", "Order", "Evidence", "Brief", "Notice", "Affidavit"].map((t) => <Chip key={t} cls={"xs" + (type === t ? " solid" : "")} onClick={() => setType(t)}>{t}</Chip>)}</div>
      {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
      <div className="sk-3 pad center" style={{ padding: "16px 10px" }}>
        <div className="xl b" style={{ lineHeight: 1, color: "var(--info)" }}>{source === "Scan" ? "▣" : "⬆"}</div>
        <div className="sm muted" style={{ marginTop: 5 }}>{source === "Upload" ? "Drop a file or tap to browse" : source === "Scan" ? "Use the camera to scan pages" : "Pick from the document library"}</div>
      </div>
      <Note>To create an order from a Word template instead, use “New order”. Documents added here attach to the case file.</Note>
    </Screen>
  );
}

Object.assign(window, { NewDocument });
