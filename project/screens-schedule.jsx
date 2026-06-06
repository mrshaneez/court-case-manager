/* Scheduling ×3 — configurable courtrooms + automatic clash detection.
   - 3 courtrooms by default; admin can add more (+ Add courtroom).
   - When scheduling, party / counsel / courtroom clashes are checked
     automatically and surfaced; scheduler must confirm to proceed.
   A · Schedule form (inline clash)
   B · Clash detected → confirm sheet
   C · Courtroom manager (admin)
*/

/* ═══════════ A · Schedule a hearing ═══════════ */
function SchedA() {
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm info grow">Check &amp; schedule</span>
      </div>}
      bar={<WFAppBar back title="Schedule hearing" sub="New event" right={null} />}>
      <Field label="Case">
        <Input value="CV-2024-0912 · Mercado v. Northbay" right="▾" />
      </Field>
      <div className="row" style={{ gap: 7 }}>
        <div className="grow"><Field label="Date"><Input value="Jun 11, 2024" right="▦" /></Field></div>
        <div style={{ width: 96 }}><Field label="Time"><Input value="9:00 AM" right="▾" /></Field></div>
      </div>
      <Field label="Courtroom" hint="Admin can add more rooms.">
        <div className="row" style={{ gap: 6 }}>
          <span className="room busy">4B<span className="cap">busy</span></span>
          <span className="room on">2A<span className="cap">free</span></span>
          <span className="room">3C<span className="cap">free</span></span>
          <span className="room add">＋</span>
        </div>
      </Field>
      <span className="seclabel">Participants · auto-checked</span>
      <div className="sk pad-s tight">
        <div className="row"><Av style={{ borderColor: "var(--info)" }}>RA</Av><span className="grow sm trunc">Hon. Alvarez (judge)</span><span className="chip xs ok">free</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><Av>AL</Av><span className="grow sm trunc">A. Lin · Counsel (Def.)</span><span className="chip xs urgent">clash</span></div>
        <div className="divide" style={{ margin: "5px 0" }}></div>
        <div className="row"><Av>RM</Av><span className="grow sm trunc">R. Mercado (Pl.)</span><span className="chip xs ok">free</span></div>
      </div>
      <div className="clash">
        <span className="warn-ico">⚠</span>
        <div className="grow">
          <div className="sm b" style={{ color: "var(--urgent)" }}>1 conflict found</div>
          <div className="tiny muted">A. Lin is in CR-1187 at 9:30. Tap Review before scheduling.</div>
        </div>
        <span className="wf-btn sm" style={{ borderColor: "var(--urgent)", color: "var(--urgent)" }}>Review</span>
      </div>
    </Phone>
  );
}

/* ═══════════ B · Clash detected → confirm to proceed ═══════════ */
function SchedB() {
  const sheet = (
    <div className="scrim">
      <div className="sheet">
        <span className="grab"></span>
        <div className="row" style={{ gap: 7 }}>
          <span className="warn-ico" style={{ fontSize: 17 }}>⚠</span>
          <div className="grow"><div className="b">Scheduling conflict</div><div className="tiny muted">Jun 11 · 9:00 AM · Courtroom 2A</div></div>
        </div>
        <div className="clash">
          <span className="warn-ico">●</span>
          <div className="grow"><div className="sm b">Counsel double-booked</div><div className="tiny muted">A. Lin — CR-1187 Okafor at 9:30 (4B)</div></div>
        </div>
        <div className="clash">
          <span className="warn-ico">●</span>
          <div className="grow"><div className="sm b">Party clash</div><div className="tiny muted">R. Mercado has a deposition 9–11 AM</div></div>
        </div>
        <div className="tiny muted">If you proceed, affected participants are notified to confirm or request a change.</div>
        <div className="col" style={{ gap: 7 }}>
          <span className="wf-btn sm block info">Pick another slot</span>
          <span className="wf-btn sm block" style={{ borderColor: "var(--urgent)", color: "var(--urgent)" }}>Proceed anyway &amp; notify</span>
        </div>
      </div>
    </div>
  );
  return (
    <Phone tab="" overlay={sheet}
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm grow">Save draft</span>
        <span className="wf-btn sm info grow">Check &amp; schedule</span>
      </div>}
      bar={<WFAppBar back title="Schedule hearing" sub="Conflict check" right={null} />}>
      <Field label="Case"><Input value="CV-2024-0912 · Mercado v. Northbay" right="▾" /></Field>
      <div className="row" style={{ gap: 7 }}>
        <div className="grow"><Field label="Date"><Input value="Jun 11, 2024" right="▦" /></Field></div>
        <div style={{ width: 96 }}><Field label="Time"><Input value="9:00 AM" right="▾" /></Field></div>
      </div>
      <Field label="Courtroom">
        <div className="row" style={{ gap: 6 }}>
          <span className="room busy">4B<span className="cap">busy</span></span>
          <span className="room on">2A<span className="cap">free</span></span>
          <span className="room">3C<span className="cap">free</span></span>
        </div>
      </Field>
    </Phone>
  );
}

/* ═══════════ C · Courtroom manager (admin) ═══════════ */
function SchedC() {
  const Room = ({ name, cap, status, util, k }) => (
    <div className="sk pad-s">
      <div className="between">
        <span className="sm b">{name}</span>
        <span className={"chip xs " + k}>{status}</span>
      </div>
      <div className="tiny muted">Capacity {cap} · today {util} booked</div>
      <div className="prog" style={{ marginTop: 5 }}><i className={k === "ok" ? "ok" : k === "warn" ? "hi" : ""} style={{ width: util }}></i></div>
    </div>
  );
  return (
    <Phone tab=""
      bottom={<div className="wf-tabbar" style={{ padding: "7px 10px", gap: 8 }}>
        <span className="wf-btn sm info block">＋ Add courtroom</span>
      </div>}
      bar={<WFAppBar back title="Courtrooms" sub="Admin · Division 4" right={<span className="chip xs">Admin</span>} />}>
      <div className="row" style={{ gap: 6 }}>
        <div className="sk-soft pad-s grow center"><div className="b lg">3</div><div className="tiny muted">Rooms</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg">11</div><div className="tiny muted">Today</div></div>
        <div className="sk-soft pad-s grow center"><div className="b lg" style={{ color: "var(--urgent)" }}>2</div><div className="tiny muted">Clashes</div></div>
      </div>
      <span className="seclabel">Courtrooms</span>
      <Room name="Courtroom 4B" cap="48" status="In session" util="80%" k="info" />
      <Room name="Courtroom 2A" cap="32" status="Available" util="45%" k="ok" />
      <Room name="Courtroom 3C" cap="60" status="Maintenance" util="0%" k="warn" />
      <Note>Only admins add, rename, or disable rooms. New rooms appear in every scheduler instantly.</Note>
    </Phone>
  );
}

Object.assign(window, { SchedA, SchedB, SchedC });
