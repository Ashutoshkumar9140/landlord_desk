import { Link } from "react-router-dom";

function About() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[65px] z-40 flex items-start justify-center px-4 pb-6 pt-10">

      <div className="relative pointer-events-auto h-[80vh] w-[80vw] overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

        <Link
          to="/"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-slate-800 border-slate-600 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:border-red-400 hover:text-red-400"
        >
          ✕
        </Link>

        <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">

          <div className="border-b bg-slate-800 border-slate-700 px-8 py-10 md:px-12">

            <p className="text-sm uppercase tracking-widest font-semibold text-indigo-400">
              About the Project
            </p>

            <h1 className="mt-3 text-4xl font-extrabold text-slate-100 tracking-tight md:text-5xl">
              Landlord Desk
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-400 leading-8">
              A simple digital workspace for landlords
              to manage rooms, tenants and rental
              information in one place.
            </p>

          </div>

          <div className="grid gap-10 px-8 py-10 md:grid-cols-3 md:px-12">

            <div className="md:col-span-2">

              <h2 className="text-2xl font-bold text-slate-100">
                Why Landlord Desk?
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Managing rental rooms can become difficult
                when information is spread across notebooks,
                messages and different files. Landlord Desk
                is designed to bring that information together
                in one organized place.
              </p>

              <p className="mt-4 text-slate-400 leading-7">
                Landlords can keep track of tenants,
                rent payments, electricity readings,
                water readings, deposits and other important
                room information without depending on paper
                records.
              </p>

              <p className="mt-4 text-slate-400 leading-7">
                The goal is simple: make rental management
                easier, clearer and more organized.
              </p>

            </div>

            <div className="grid gap-4">

              <div className="rounded-2xl border bg-indigo-500/10 border-indigo-500/20 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl text-xl text-white bg-indigo-600">
                  🏠
                </div>

                <h3 className="mt-4 font-bold text-slate-100">
                  Room Management
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Keep important information about every
                  room organized.
                </p>

              </div>

              <div className="rounded-2xl border bg-emerald-500/10 border-emerald-500/20 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
                  ₹
                </div>

                <h3 className="mt-4 font-bold text-slate-100">
                  Rental Tracking
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-6">
                  Track rent payments, due amounts and
                  payment history.
                </p>

              </div>

              <div className="rounded-2xl border bg-orange-500/10 border-orange-500/20 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
                  ⚡
                </div>

                <h3 className="mt-4 font-bold text-slate-100">
                  Utility Records
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-6">
                  Keep electricity and water readings
                  and bills together.
                </p>

              </div>

            </div>

          </div>

          <div className="border-t bg-slate-800 border-slate-700 px-8 py-8 md:px-12">

            <h2 className="text-xl font-bold text-slate-100">
              Our Goal
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              Landlord Desk aims to turn everyday rental
              management into a simple digital experience
              where landlords can quickly understand what
              is happening with their rooms and tenants.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;