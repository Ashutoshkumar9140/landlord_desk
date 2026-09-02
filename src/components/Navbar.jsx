import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navLinkClass = (path) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      location.pathname === path
        ? "bg-emerald-500/15 text-emerald-400"
        : "text-slate-300 hover:text-white"
    }`;

  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav
      className={`relative z-50 border-b shadow-md ${
        darkMode
          ? "border-slate-700 bg-slate-900"
          : "border-slate-700 bg-slate-800"
      }`}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-slate-100 transition hover:text-emerald-400"
        >
          Landlord Desk
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/about"
            className={navLinkClass("/about")}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className={navLinkClass("/contact")}
          >
            Contact Us
          </Link>

          {isDashboard && user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={navLinkClass("/login")}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={navLinkClass("/signup")}
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() =>
              setDarkMode((previous) => !previous)
            }
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-700 text-base text-slate-100 transition hover:bg-slate-600"
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
