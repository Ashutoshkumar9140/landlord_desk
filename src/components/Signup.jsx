import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup({ darkMode }) {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ........................................Handle Signup ........................................
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    // ........................................ Validate Name ........................................
    if (trimmedName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    // ........................................Validate Email ........................................
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ......................................Validate Mobile Number ......................................
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!mobilePattern.test(trimmedMobile)) {
      setError(
        "Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9.",
      );
      return;
    }

    // ....................................... Validate Password.......................................
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters and contain at least one letter and one number.",
      );
      return;
    }

    // ........................................Create New Account........................................
    const result = signup({
      name: trimmedName,
      email: trimmedEmail,
      mobile: trimmedMobile,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    // ........................................Go To Dashboard........................................
    navigate("/dashboard", { replace: true });
  };

  const handleInputFocus = () => {
    setError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value.replace(/\D/g, ""));
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[65px] z-40 flex items-start justify-center px-4 pb-8 pt-12">
      <div
        className={`relative max-h-[80vh] w-[80vw] max-w-md overflow-y-auto rounded-3xl border p-8 shadow-2xl pointer-events-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-slate-300 border-slate-400"
        }`}
      >
        <Link
          to="/"
          className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition ${
            darkMode
              ? "text-slate-300 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 border-slate-600 hover:border-red-400"
              : "hover:border-red-400 bg-slate-200 text-slate-700 border-slate-400 hover:bg-red-500/10 hover:text-red-600"
          }`}
        >
          ✕
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="pr-12">
            <h1
              className={`font-bold text-3xl ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Create Account
            </h1>

            <p
              className={`mt-3 text-sm leading-6 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Create your account to manage your rental rooms.
            </p>
          </div>

          {error && (
            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                darkMode
                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                  : "text-red-700 border-red-400 bg-red-100"
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
              Name
            </label>

            <input
              type="text"
              value={name}
              onFocus={handleInputFocus}
              onChange={handleNameChange}
              required
              placeholder="Enter your name"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "text-slate-100 focus:border-indigo-500 border-slate-700 focus:ring-2 bg-slate-700 placeholder:text-slate-400 focus:ring-indigo-500/20"
                  : "bg-slate-100 placeholder:text-slate-500 border-slate-400 focus:ring-2 text-slate-900 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            />
          </div>

          <div className="mt-6">
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-800"
              }`}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onFocus={handleInputFocus}
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "placeholder:text-slate-400 bg-slate-700 focus:ring-2 text-slate-100 border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500"
                  : "text-slate-900 border-slate-400 focus:border-indigo-600 bg-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-600/20"
              }`}
            />
          </div>

          <div className="mt-6">
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-800"
              }`}
            >
              Mobile Number
            </label>

            <input
              type="tel"
              value={mobile}
              onFocus={handleInputFocus}
              onChange={handleMobileChange}
              required
              maxLength="10"
              inputMode="numeric"
              placeholder="Enter 10 digit mobile number"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "border-slate-700 placeholder:text-slate-400 text-slate-100 bg-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "focus:ring-2 bg-slate-100 text-slate-900 border-slate-400 placeholder:text-slate-500 focus:ring-indigo-600/20 focus:border-indigo-600"
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
                minLength="8"
                placeholder="Create password"
                className={`w-full rounded-lg border px-4 py-3 pr-16 text-sm outline-none transition ${
                  darkMode
                    ? "bg-slate-700 focus:ring-indigo-500/20 text-slate-100 border-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2"
                    : "border-slate-400 focus:border-indigo-600 text-slate-900 bg-slate-100 focus:ring-2 placeholder:text-slate-500 pr-16 focus:ring-indigo-600/20"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold transition ${
                  darkMode
                    ? "hover:text-slate-100 text-slate-400 hover:bg-slate-600"
                    : "hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p
              className={`mt-2 text-xs ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Minimum 8 characters with at least one letter and one number.
            </p>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700"
          >
            Create Account
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;