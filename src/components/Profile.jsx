import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const PROFILE_KEY = "landlord_profile";
const PROFILE_VERSION_KEY = "landlord_profile_version";

function Profile({
  darkMode,
  onClose,
  onOpenSettings,
  onLogout,
  profileImage,
  setProfileImage,
}) {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    age: "",
    address: "",
    image: profileImage || "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    /*
      Clear old profile data once.

      Earlier versions of the project stored dummy profile
      information in localStorage. This removes that old data
      without requiring the user to manually clear the browser.
    */
    const profileVersion = localStorage.getItem(
      PROFILE_VERSION_KEY
    );

    if (!profileVersion) {
      localStorage.removeItem(PROFILE_KEY);

      localStorage.setItem(
        PROFILE_VERSION_KEY,
        "2"
      );
    }

    const savedProfile =
      localStorage.getItem(PROFILE_KEY);

    const savedData = savedProfile
      ? JSON.parse(savedProfile)
      : {};

    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      age: savedData.age || "",
      address: savedData.address || "",
      image: savedData.image || profileImage || "",
    });
  }, [user, profileImage]);

  const handleChange = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      setProfile((previous) => ({
        ...previous,
        image,
      }));

      setProfileImage(image);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const profileData = {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      age: profile.age,
      address: profile.address,
      image: profile.image || "",
    };

    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(profileData)
    );

    setProfile(profileData);
    setProfileImage(profileData.image || "");
    setEditing(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-8">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border p-6 shadow-2xl sm:p-8 ${
          darkMode
            ? "border-slate-700 bg-slate-900"
            : "border-slate-300 bg-white"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${
            darkMode
              ? "border-slate-600 bg-slate-800 text-slate-300 hover:border-red-400 hover:text-red-400"
              : "border-slate-300 bg-slate-100 text-slate-700 hover:border-red-400 hover:text-red-600"
          }`}
        >
          ✕
        </button>

        <div className="pr-12">
          <p
            className={`text-sm font-semibold uppercase tracking-widest ${
              darkMode
                ? "text-indigo-400"
                : "text-indigo-600"
            }`}
          >
            Account
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              darkMode
                ? "text-slate-100"
                : "text-slate-900"
            }`}
          >
            Profile
          </h2>

          <p
            className={`mt-2 text-sm ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Manage your personal profile information.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div
            className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-slate-100"
            }`}
          >
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                className={`text-3xl font-bold ${
                  darkMode
                    ? "text-indigo-400"
                    : "text-indigo-600"
                }`}
              >
                {profile.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "U"}
              </span>
            )}
          </div>

          {editing && (
            <label
              className={`mt-4 cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                darkMode
                  ? "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Change Photo

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-800"
              }`}
            >
              Name
            </label>

            <input
              type="text"
              value={profile.name}
              disabled
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-400"
                  : "border-slate-300 bg-slate-100 text-slate-600"
              }`}
            />
          </div>

          <div>
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-800"
              }`}
            >
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-400"
                  : "border-slate-300 bg-slate-100 text-slate-600"
              }`}
            />
          </div>

          <div>
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-800"
              }`}
            >
              Mobile Number
            </label>

            <input
              type="tel"
              value={profile.mobile}
              disabled
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-400"
                  : "border-slate-300 bg-slate-100 text-slate-600"
              }`}
            />
          </div>

          <div>
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-800"
              }`}
            >
              Age
            </label>

            <input
              type="number"
              min="18"
              max="100"
              value={profile.age}
              onChange={(e) =>
                handleChange("age", e.target.value)
              }
              disabled={!editing}
              placeholder="Enter your age"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "border-slate-700 bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500"
                  : "border-slate-400 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-indigo-600"
              }`}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              className={`mb-2 block text-sm font-semibold ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-800"
              }`}
            >
              Address
            </label>

            <textarea
              value={profile.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
              disabled={!editing}
              placeholder="Enter your address"
              rows="3"
              className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition ${
                darkMode
                  ? "border-slate-700 bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500"
                  : "border-slate-400 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-indigo-600"
              }`}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Save Profile
            </button>
          )}

          <button
            type="button"
            onClick={onOpenSettings}
            className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
                : "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;