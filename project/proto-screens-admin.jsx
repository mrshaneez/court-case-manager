/* Global Admin: password login + admin home + courtroom/section/user mgmt. */

/* ───── Sign in / Sign up (email + password) ───── */
function Login() {
  const nav = useNav();
  const [mode, setMode] = React.useState("signin");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [name, setName] = React.useState("");
  const [err, setErr] = React.useState("");
  const fld = (bad) => ({ border: "1.5px solid " + (bad ? "var(--urgent)" : "var(--line)"), borderRadius: 10, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" });
  const signin = () => {
    const a = ACCOUNTS.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.pw === pw);
    if (a) { setErr(""); nav.login(a.role); } else setErr("Incorrect email or password.");
  };
  const signup = () => {
    if (!name || !email || !pw) { setErr("Please fill in every field."); return; }
    nav.toast("Account requested — an admin will link you to your cases", "ok");
    setMode("signin"); setErr(""); setName("");
  };
  const quick = (r) => { const a = ACCOUNTS.find((x) => x.role === r); setEmail(a.email); setPw(a.pw); setErr(""); };
  return (
    <>
      <StatusBar />
      <div className="app-screen login-screen">
        <div className="app-body" style={{ justifyContent: "center", alignItems: "center", gap: 0 }}>
          <div className="login-wrap">
            <div className="center" style={{ marginBottom: 20 }}>
              <div className="ico-ph" style={{ width: 56, height: 56, fontSize: 26, margin: "0 auto 10px", borderRadius: 16, borderColor: "var(--info)", color: "var(--info)", background: "#eff6ff" }}>⚖</div>
              <div className="b" style={{ fontSize: 18 }}>Court Case Manager</div>
              <div className="tiny muted" style={{ marginTop: 3 }}>{mode === "signin" ? "Sign in with your court email" : "Request an account"}</div>
            </div>
            <div className="seg" style={{ marginBottom: 16 }}>
              <div className={mode === "signin" ? "on" : ""} onClick={() => { setMode("signin"); setErr(""); }}>Sign in</div>
              <div className={mode === "signup" ? "on" : ""} onClick={() => { setMode("signup"); setErr(""); }}>Sign up</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {mode === "signup" && (
                <div className="col" style={{ gap: 3 }}><span className="seclabel">Full name</span>
                  <input value={name} placeholder="Your name" onChange={(e) => { setName(e.target.value); setErr(""); }} style={fld(false)} />
                </div>
              )}
              <div className="col" style={{ gap: 3 }}><span className="seclabel">Email</span>
                <input type="email" value={email} placeholder="you@court.gov" autoCapitalize="none"
                  onChange={(e) => { setEmail(e.target.value); setErr(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && mode === "signin") signin(); }} style={fld(!!err)} />
              </div>
              <div className="col" style={{ gap: 3 }}><span className="seclabel">Password</span>
                <input type="password" value={pw} placeholder={mode === "signin" ? "Your password" : "Choose a password"}
                  onChange={(e) => { setPw(e.target.value); setErr(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") mode === "signin" ? signin() : signup(); }} style={fld(!!err)} />
              </div>
              {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
              {mode === "signin"
                ? <Tap className="wf-btn info block" onClick={signin}>Sign in</Tap>
                : <Tap className="wf-btn info block" onClick={signup}>Request access</Tap>}
              {mode === "signup" && <span className="tiny muted center">Parties &amp; counsel are provisioned by the court admin. Sign-up requests are reviewed.</span>}
            </div>
            {mode === "signin" && <div style={{ marginTop: 20, borderTop: "1px solid var(--line-2)", paddingTop: 16 }}>
              <div className="center tiny muted" style={{ marginBottom: 8 }}>quick demo sign-in</div>
              <div className="row wrap" style={{ gap: 6, justifyContent: "center" }}>
                {["admin", "judge", "clerk", "counsel", "party"].map((r) => (
                  <Chip key={r} cls="xs" onClick={() => quick(r)}>{ROLES[r].label}</Chip>
                ))}
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

/* ───── Access & credentials (section admin = judge, + delegated staff) ───── */
function AccessAdmin() {
  const nav = useNav();
  const staff = USERS.filter((u) => u.staff);
  const parties = USERS.filter((u) => !u.staff);
  const isJudge = nav.role.id === "judge";
  const subLabel = isJudge ? "Section admin · Division 4" : (nav.role.id === "clerk" ? "Delegated admin · manage parties" : "Manage accounts");
  const row = (u) => (
    <Tap key={u.id} row className="row" style={{ padding: "7px 2px", gap: 9 }} onClick={() => nav.go("userAccess", { id: u.id })}>
      <Av k={u.sectionAdmin ? "info" : null}>{u.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</Av>
      <div className="grow">
        <div className="sm b trunc">{u.name}</div>
        <div className="tiny muted trunc">{u.email}</div>
      </div>
      {u.sectionAdmin
        ? <span className="chip xs info">Admin</span>
        : <span className={"chip xs " + (u.status === "Active" ? "ok" : "warn")}>{u.status === "Active" ? (u.pw ? "Active" : "No pw") : "Invited"}</span>}
    </Tap>
  );
  return (
    <Screen bar={<AppBar back title="Access & credentials" sub={subLabel} right={<span className="chip xs">{nav.role.badge}</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px" }}><Tap className="wf-btn sm info block" onClick={() => nav.go("inviteParty", {})}>＋ Invite party</Tap></div>}>
      {isJudge && <Note>You are the section admin for Division 4. You can delegate staff to manage parties.</Note>}
      <SecLabel right="delegate admin">Staff</SecLabel>
      <div className="sk pad-s">{staff.map(row)}</div>
      <SecLabel right={parties.length}>Parties &amp; counsel</SecLabel>
      <div className="sk pad-s">{parties.map(row)}</div>
      <Note>Admin assigns each user an email &amp; password; the user signs in with that email.</Note>
    </Screen>
  );
}

/* ───── Per-user access detail ───── */
function UserAccess({ params }) {
  const nav = useNav();
  const u = USERS.find((x) => x.id === params.id) || USERS[0];
  const [email, setEmail] = React.useState(u.email);
  const [hasPw, setHasPw] = React.useState(u.pw);
  const [secAdmin, setSecAdmin] = React.useState(!!u.sectionAdmin);
  const canDelegate = nav.role.id === "judge" || nav.role.id === "admin";
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "7px 9px", font: "inherit", fontSize: 13, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  return (
    <Screen bar={<AppBar back title={u.name} sub={u.role + (u.case !== "—" ? " · " + u.case : "")} right={<span className="chip xs">{u.staff ? "Staff" : "Party"}</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.toast("Account suspended")}>Suspend</Tap>
        <Tap className="wf-btn sm info grow" onClick={() => { nav.toast("Access saved", "ok"); nav.back(); }}>Save</Tap>
      </div>}>
      <SecLabel>Sign-in email</SecLabel>
      <input type="email" value={email} autoCapitalize="none" onChange={(e) => setEmail(e.target.value)} style={fld} />
      <span className="tiny muted">The user signs in to the app with this email.</span>
      <SecLabel>Password</SecLabel>
      <div className="sk-soft pad-s row">
        <div className="grow"><div className="sm b">{hasPw ? "Password set" : "No password yet"}</div><div className="tiny muted">{hasPw ? "User can sign in" : "Assign one to enable sign-in"}</div></div>
        <Tap className="wf-btn sm info" onClick={() => { setHasPw(true); nav.toast(hasPw ? "Password reset & emailed" : "Password assigned & emailed", "ok"); }}>{hasPw ? "Reset" : "Assign"}</Tap>
      </div>
      <SecLabel>Role on case</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>
        {(u.staff ? ["Clerk", "Court reporter", "Registrar"] : ["Claimant", "Respondent", "Counsel", "Representative"]).map((r) => (
          <Chip key={r} cls={"xs" + (u.role === r ? " solid" : "")}>{r}</Chip>
        ))}
      </div>
      {u.staff && canDelegate && <>
        <SecLabel>Delegated admin</SecLabel>
        <div className="sk-2 pad-s row" style={{ borderColor: secAdmin ? "var(--info)" : "var(--line)" }}>
          <div className="grow"><div className="sm b">Section admin — manage parties</div><div className="tiny muted">Can add/manage parties &amp; assign their credentials</div></div>
          <span className={"tgl tap" + (secAdmin ? " on" : "")} onClick={() => { setSecAdmin(!secAdmin); nav.toast(!secAdmin ? "Granted admin to manage parties" : "Admin revoked"); }}></span>
        </div>
        <Note>The judge (section admin) can grant one or more staff admin rights to manage the parties.</Note>
      </>}
    </Screen>
  );
}

Object.assign(window, { Login, AdminHome, Courtrooms, Sections, AccessAdmin, UserAccess, NewCase });

/* who can add/invite parties: global/chief admin, the judge (section admin),
   or a staff member granted the delegated admin role. */
function canManageParties(roleId) {
  if (["admin", "judge", "chief"].includes(roleId)) return true;
  if (roleId === "clerk") { const me = USERS.find((u) => u.email === "j.mensah@court.gov"); return !!(me && me.sectionAdmin); }
  return false;
}

/* ───── Invite / add a party to a case ───── */
function InviteParty({ params }) {
  const nav = useNav();
  const [role, setRole] = React.useState("Claimant");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [invite, setInvite] = React.useState(true);
  const [err, setErr] = React.useState("");
  const [q, setQ] = React.useState("");
  const [reused, setReused] = React.useState(null);
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const roles = ["Claimant", "Respondent", "Counsel", "Representative", "Law firm"];
  const matches = q.trim() ? DIRECTORY.filter((d) => (d.name + " " + d.email).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 4) : [];
  const pick = (d) => { setName(d.name); setEmail(d.email); setRole(d.role); setReused(d); setQ(""); setErr(""); };
  const clearReuse = () => { setReused(null); setName(""); setEmail(""); };
  const submit = () => {
    if (!name || !email) { setErr("Add a name and email, or pick from the directory."); return; }
    nav.toast(reused ? "Existing party linked to this case" : (invite ? "Party added — sign-in invite emailed" : "Party added to case"), "ok");
    nav.back();
  };
  const caseNo = params.id && CASES[params.id] ? CASES[params.id].no + " · " + CASES[params.id].cap : "CV-2024-0912 · Mercado v. Northbay";
  return (
    <Screen bar={<AppBar back title="Add party" sub={"as " + nav.role.label + " · section admin"} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.back()}>Cancel</Tap>
        <Tap className="wf-btn sm info grow" onClick={submit}>{reused ? "Link to case" : invite ? "Add & invite" : "Add party"}</Tap>
      </div>}>
      <div className="col" style={{ gap: 3 }}><span className="seclabel">Case</span>
        <div className="sk-soft pad-s row"><span className="grow sm b trunc">{caseNo}</span><span className="muted">▾</span></div>
      </div>
      <SecLabel right="reuse">Add from directory</SecLabel>
      <input value={q} placeholder="Search existing people & firms…" autoCapitalize="none" onChange={(e) => { setQ(e.target.value); }} style={fld} />
      {matches.length > 0 && (
        <div className="sk pad-s tight">
          {matches.map((d, i) => (
            <React.Fragment key={d.email}>
              {i > 0 && <div className="divide"></div>}
              <Tap row className="row" style={{ padding: "5px 0", gap: 8 }} onClick={() => pick(d)}>
                <Av>{d.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</Av>
                <div className="grow"><div className="sm b trunc">{d.name}</div><div className="tiny muted trunc">{d.role} · {d.email}</div></div>
                <span className="chip xs info">in {d.cases.length} cases</span>
              </Tap>
            </React.Fragment>
          ))}
        </div>
      )}
      {reused && (
        <div className="sk-2 pad-s row" style={{ borderColor: "var(--info)", gap: 8 }}>
          <span className="chip xs info">Reused</span>
          <span className="grow tiny">From the shared directory — already in {reused.cases.length} other cases. Their details carry over.</span>
          <Tap className="wf-btn sm" onClick={clearReuse}>Clear</Tap>
        </div>
      )}
      <SecLabel>{reused ? "Party role on this case" : "Party role"}</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{roles.map((r) => <Chip key={r} cls={"xs" + (role === r ? " solid" : "")} onClick={() => setRole(r)}>{r}</Chip>)}</div>
      <SecLabel>Name</SecLabel>
      <input value={name} placeholder={role === "Law firm" ? "Firm name" : "Full name"} onChange={(e) => { setName(e.target.value); setReused(null); setErr(""); }} style={fld} />
      <SecLabel>Sign-in email</SecLabel>
      <input type="email" value={email} placeholder="party@email.com" autoCapitalize="none" onChange={(e) => { setEmail(e.target.value); setReused(null); setErr(""); }} style={fld} />
      {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
      {!reused && <div className="between sk-soft pad-s">
        <div><div className="sm b">Send sign-in invite</div><div className="tiny muted">Emails a link to set a password</div></div>
        <span className={"tgl tap" + (invite ? " on" : "")} onClick={() => setInvite(!invite)}></span>
      </div>}
      <Note>New people are saved to the shared directory, so any staff can reuse them in other cases without re-entering their details.</Note>
    </Screen>
  );
}

Object.assign(window, { canManageParties, InviteParty });

/* ───── Admin home ───── */
function AdminHome() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar title="Admin console" sub="Global Admin · system-wide" right={<RoleSwitch />} />}
      bottom={<TabBar active="home" badges={{ requests: 3 }} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <Tap className="tile" onClick={() => nav.tab("docket")}><span className="num">1,204</span><span className="lbl">All cases</span></Tap>
        <Tap className="tile" onClick={() => nav.go("sections", {})}><span className="num">{SECTIONS.length}</span><span className="lbl">Sections</span></Tap>
        <Tap className="tile" onClick={() => nav.go("courtrooms", {})}><span className="num">{COURTROOMS.length}</span><span className="lbl">Courtrooms</span></Tap>
        <Tap className="tile" onClick={() => nav.go("people", {})}><span className="num">142</span><span className="lbl">Users</span></Tap>
      </div>
      <SecLabel>Manage</SecLabel>
      <div className="sk pad-s">
        {[["⊞", "Register a case", "Assign a new case number", "newCase"],
          ["▦", "Courtrooms", "Add, rename, disable rooms", "courtrooms"],
          ["§", "Sections", "Divisions & presiding judges", "sections"],
          ["⇄", "Users & roles", "Accounts, access & permissions", "access"],
          ["◷", "Statistics", "Court-wide reporting", "stats"]].map((m, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="divide"></div>}
            <Tap row className="row" style={{ padding: "9px 2px", gap: 11 }} onClick={() => nav.go(m[3], {})}>
              <span className="ico-ph" style={{ width: 30, height: 30, fontSize: 13 }}>{m[0]}</span>
              <div className="grow"><div className="sm b">{m[1]}</div><div className="tiny muted">{m[2]}</div></div>
              <span className="muted b" style={{ fontSize: 15 }}>›</span>
            </Tap>
          </React.Fragment>
        ))}
      </div>
      <PriorityBoard />
      <SecLabel>System</SecLabel>
      <div className="sk pad-s tight">
        <div className="row" style={{ padding: "5px 0" }}><Dot k="ok" /><span className="grow sm trunc">All services operational</span><span className="chip xs ok">99.9%</span></div>
        <div className="divide"></div>
        <Tap row className="row" style={{ padding: "5px 0" }} onClick={() => nav.toast("Audit log")}><Dot k="info" /><span className="grow sm trunc">Audit log · 1,240 events today</span><span className="chip xs info">View</span></Tap>
      </div>
    </Screen>
  );
}

/* ───── Courtroom manager ───── */
function Courtrooms() {
  const nav = useNav();
  const [rooms, setRooms] = React.useState(() => {
    try { const v = localStorage.getItem("ccm_rooms"); return v ? JSON.parse(v) : COURTROOMS; } catch { return COURTROOMS; }
  });
  const [adding, setAdding] = React.useState(false);
  const [nm, setNm] = React.useState("");
  const [cap, setCap] = React.useState("");
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "7px 9px", font: "inherit", fontSize: 13, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const confirmAdd = () => {
    if (!nm) return;
    const newRooms = [...rooms, { name: nm, cap: Number(cap) || 40, status: "Available", k: "ok", util: 0 }];
    setRooms(newRooms);
    try { localStorage.setItem("ccm_rooms", JSON.stringify(newRooms)); } catch {}
    nav.toast("Courtroom added", "ok"); setNm(""); setCap(""); setAdding(false);
  };
  return (
    <Screen bar={<AppBar back title="Courtrooms" sub="Admin · system-wide" right={<span className="chip xs">Admin</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px" }}><Tap className="wf-btn sm info block" onClick={() => setAdding((a) => !a)}>{adding ? "Close" : "＋ Add courtroom"}</Tap></div>}>
      {adding && (
        <div className="sk-2 pad-s" style={{ borderColor: "var(--info)", display: "flex", flexDirection: "column", gap: 7 }}>
          <span className="seclabel">New courtroom</span>
          <input value={nm} placeholder="Name (e.g. Courtroom 3D)" onChange={(e) => setNm(e.target.value)} style={fld} />
          <input value={cap} placeholder="Capacity (e.g. 40)" inputMode="numeric" onChange={(e) => setCap(e.target.value)} style={fld} />
          <Tap className="wf-btn sm info block" onClick={confirmAdd}>Add courtroom</Tap>
        </div>
      )}
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b lg">{rooms.length}</div><div className="tiny muted">Rooms</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">11</div><div className="tiny muted">Today</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>2</div><div className="tiny muted">Clashes</div></div>
      </div>
      <SecLabel right={rooms.length}>Courtrooms</SecLabel>
      {rooms.map((rm, i) => (
        <Tap key={i} className="sk pad-s" onClick={() => nav.toast("Edit " + rm.name)}>
          <div className="between"><span className="sm b">{rm.name}</span><span className={"chip xs " + rm.k}>{rm.status}</span></div>
          <div className="tiny muted">Capacity {rm.cap} · today {rm.util}% booked</div>
          <div className="prog" style={{ marginTop: 5 }}><i className={rm.k === "ok" ? "ok" : rm.k === "warn" ? "hi" : ""} style={{ width: rm.util + "%" }}></i></div>
        </Tap>
      ))}
      <Note>Only the Global Admin can add, rename or disable rooms. New rooms appear in every scheduler instantly.</Note>
    </Screen>
  );
}

/* ───── Register a case (admin assigns the case number) ───── */
function NewCase() {
  const nav = useNav();
  const types = [["Civil", "CV"], ["Criminal", "CR"], ["Family", "FC"], ["Probate", "PR"], ["Small claims", "SC"]];
  const [type, setType] = React.useState("Civil");
  const prefix = (types.find((t) => t[0] === type) || ["", "CV"])[1];
  const [num, setNum] = React.useState(prefix + "-2024-0913");
  const [caption, setCaption] = React.useState("");
  const [section, setSection] = React.useState("Division 4");
  const [err, setErr] = React.useState("");
  const fld = { border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", font: "inherit", fontSize: 14, outline: "none", background: "var(--paper)", color: "var(--ink)", width: "100%", boxSizing: "border-box" };
  const pickType = (t, pre) => { setType(t); setNum(pre + "-2024-0913"); };
  const submit = () => {
    if (!num || !caption) { setErr("Assign a case number and a caption."); return; }
    nav.toast("Case " + num + " registered", "ok"); nav.back();
  };
  return (
    <Screen bar={<AppBar back title="Register case" sub="Admin assigns the case number" right={<span className="chip xs">Admin</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px", gap: 8 }}>
        <Tap className="wf-btn sm grow" onClick={() => nav.back()}>Cancel</Tap>
        <Tap className="wf-btn sm info grow" onClick={submit}>Register case</Tap>
      </div>}>
      <SecLabel>Case type</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{types.map(([t, pre]) => <Chip key={t} cls={"xs" + (type === t ? " solid" : "")} onClick={() => pickType(t, pre)}>{t}</Chip>)}</div>
      <SecLabel>Case number</SecLabel>
      <input value={num} onChange={(e) => { setNum(e.target.value); setErr(""); }} style={{ ...fld, fontWeight: 700, letterSpacing: ".4px" }} />
      <span className="tiny muted">Auto-suggested from the next sequence — the admin can override it.</span>
      <SecLabel>Caption</SecLabel>
      <input value={caption} placeholder="e.g. Mercado v. Northbay Ins." onChange={(e) => { setCaption(e.target.value); setErr(""); }} style={fld} />
      <SecLabel>Section</SecLabel>
      <div className="row wrap" style={{ gap: 5 }}>{SECTIONS.map((s) => <Chip key={s.name} cls={"xs" + (section === s.name ? " solid" : "")} onClick={() => setSection(s.name)}>{s.name}</Chip>)}</div>
      {err && <span className="tiny" style={{ color: "var(--urgent)" }}>{err}</span>}
      <Note>Admins register new cases and assign their case number; staff then add parties, documents &amp; hearings.</Note>
    </Screen>
  );
}

/* ───── Sections manager ───── */
function Sections() {
  const nav = useNav();
  return (
    <Screen bar={<AppBar back title="Sections" sub="Divisions & judges" right={<span className="chip xs">Admin</span>} />}
      bottom={<div className="wf-tabbar" style={{ padding: "8px 11px" }}><Tap className="wf-btn sm info block" onClick={() => nav.toast("Create section")}>＋ Add section</Tap></div>}>
      <SecLabel right={SECTIONS.length}>Court sections</SecLabel>
      {SECTIONS.map((s, i) => (
        <Tap key={i} className="sk pad-s" onClick={() => nav.toast("Manage " + s.name)}>
          <div className="between"><span className="sm b">{s.name}</span><span className={"chip xs " + s.k}>{s.cases} active</span></div>
          <div className="row" style={{ gap: 7, marginTop: 4 }}><Av k="info">{s.judge.split(" ").pop()[0]}</Av><div className="grow"><div className="tiny muted">Presiding judge</div><div className="sm b">{s.judge}</div></div><span className="muted b" style={{ fontSize: 15 }}>›</span></div>
        </Tap>
      ))}
      <Note>One judge presides over one section. Admin assigns judges &amp; staff to sections.</Note>
    </Screen>
  );
}

Object.assign(window, { Login, AdminHome, Courtrooms, Sections });
