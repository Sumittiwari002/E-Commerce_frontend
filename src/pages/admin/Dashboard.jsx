import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../settings/axiosInstance";


const SAMPLE_ORDERS = [
  { id: "ORD001", item: "iPhone 17 Pro Max", n: 2, amt: 308000, ago: "2 hours ago", st: "Processing" },
  { id: "ORD002", item: "Men's T-Shirt", n: 1, amt: 1230, ago: "5 hours ago", st: "Shipped" },
  { id: "ORD003", item: "Women's Top", n: 3, amt: 4500, ago: "1 day ago", st: "Delivered" },
  { id: "ORD004", item: "iPhone 16 Pro Max", n: 1, amt: 131000, ago: "1 day ago", st: "Shipped" },
  { id: "ORD005", item: "Earbuds", n: 2, amt: 2400, ago: "2 days ago", st: "Delivered" },
];
const SAMPLE_ACTIVITY = [
  ["New order received", "#ORD001 - ₹3,08,000", "2 hours ago", "#16a34a"],
  ["Product updated", "iPhone 17 Pro Max", "5 hours ago", "#2563eb"],
  ["New category added", "Accessories", "1 day ago", "#7c3aed"],
  ["New brand added", "Apple", "1 day ago", "#f97316"],
  ["Order delivered", "#ORD003", "2 days ago", "#16a34a"],
];
const SALES = [26, 20, 30, 32, 40, 38, 42]; // ₹K per day
const ORDERS_LINE = [33, 35, 31, 36, 32, 37, 44];
const ST_CLASS = { Processing: "p-green", Shipped: "p-blue", Delivered: "p-green" };
const COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#f59e0b", "#9ca3af"];
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const last7 = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 6 + i);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

function SalesChart() {
  const days = last7(), W = 520, H = 230, L = 44, T = 10, B = 190, max = 50;
  const x = (i) => L + 30 + i * ((W - L - 30) / 7), y = (v) => B - (v / max) * (B - T);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-100">
      {[0, 10, 20, 30, 40, 50].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - 10} y1={y(g)} y2={y(g)} stroke="#e8ecf4" />
          <text x={L - 6} y={y(g) + 4} fontSize="10" fill="#6b7691" textAnchor="end">{g ? `₹${g}K` : "0"}</text>
        </g>
      ))}
      {SALES.map((v, i) => <rect key={i} x={x(i) - 15} y={y(v)} width="30" height={B - y(v)} rx="3" fill="#bfdbfe" />)}
      <polyline fill="none" stroke="#2563eb" strokeWidth="2" points={ORDERS_LINE.map((v, i) => `${x(i)},${y(v)}`).join(" ")} />
      {ORDERS_LINE.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="#2563eb" />)}
      {days.map((d, i) => <text key={d} x={x(i)} y={B + 18} fontSize="10" fill="#6b7691" textAnchor="middle">{d}</text>)}
      <rect x="190" y="216" width="10" height="10" fill="#bfdbfe" /><text x="205" y="225" fontSize="11" fill="#6b7691">Sales (₹)</text>
      <circle cx="285" cy="221" r="5" fill="#2563eb" /><text x="296" y="225" fontSize="11" fill="#6b7691">Orders</text>
    </svg>
  );
}

