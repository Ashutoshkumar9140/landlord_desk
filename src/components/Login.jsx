import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login({ darkMode }) {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const result = login(loginValue, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  const handleInputFocus = () => {
    setError("");
  };

  const handleLoginValueChange = (e) => {
    setLoginValue(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[65px] z-40 flex items-start justify-center px-4 pb-8 pt-12">
      <div
        className={`pointer-events-auto relative max-h-[80vh] w-[80vw] max-w-md overflow-y-auto rounded-3xl border p-8 shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          darkMode
            ? "border-slate-700 bg-slate-900"
            : "border-slate-400 bg-slate-300"
        }`}
      >
        <Link
          to="/"
          className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition ${
            darkMode
              ? "border-slate-600 bg-slate-800 text-slate-300 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
              : "border-slate-400 bg-slate-200 text-slate-700 hover:border-red-400 hover:bg-red-500/10 hover:text-red-600"
          }`}
        >
          ✕
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="pr-12">
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Welcome Back
            </h1>

            <p
              className={`mt-3 text-sm leading-6 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Login to your account to manage your rental rooms.
            </p>
          </div>

          {error && (
            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                darkMode
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-red-400 bg-red-100 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <div className="mt-9">
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-800"
              }`}
            >
              Email or Mobile
            </label>

            <input
              type="text"
              value={loginValue}
              onFocus={handleInputFocus}
              onChange={handleLoginValueChange}
              required
              placeholder="Enter your email or mobile number"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "border-slate-700 bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "border-slate-400 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
              }`}
            />
          </div>

          <div className="mt-6">
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-800"
              }`}
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onFocus={handleInputFocus}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your password"
                className={`w-full rounded-lg border px-4 py-3 pr-16 text-sm outline-none transition ${
                  darkMode
                    ? "border-slate-700 bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "border-slate-400 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold transition ${
                  darkMode
                    ? "text-slate-400 hover:bg-slate-600 hover:text-slate-100"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700"
          >
            Login
          </button>

          <div className="my-7 flex items-center gap-3">
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-slate-700" : "bg-slate-400"
              }`}
            />

            <span
              className={`text-xs ${
                darkMode ? "text-slate-500" : "text-slate-600"
              }`}
            >
              OR
            </span>

            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-slate-700" : "bg-slate-400"
              }`}
            />
          </div>

          <p
            className={`text-center text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={`font-semibold transition ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
