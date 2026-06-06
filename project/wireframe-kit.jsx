/* Wireframe kit — phone shell + shared bits. Loaded as a Babel script.
   Exports to window so screen files can use them. */

// Status bar (time + signal/wifi/batt as simple shapes)
function WFStatus({ time = "9:41" }) {
  return (
    <div className="wf-status">
      <span>{time}</span>
      <span className="dots">
        <i></i><i></i><i></i>
        <span style={{ width: 16, height: 8, border: "1.5px solid var(--ink)", borderRadius: 2, marginLeft: 4, display: "inline-block" }}></span>
      </span>
    </div>
  );
}

// Top app bar. Optional back arrow, title, subtitle, right-side node.
function WFAppBar({ title, sub, back, right, border = true }) {
  return (
    <div className="wf-appbar" style={border ? {} : { borderBottom: "none" }}>
      {back && <span className="b" style={{ fontSize: 18, lineHeight: 1, marginRight: 2 }}>‹</span>}
      <div className="grow">
        <div className="title trunc">{title}</div>
        {sub && <div className="sub trunc">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Bottom tab bar. active = one of home|docket|docs|tasks|cal
function WFTabBar({ active = "home" }) {
  const tabs = [
    ["home", "Home", "⌂"],
    ["docket", "Docket", "≣"],
    ["docs", "Docs", "▭"],
    ["tasks", "Tasks", "✓"],
    ["cal", "Calendar", "▦"],
  ];
  return (
    <div className="wf-tabbar">
      {tabs.map(([k, label, ico]) => (
        <div key={k} className={"tab" + (k === active ? " on" : "")}>
          <span className="ico">{ico}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

// Search field
function WFSearch({ placeholder = "Search docket…" }) {
  return (
    <div className="wf-search">
      <span className="mag"></span>
      <span className="grow trunc">{placeholder}</span>
      <span className="b" style={{ fontSize: 14 }}>⌃</span>
    </div>
  );
}

// Annotation note (toggled by tweak)
function Note({ children }) {
  return <div className="wf-note">{children}</div>;
}

// Avatar with initials
function Av({ children, style }) {
  return <span className="av" style={style}>{children}</span>;
}

// Placeholder bar (text line)
function Bar({ w = "100%", cls = "", style }) {
  return <span className={"bar " + cls} style={{ width: w, ...style }}></span>;
}

// Status dot
function Dot({ k = "open" }) { return <span className={"sdot " + k}></span>; }

// Chip
function Chip({ children, cls = "" }) { return <span className={"chip " + cls}>{children}</span>; }

// Phone frame. Pass top bar via `bar`, body via children, bottom via `bottom`
// (defaults to tab bar with `tab`). `fab` adds a floating action button.
function Phone({ children, bar, bottom, tab = "home", fab, fabIcon = "+", overlay, bodyClass = "", time }) {
  return (
    <div className="wf-phone">
      <WFStatus time={time} />
      <div className="wf-screen">
        {bar}
        <div className={"wf-body " + bodyClass}>{children}</div>
        {fab && <div className="wf-fab">{fabIcon}</div>}
        {overlay}
      </div>
      {bottom !== undefined ? bottom : <WFTabBar active={tab} />}
    </div>
  );
}

Object.assign(window, {
  WFStatus, WFAppBar, WFTabBar, WFSearch, Note, Av, Bar, Dot, Chip, Phone,
});