function Donut({ slices, total }) {
  const r = 62, C = 2 * Math.PI * r; let off = 0;
  return (
    <svg viewBox="0 0 180 180" width="180" height="180">
      {slices.map((s, i) => {
        const len = total ? (s.count / total) * C : 0, el = (
          <circle key={s.name} cx="90" cy="90" r={r} fill="none" stroke={COLORS[i]} strokeWidth="28"
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} transform="rotate(-90 90 90)" />);
        off += len; return el;
      })}
      <text x="90" y="92" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0f1b3d">{total}</text>
      <text x="90" y="112" textAnchor="middle" fontSize="12" fill="#6b7691">Products</text>
    </svg>
  );
}

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const pull = (url, set) =>
      api.get(url).then((r) => set(r.data.dataSet || [])).catch((e) => console.error(url, e.message));
    pull("/api/product/allProducts", setProducts);
    pull("/api/brand/allBrands", setBrands);
    pull("/api/category/allcategories", setCats);
  }, []);

  // Adjust if product document names the category differently
  const catOf = (p) => {
    const c = p.categoryId ?? p.category;
    const id = typeof c === "object" ? c?._id : c;
    return typeof c === "object" && c?.name ? c.name : cats.find((x) => x._id === id)?.name || "Others";
  };

  const slices = useMemo(() => {
    const m = {};
    products.forEach((p) => { const k = catOf(p); m[k] = (m[k] || 0) + 1; });
    const sorted = Object.entries(m).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 4).map(([name, count]) => ({ name, count }));
    const rest = sorted.slice(4).reduce((s, [, c]) => s + c, 0);
    return rest ? [...top, { name: "Others", count: rest }] : top;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, cats]);

  // const range = `${last7()[0]}, ${new Date().getFullYear()} - ${last7()[6]}, ${new Date().getFullYear()}`;
  const stats = [
    { label: "Total Products", v: products.length, icon: "box-seam", bg: "#e0e9ff", fg: "#2563eb" },
    { label: "Total Categories", v: cats.length, icon: "tag", bg: "#dcf7e8", fg: "#16a34a" },
    { label: "Total Brands", v: brands.length, icon: "patch-check", bg: "#ece4ff", fg: "#7c3aed" },
    { label: "Total Orders", v: 86, icon: "cart3", bg: "#ffe9d6", fg: "#f97316", up: "18%" }, // sample
  ];
  const quick = [
    { t: "Add Product", s: "Add new product to store", to: "/product/add", icon: "box-seam", bg: "#e6eeff", fg: "#1d4ed8" },
    { t: "Add Category", s: "Create new category", to: "/category/add", icon: "tag", bg: "#e3f8ec", fg: "#15803d" },
    { t: "Add Brand", s: "Add new brand", to: "/brand/add", icon: "patch-check", bg: "#efe8ff", fg: "#6d28d9" },
    { t: "View Orders", s: "Manage customer orders", to: "/admin", icon: "cart3", bg: "#fff0e2", fg: "#c2410c" },
  ];

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div><h1 className="adm-h">Dashboard</h1><p className="adm-sub-h">Welcome back! Here's an overview of your store.</p></div>
        <div className="adm-card py-2 px-3 d-flex gap-3 align-items-center" style={{ height: "auto" }}>
          {/* <i className="bi bi-calendar3" />{range}<i className="bi bi-chevron-down small" /> */}
        </div>
      </div>

      <div className="row g-3 mb-3">
        {stats.map((s) => (
          <div className="col-6 col-xl-3" key={s.label}>
            <div className="adm-card adm-stat">
              <div className="adm-ico" style={{ background: s.bg, color: s.fg }}><i className={`bi bi-${s.icon}`} /></div>
              <div><span>{s.label}</span><b>{s.v}</b>{s.up && <span className="up"><i className="bi bi-graph-up-arrow" /> {s.up} <span>from last month</span></span>}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-xl-9">
          <div className="row g-3">
            <div className="col-lg-7">
              <div className="adm-card">
                <div className="adm-head"><h3><i className="bi bi-bar-chart-fill" />Sales Overview</h3><span className="small text-secondary">Last 7 Days</span></div>
                <SalesChart />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="adm-card">
                <div className="adm-head"><h3><i className="bi bi-pie-chart" />Category Distribution</h3></div>
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                  <Donut slices={slices} total={products.length} />
                  <ul className="adm-legend">
                    {slices.map((s, i) => (
                      <li key={s.name}><span className="adm-dot" style={{ background: COLORS[i] }} />{s.name}
                        <span className="ms-auto ps-3 text-secondary">{s.count} ({Math.round((s.count / products.length) * 100)}%)</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="adm-card">
                <div className="adm-head"><h3><i className="bi bi-lightning-charge" />Quick Actions</h3></div>
                <div className="row g-3">
                  {quick.map((q) => (
                    <div className="col-6 col-lg-3" key={q.t}>
                      <Link to={q.to} className="adm-qa" style={{ background: q.bg, color: q.fg }}>
                        <i className={`bi bi-${q.icon}`} /><span>{q.t}<small>{q.s}</small></span><i className="bi bi-arrow-right" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="adm-card">
                <div className="adm-head"><h3><i className="bi bi-box-seam" />Recent Products</h3></div>
                <div className="table-responsive">
                  <table className="adm-tbl">
                    <thead><tr><th>#</th><th>Image</th><th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {products.slice(0, 5).map((p, i) => (
                        <tr key={p._id}>
                          <td>{i + 1}</td><td><img src={p.path} alt="" /></td><td>{p.name}</td><td>{catOf(p)}</td><td>{inr(p.price)}</td>
                          <td><span className={`adm-pill ${p.stock != null && p.stock < 10 ? "p-yellow" : "p-green"}`}>{p.stock != null && p.stock < 10 ? "Low Stock" : "In Stock"}</span></td>
                          <td><span className="adm-pill p-green">Active</span></td>
                          <td>
                            <button className="adm-iconbtn" title="Edit (not wired yet)"><i className="bi bi-pencil" /></button>
                            <Link className="adm-iconbtn" to={`/productdetails/${p._id}`}><i className="bi bi-eye" /></Link>
                            <button className="adm-iconbtn text-danger" title="Delete (not wired yet)"><i className="bi bi-trash" /></button>
                          </td>
                        </tr>
                      ))}
                      {!products.length && <tr><td colSpan="8" className="text-center text-secondary py-4">No products yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3">
          <div className="d-flex flex-column gap-3">
            <div className="adm-card">
              <div className="adm-head"><h3><i className="bi bi-cart3" />Recent Orders</h3><span className="adm-view">View All</span></div>
              {SAMPLE_ORDERS.map((o) => (
                <div className="adm-row" key={o.id}>
                  <div className="th"><i className="bi bi-bag" /></div>
                  <div className="flex-fill small"><b>#{o.id}</b><div className="text-secondary">{o.item}</div><div className="text-secondary">{o.n} item{o.n > 1 && "s"}</div></div>
                  <div className="text-end small"><b>{inr(o.amt)}</b><div className="text-secondary">{o.ago}</div><span className={`adm-pill ${ST_CLASS[o.st]}`}>{o.st}</span></div>
                </div>
              ))}
            </div>
            <div className="adm-card">
              <div className="adm-head"><h3><i className="bi bi-clock-history" />Recent Activities</h3><span className="adm-view">View All</span></div>
              {SAMPLE_ACTIVITY.map(([t, s, ago, c]) => (
                <div className="adm-row small" key={t + s}>
                  <span className="adm-dot" style={{ background: c }} />
                  <div className="flex-fill"><b className="fw-semibold">{t}</b><div className="text-secondary">{s}</div></div>
                  <span className="text-secondary">{ago}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
