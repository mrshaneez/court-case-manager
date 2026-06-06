/* Case Parties & Assignment ×3 — cases are many-to-many across every role.
   Any number of judges (a panel), claimants, respondents, lawyers, law firms
   and representatives can be assigned to one case.
   (A judge still owns ONE section, but a case may carry a panel of judges.)
   A · Parties roster (grouped by role)
   B · Assign participants (search + multi-add)
   C · Two-sides + panel overview
*/

/* overlapping avatar stack with +N overflow */
function Stack({ people, k }) {
  const shown = people.slice(0, 4);
  const extra = people.length - shown.length;
  return (
    <div className="row" style={{ gap: 0 }}>
      {shown.map((p, i) => (
        <span key={i} className="av" style={{ marginLeft: i ? -8 : 0, borderColor: k ? "var(--" + k + ")" : "var(--ink)", boxShadow: "0 0 0 2px var(--paper)", fontSize: 9 }}>{p}</span>
      ))}
      {extra > 0 && <span className="av" style={{ marginLeft: -8, background: "var(--ink)", color: "var(--paper)", fontSize: 9, boxShadow: "0 0 0 2px var(--paper)" }}>+{extra}</span>}
    </div>
  );
}

/* collapsed one-line group row: title + count + avatar stack + chevron */
function GroupRow({ title, count, faces, k }) {
  return (
    <div className="sk pad-s row" style={{ gap: 8 }}>
      <div className="grow"><div className="sm b">{title}</div><div className="tiny muted">{count} assigned</div></div>
      <Stack people={faces} k={k} />
      <span className="b muted" style={{ fontSize: 14 }}>›</span>
    </div>
  );
}

/* ═══════════ A · Parties roster (grouped by role) ═══════════ */
function PartiesA() {
  const P = ({ i, name, role, tag, k }) => (
    <div className="row" style={{ padding: "4px 0" }}>
      <Av style={{ width: 22, height: 22, fontSize: 9, ...(k ? { borderColor: "var(--" + k + ")" } : {}) }}>{i}</Av>
      <div className="grow"><div className="sm trunc"><b>{name}</b></div><div className="tiny muted trunc">{role}</div></div>
      {tag && <span className={"chip xs " + (tag[1] || "")}>{tag[0]}</span>}
    </div>
  );
  return (
    <Phone tab="" bodyClass="tight"
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm info block">＋ Assign participant</span>
      </div>}
      bar={<WFAppBar back title="Parties" sub="CV-0912 · 16 assigned" right={<span className="wf-btn sm">↕</span>} />}>
      <div className="between"><span className="seclabel" style={{ color: "var(--info)" }}>⌄ Judicial panel</span><span className="chip xs info">3</span></div>
      <div className="sk pad-s tight">
        <P i="RA" name="Hon. R. Alvarez" role="Presiding · Div. 4" tag={["Lead", "info"]} k="info" />
        <div className="divide"></div>
        <P i="BO" name="Hon. K. Boateng" role="Div. 7" k="info" />
        <div className="divide"></div>
        <P i="CR" name="Hon. M. Cruz" role="Div. 2" k="info" />
      </div>
      <GroupRow title="Claimants" count="3" faces={["RM", "AM", "LM"]} k="ok" />
      <GroupRow title="Claimant counsel &amp; firms" count="4" faces={["HF", "JD", "PF", "SM"]} />
      <GroupRow title="Respondents" count="2" faces={["NB", "AC"]} k="urgent" />
      <GroupRow title="Respondent counsel &amp; firms" count="5" faces={["RC", "AL", "TR", "KB", "DV"]} />
      <GroupRow title="Representatives" count="2" faces={["PO", "GA"]} />
      <div className="fade-b"></div>
    </Phone>
  );
}

