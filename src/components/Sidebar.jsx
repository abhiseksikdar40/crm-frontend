import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">
      <h1 className="company-name">LeadNix.</h1>
      <ul>
        <li  className={`side-nav-link ${currentPath === "/dashboard" ? "active" : ""}`}>
          <Link
            to="/dashboard"
          >
            <img className="menu-icons" src="/Dashboard.svg" alt="Dashboard" />
            Dashboard
            <img className="dashboard-right-arrow" src="/right-arrow.svg" alt="Right-Arrow" />
          </Link>
        </li>
        <li  className={`side-nav-link ${currentPath === "/leads" ? "active" : ""}`}>
          <Link
            to="/leads"
          >
            <img className="menu-icons" src="/Leads.svg" alt="Leads" />
            Leads
            <img className="leads-right-arrow" src="/right-arrow.svg" alt="Right-Arrow" />
          </Link>
        </li>
        <li  className={`side-nav-link ${currentPath === "/sales" ? "active" : ""}`}>
          <Link
            to="/sales"
          >
            <img className="menu-icons" src="/Sales.svg" alt="Sales" />
            Sales Pipeline
            <img className="sales-right-arrow" src="/right-arrow.svg" alt="Right-Arrow" />
          </Link>
        </li>
        <li className={`side-nav-link ${currentPath === "/agents" ? "active" : ""}`}>
          <Link
            to="/agents"
          >
            <img className="menu-icons" src="/Agent.svg" alt="Agents" />
            Agents
            <img className="agents-right-arrow" src="/right-arrow.svg" alt="Right-Arrow" />
          </Link>
        </li>
        <li className={`side-nav-link ${currentPath === "/reports" ? "active" : ""}`}>
          <Link
            to="/reports"
          >
            <img className="menu-icons" src="/Reports.svg" alt="Reports" />
            Reports
            <img className="reports-right-arrow" src="/right-arrow.svg" alt="Right-Arrow" />
          </Link>
        </li>
      </ul>
    </aside>
  );
}
