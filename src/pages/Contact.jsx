import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[65px] z-40 flex items-start justify-center px-4 pb-6 pt-10">

      <div className="relative pointer-events-auto h-[80vh] w-[80vw] overflow-hidden rounded-3xl border bg-slate-900 border-slate-700 shadow-2xl">

        <Link
          to="/"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-slate-800 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400 border-slate-600 hover:border-red-400"
        >
          ✕
        </Link>

        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">

          <div className="border-b bg-slate-800 px-8 py-10 border-slate-700 md:px-12">

            <p className="text-sm uppercase tracking-widest text-indigo-400 font-semibold">
              Get In Touch
            </p>

            <h1 className="mt-3 text-4xl font-extrabold text-slate-100 tracking-tight md:text-5xl">
              Contact Us
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-400 leading-8">
              Have a question or feedback about
              Landlord Desk? We would love to hear
              from you.
            </p>

          </div>

          <div className="px-8 py-10 md:px-12">

            <div className="grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border bg-indigo-500/10 p-6 border-indigo-500/20">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white bg-indigo-600">
                  ✉
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all font-semibold text-slate-100">
                  support@landlorddesk.com
                </p>

              </div>

              <div className="rounded-2xl border bg-emerald-500/10 p-6 border-emerald-500/20">

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

              <div className="rounded-2xl border bg-orange-500/10 p-6 border-orange-500/20">

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

            <div className="mt-8 rounded-2xl border bg-slate-800 p-6 border-slate-700">

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