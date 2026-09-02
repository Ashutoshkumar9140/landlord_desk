import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[65px] z-40 flex items-start justify-center px-4 pb-6 pt-10">

      <div className="pointer-events-auto relative h-[80vh] w-[80vw] overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

        <Link
          to="/"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-sm font-medium text-slate-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
        >
          ✕
        </Link>

        <div className="h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          <div className="border-b border-slate-700 bg-slate-800 px-8 py-10 md:px-12">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Get In Touch
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
              Contact Us
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Have a question or feedback about
              Landlord Desk? We would love to hear
              from you.
            </p>

          </div>

          <div className="px-8 py-10 md:px-12">

            <div className="grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
                  ✉
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all font-semibold text-slate-100">
                  support@landlorddesk.com
                </p>

              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
                  ☎
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Phone
                </p>

                <p className="mt-1 font-semibold text-slate-100">
                  +91 00000 00000
                </p>

              </div>

              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
                  📍
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Address
                </p>

                <p className="mt-1 font-semibold text-slate-100">
                  India
                </p>

              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">

              <h2 className="text-xl font-bold text-slate-100">
                We are here to help
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                Whether you have a question about
                Landlord Desk, want to share feedback,
                or have a suggestion for improving the
                platform, feel free to get in touch with us.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;