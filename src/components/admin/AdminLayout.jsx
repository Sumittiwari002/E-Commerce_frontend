import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/style/Admin.css";

// `to` missing = page not built yet (shown dimmed). Add the route later and set `to`.
const NAV = [
  { label: "Dashboard", icon: "house-door", to: "/admin", end: true },
  { label: "Products", icon: "box-seam", subs: [{ label: "All Products", to:"/products" }, { label: "Add Product", to: "/product/add" }] },
  { label: "Categories", icon: "tag", subs: [{ label: "All Categories", to:"/categories" }, { label: "Add Category", to: "/category/add" }] },
  { label: "Brands", icon: "patch-check", subs: [{ label: "All Brands" , to: "/brands"}, { label: "Add Brand", to: "/brand/add" }] },
  
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({ Products: true, Categories: true, Brands: true });
  const name = user?.name || "Admin";

  return (
    <div className="adm">
      <div className={`adm-scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`adm-side ${open ? "show" : ""}`} onClick={() => setOpen(false)}>
        <div className="adm-brand">
          <i className="bi bi-cart3" />
          <div><b>ShopEase</b><small>Admin Panel</small></div>
        </div>

        {NAV.map((n) =>
          n.subs ? (
            <div key={n.label}>
              <button
                className={`adm-link ${expanded[n.label] ? "open" : ""}`}
                onClick={(e) => { e.stopPropagation(); setExpanded((s) => ({ ...s, [n.label]: !s[n.label] })); }}
              >
                <i className={`bi bi-${n.icon}`} />{n.label}<i className="bi bi-chevron-up chev" />
              </button>
              {expanded[n.label] && (
                <div className="adm-sub">
                  {n.subs.map((s) => (
                    <NavLink key={s.label} to={s.to || pathname} className={({ isActive }) => (s.to ? (isActive ? "active" : "") : "off")}>
                      {s.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : n.to ? (
            <NavLink key={n.label} to={n.to} end={n.end} className={({ isActive }) => `adm-link ${isActive ? "active" : ""}`}>
              <i className={`bi bi-${n.icon}`} />{n.label}
            </NavLink>
          ) : (
            <span key={n.label} className="adm-link off" title="Coming soon"><i className={`bi bi-${n.icon}`} />{n.label}</span>
          )
        )}

        <NavLink to="/home" className="adm-visit"><i className="bi bi-shop" />Visit Store<i className="bi bi-box-arrow-up-right ms-auto" /></NavLink>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <button className="adm-iconbtn d-lg-none" onClick={() => setOpen(true)} aria-label="Menu"><i className="bi bi-list fs-4" /></button>
          <label className="adm-search"><i className="bi bi-search" /><input placeholder="Search products, orders, customers..." /></label>
          <span className="adm-bell"><i className="bi bi-bell" /><em>3</em></span>
          <div className="dropdown">
            <button className="adm-iconbtn d-flex align-items-center gap-2 text-dark" data-bs-toggle="dropdown">
              <span className="adm-av">{name[0].toUpperCase()}</span>
              <span className="d-none d-sm-inline fw-semibold">{name}</span><i className="bi bi-chevron-down small" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><NavLink className="dropdown-item" to="/logout" onClick={logout}>Logout</NavLink></li>
            </ul>
          </div>
        </header>
        <div className="adm-body"><Outlet /></div>
      </div>
    </div>
  );
};

export default AdminLayout;
