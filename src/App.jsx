import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

import { useAuth } from "./context/AuthContext";

function MainLayout({
  darkMode,
  setDarkMode,
}) {
  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950"
          : "bg-slate-200"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main
        className={`h-[calc(100vh-64px)] overflow-hidden ${
          darkMode
            ? "bg-slate-950"
            : "bg-slate-200"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({
  darkMode,
  setDarkMode,
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Dashboard
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode =
      localStorage.getItem("landlord_dark_mode");

    if (savedMode === null) {
      return true;
    }

    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem(
      "landlord_dark_mode",
      darkMode
    );
  }, [darkMode]);

  return (
    <BrowserRouter basename="/landlord_desk">
      <Routes>

        {/* Public Pages */}

        <Route
          element={
            <MainLayout
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        >
          <Route
            path="/"
            element={
              <Home darkMode={darkMode} />
            }
          />

          <Route
            path="/about"
            element={
              <About darkMode={darkMode} />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact darkMode={darkMode} />
            }
          />

          <Route
            path="/login"
            element={
              <Login darkMode={darkMode} />
            }
          />

          <Route
            path="/signup"
            element={
              <Signup darkMode={darkMode} />
            }
          />
        </Route>

        {/* Protected Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
