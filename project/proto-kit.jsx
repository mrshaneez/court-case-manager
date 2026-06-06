/* Interactive kit for the prototype: nav context, phone shell, app bar,
   tab bar, tappable helpers, toast + sheet hosts. Exported to window. */

const NavCtx = React.createContext(null);
const useNav = () => React.useContext(NavCtx);

/* status bar */
function StatusBar() {
  return (
    <div className="wf-status" style={{ flex: "0 0 auto" }}>
      <span>9:41</span>
      <span className="dots"><i></i><i></i><i></i>
        <span style={{ width: 16, height: 8, border: "1.5px solid var(--ink)", borderRadius: 2, marginLeft: 4, display: "inline-block" }}></span>
      </span>
    </div>
  );
}

/* app bar with working back + optional right node */
function AppBar({ title, sub, back, right, titleDv }) {
  const nav = useNav();
  return (
    <div className="wf-appbar" style={{ flex: "0 0 auto" }}>
      {back && nav.canBack && <span className="tap b" style={{ fontSize: 20, lineHeight: 1, marginRight: 2, padding: "0 4px 0 0" }} onClick={() => nav.back()}>‹</span>}
      <div className="grow">
        <div className={"title trunc" + (titleDv ? " thaana" : "")} style={titleDv ? { direction: "rtl", textAlign: "left" } : {}}>{title}</div>
        {sub && <div className="sub trunc">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* role-aware bottom tab bar / desktop sidebar */
const TABS = [
  ["home",     "Home",     "⌂"],
  ["docket",   "Docket",   "≣"],
  ["calendar", "Calendar", "▦"],
  ["requests", "Requests", "⇄"],
  ["more",     "More",     "⋯"],
];
function TabBar({ active, badges = {} }) {
  const nav = useNav();
  return (
    <div className="wf-tabbar" style={{ flex: "0 0 auto" }}>
      {/* Sidebar brand — visible only on desktop via CSS */}
      <div className="sidebar-brand">
        <span className="sidebar-logo">⚖</span>
        <div>
          <div className="sidebar-appname">Court Manager</div>
          <div className="sidebar-role">{nav.role.label}</div>
        </div>
      </div>
      {TABS.map(([k, label, ico]) => (
        <div key={k} className={"tab" + (k === active ? " on" : "")} onClick={() => nav.tab(k)}>
          <span className="ico" style={{ position: "relative" }}>{ico}{badges[k] ? <span className="tabbadge">{badges[k]}</span> : null}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* tappable wrapper */
function Tap({ go, params, onClick, className = "", children, style, row }) {
  const nav = useNav();
  const handle = (e) => { if (onClick) onClick(e); else if (go) nav.go(go, params || {}); };
  return <div className={"tap " + (row ? "row-tap " : "") + className} style={style} onClick={handle}>{children}</div>;
}

/* search field (static affordance) */
function Search({ placeholder = "Search…", onClick }) {
  return (
    <div className="wf-search tap" onClick={onClick} style={{ flex: "0 0 auto" }}>
      <span className="mag"></span><span className="grow trunc">{placeholder}</span>
    </div>
  );
}

/* phone shell: composes status + screen chrome. children = body content */
function Phone({ children }) { return children; }

/* common: avatar, dot, chip already in wireframe.css. small helpers: */
function Av({ children, k, style }) {
  return <span className="av" style={{ ...(k ? { borderColor: "var(--" + k + ")" } : {}), ...style }}>{children}</span>;
}
function Dot({ k = "open" }) { return <span className={"sdot " + k}></span>; }
function Chip({ children, cls = "", go, params, onClick }) {
  const nav = useNav();
  const tappable = go || onClick;
  const handle = (e) => { e.stopPropagation(); if (onClick) onClick(e); else if (go) nav.go(go, params || {}); };
  return <span className={"chip " + cls + (tappable ? " tap" : "")} onClick={tappable ? handle : undefined}>{children}</span>;
}
function Note({ children }) { return <div className="wf-note">{children}</div>; }

/* section label row */
function SecLabel({ children, right, style }) {
  return (
    <div className="between" style={{ flex: "0 0 auto", ...style }}>
      <span className="seclabel">{children}</span>
      {right && <span className="tiny muted">{right}</span>}
    </div>
  );
}

Object.assign(window, { NavCtx, useNav, StatusBar, AppBar, TabBar, Tap, Search, Phone, Av, Dot, Chip, Note, SecLabel, TABS });
