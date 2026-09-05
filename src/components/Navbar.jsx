import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // ........................................... Logout ...........................................
  const handleLogout = () => {
    logout();
  };

  // ...................................... Navigation Link Style ........................................
  const navLinkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm transition font-medium ${
      location.pathname === path
        ? "text-emerald-400 bg-emerald-500/15"
        : "hover:text-white text-slate-300"
    }`;

  // .................................... Check Dashboard Page ...........................................
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav
      className={`relative z-50 shadow-md border-b ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="mx-auto flex max-w-7xl min-h-16 items-center justify-between px-6 gap-6 py-4 lg:px-8">
        <Link
          to="/"
          className="tracking-tight text-xl text-slate-100 font-extrabold transition hover:text-emerald-400"
        >
          Landlord Desk
        </Link>

        {/* ........................................... Main Navigation Links ........................................... */}
        <div className="flex items-center sm:gap-6 gap-3">
          <Link to="/about" className={navLinkClass("/about")}>
            About Us
          </Link>

          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact Us
          </Link>

          {/* ........................................... Login, Signup and Logout ........................................... */}
          {isDashboard && user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm px-3 py-2 font-medium text-slate-300 transition hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={navLinkClass("/login")}>
                Login
              </Link>

              <Link to="/signup" className={navLinkClass("/signup")}>
                Sign Up
              </Link>
            </>
          )}

          {/* ........................................... Dark Mode Toggle ........................................... */}
          <button
            type="button"
            onClick={() => setDarkMode((previous) => !previous)}
            aria-label="Toggle dark mode"
            className="h-9 w-9 flex shrink-0 items-center justify-center rounded-lg bg-slate-700 border border-slate-600 text-base text-slate-100 transition hover:bg-slate-600"
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
