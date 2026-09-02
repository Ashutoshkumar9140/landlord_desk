import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home({ darkMode }) {
  return (
    <div
      className={`h-[calc(100vh-65px)] overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-200 text-slate-900"
      }`}
    >

      <main className="flex h-[calc(100vh-125px)] items-center justify-center px-6">

        <div className="max-w-3xl text-center">

          <p
            className={`mb-4 text-sm font-semibold uppercase tracking-widest ${
              darkMode
                ? "text-indigo-400"
                : "text-indigo-600"
            }`}
          >
            Simple Property Management
          </p>

          <h1
            className={`text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl ${
              darkMode
                ? "text-slate-100"
                : "text-slate-900"
            }`}
          >
            Manage your rental rooms
            <br />
            from one place.
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Landlord Desk helps landlords keep
            track of rooms, tenants, rent, bills
            and maintenance without depending
            on notebooks.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              to="/signup"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className={`rounded-lg border px-6 py-3 text-sm font-semibold transition ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "border-slate-400 bg-slate-300 text-slate-800 hover:bg-slate-400"
              }`}
            >
              Learn More
            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Home;