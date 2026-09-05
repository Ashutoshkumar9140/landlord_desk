import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Settings({ onClose, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showDelete, setShowDelete] = useState(false);

  // .....................................Delete Account........................................
  const handleDeleteAccount = () => {
    // Remove account data
    localStorage.removeItem("landlord_desk_account");

    // Remove profile data
    localStorage.removeItem("landlord_profile");

    // Remove saved rooms
    localStorage.removeItem("landlord_desk_rooms");

    // Remove profile version information
    localStorage.removeItem("landlord_profile_version");

    // Logout current user
    logout();

    // Close settings
    onClose();

    // Go to home page
    navigate("/", { replace: true });
  };

  return (
    <div
      className="flex fixed inset-0 z-[100] items-center justify-center bg-black/60 px-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-2xl border p-8 shadow-2xl ${
          darkMode
            ? "text-slate-100 border-slate-700 bg-slate-900"
            : "bg-white text-slate-900 border-slate-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Settings</h2>

          <button
            type="button"
            onClick={onClose}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${
              darkMode
                ? "bg-slate-800 hover:text-red-400 border-slate-600 text-slate-300 hover:border-red-400"
                : "hover:border-red-400 text-slate-700 border-slate-300 hover:text-red-600 bg-slate-100"
            }`}
          >
            ✕
          </button>
        </div>

        {!showDelete && (
          <div className="mt-8">
            <div
              className={`flex items-center justify-between border-b pb-5 ${
                darkMode ? "border-slate-700" : "border-slate-200"
              }`}
            >
              <div>
                <p className="font-medium">Appearance</p>

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Change dashboard appearance
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDarkMode(false)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    !darkMode
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "text-slate-300 hover:bg-slate-700 bg-slate-800 border-slate-600"
                  }`}
                >
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode(true)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    darkMode
                      ? "text-white border-indigo-500 bg-indigo-600"
                      : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className={`mt-6 w-full rounded-lg border px-4 py-4 text-left transition ${
                darkMode
                  ? "text-red-400 hover:bg-red-500/10 bg-red-500/5 border-red-500/30"
                  : "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
              }`}
            >
              <p className="font-medium">Delete Account</p>

              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-red-400/70" : "text-red-500"
                }`}
              >
                Permanently delete your account
              </p>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        )}

        {showDelete && (
          <div className="mt-8">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                darkMode
                  ? "text-red-400 bg-red-500/10"
                  : "bg-red-100 text-red-600"
              }`}
            >
              ⚠
            </div>

            <h3 className="mt-5 text-xl font-bold text-red-600">
              Delete Account?
            </h3>

            <p
              className={`mt-3 text-sm leading-6 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Are you sure you want to delete your account?
              <br />
              <br />
              Your profile information and saved room data will also be
              permanently deleted.
              <br />
              <br />
              This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDelete(false)}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                  darkMode
                    ? "text-slate-200 hover:bg-slate-700 border-slate-600 bg-slate-800"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                }`}
              >
                Don't Delete
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;