/* ═══════════ B · Assign participants (search + multi-add) ═══════════ */
function PartiesB() {
  const Res = ({ i, name, role, added }) => (
    <div className="row" style={{ padding: "5px 0" }}>
      <Av style={{ width: 24, height: 24, fontSize: 9 }}>{i}</Av>
      <div className="grow"><div className="sm b trunc">{name}</div><div className="tiny muted trunc">{role}</div></div>
      {added
        ? <span className="cbox done" style={{ width: 22, height: 22 }}>✓</span>
        : <span className="wf-btn sm">＋ Add</span>}
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8, alignItems: "center" }}>
        <span className="grow tiny b">3 selected</span>
        <span className="wf-btn sm info" style={{ flex: "0 0 auto" }}>Assign to case</span>
      </div>}
      bar={<WFAppBar back title="Assign to case" sub="CV-0912 · Mercado" right={null} />}>
      <Field label="Assign as role">
        <div className="row wrap" style={{ gap: 5 }}>
          <Chip cls="xs">Judge</Chip><Chip cls="xs">Claimant</Chip><Chip cls="xs">Respondent</Chip>
          <Chip cls="solid xs">Lawyer</Chip><Chip cls="xs">Firm</Chip><Chip cls="xs">Rep.</Chip>
        </div>
      </Field>
      <WFSearch placeholder="Search lawyers in directory…" />
      <span className="seclabel">Directory · lawyers</span>
      <div className="sk pad-s tight" style={{ flex: 1 }}>
        <Res i="AL" name="A. Lin" role="Reyes &amp; Cole LLP" added />
        <div className="divide"></div>
        <Res i="TR" name="T. Ruiz" role="Reyes &amp; Cole LLP" added />
        <div className="divide"></div>
        <Res i="JD" name="J. Doyle" role="Harlow &amp; Finch LLP" added />
        <div className="divide"></div>
        <Res i="SM" name="S. Mensah" role="Independent counsel" />
        <div className="divide"></div>
        <Res i="KB" name="K. Brar" role="Brar Legal" />
      </div>
      <Note>No limit per role — assign as many lawyers, firms, parties or judges as the case needs.</Note>
    </Phone>
  );
}

/* ═══════════ C · Two-sides + panel overview ═══════════ */
function PartiesC() {
  const Side = ({ label, k, rows }) => (
    <div className="sk pad-s" style={{ borderColor: "var(--" + k + ")" }}>
      <div className="between"><span className="sm b" style={{ color: "var(--" + k + ")" }}>{label}</span><Stack people={rows.flatMap(r => r.faces)} k={k} /></div>
      <div className="divide" style={{ margin: "6px 0" }}></div>
      {rows.map((r, i) => (
        <div key={i} className="between sm" style={{ padding: "1px 0" }}><span className="muted">{r.role}</span><span className="b">{r.n}</span></div>
      ))}
    </div>
  );
  return (
    <Phone tab=""
      bar={<WFAppBar back title="Mercado v. Northbay" sub="Parties overview" right={<span className="chip xs">CV-0912</span>} />}>
      <div className="sk-2 pad-s" style={{ borderColor: "var(--info)" }}>
        <div className="between"><span className="seclabel" style={{ color: "var(--info)" }}>Judicial panel</span><Stack people={["RA", "BO", "CR"]} k="info" /></div>
        <div className="tiny muted">Hon. Alvarez (presiding) · Boateng · Cruz</div>
      </div>
      <Side label="CLAIMANT SIDE" k="ok" rows={[
        { role: "Claimants", n: 3, faces: ["RM", "AM", "LM"] },
        { role: "Law firms", n: 1, faces: ["HF"] },
        { role: "Lawyers", n: 3, faces: ["JD", "PF", "SM"] },
        { role: "Representatives", n: 1, faces: ["PO"] },
      ]} />
      <div className="center b muted" style={{ fontSize: 13, margin: "-2px 0" }}>— v. —</div>
      <Side label="RESPONDENT SIDE" k="urgent" rows={[
        { role: "Respondents", n: 2, faces: ["NB", "AC"] },
        { role: "Law firms", n: 2, faces: ["RC", "BL"] },
        { role: "Lawyers", n: 4, faces: ["AL", "TR", "KB", "DV"] },
      ]} />
      <div className="fade-b"></div>
    </Phone>
  );
}

Object.assign(window, { PartiesA, PartiesB, PartiesC });
