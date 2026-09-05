import { useState } from "react";

function RoomFilters({ darkMode, filters, onApply, onClose }) {
  const [activeCategory, setActiveCategory] = useState("paymentStatus");

  const [draftFilters, setDraftFilters] = useState(filters);

  // ...................................Filter Categories ........................................
  const categories = [
    { id: "paymentStatus", label: "Payment Status" },
    { id: "dueAmount", label: "Due Amount" },
    { id: "billingCycle", label: "Billing Cycle" },
    { id: "collectionDate", label: "Collection Date" },
    { id: "upcomingCollection", label: "Upcoming Collection" },
  ];

  // .....................................Update selected filter .....................................
  const updateFilter = (key, value) => {
    setDraftFilters((previous) => ({ ...previous, [key]: value }));
  };

  // ................................................Apply Filters ................................................
  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  // ............................................Main Filter Panel .............................................
  const panelClass = `w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl ${
    darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300"
  }`;

  // ........................................Category Button Style......................................./
  const categoryClass = (category) =>
    `w-full px-5 py-4 text-left text-sm font-medium transition ${
      activeCategory === category
        ? darkMode
          ? "text-emerald-400 bg-emerald-500/15"
          : "text-emerald-600 bg-emerald-50"
        : darkMode
          ? "text-slate-300 hover:bg-slate-800"
          : "text-slate-600 hover:bg-slate-100"
    }`;

// .............................................Input Style................................................
  const inputClass = `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 ${
    darkMode
      ? "text-slate-100 border-slate-600 bg-slate-800"
      : "bg-white text-slate-800 border-slate-300"
  }`;

  const labelClass = darkMode ? "text-slate-300" : "text-slate-700";

  return (
    <div
      className="z-50 fixed bg-black/60 flex px-4 justify-center inset-0 items-center"
      onClick={onClose}
    >
      <div className={panelClass} onClick={(event) => event.stopPropagation()}>
// ........................................Filter Header........................................
        <div
          className={`flex items-center justify-between border-b px-6 py-4 ${darkMode ? "border-slate-700" : "border-slate-200"}`}
        >
          <div>
            <h2
              className={`text-xl font-bold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
            >
              Search & Filter
            </h2>
            <p
              className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Apply multiple filters together
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 w-8 justify-center h-8 text-lg items-center flex hover:text-white transition rounded-lg hover:bg-slate-700"
          >
            ×
          </button>
        </div>

        <div className="h-[460px] flex">
// ........................................Filter Categories.......................................
          <div
            className={`w-56 shrink-0 overflow-y-auto border-r ${darkMode ? "border-slate-700" : "border-slate-200"}`}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={categoryClass(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

  // ................................... Filter Options........................................
          <div className="overflow-y-auto p-7 flex-1">
  // ....................................... Payment Status .......................................
            {activeCategory === "paymentStatus" && (
              <div>
                <h3
                  className={`mb-5 text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  Payment Status
                </h3>
                <div className="space-y-4">
                  {[
                    ["all", "All"],
                    ["paid", "Paid"],
                    ["unpaid", "Unpaid"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="gap-3 cursor-pointer items-center flex"
                    >
                      <input
                        type="radio"
                        name="paymentStatus"
                        checked={draftFilters.paymentStatus === value}
                        onChange={() => updateFilter("paymentStatus", value)}
                        className="accent-emerald-500 w-4 h-4"
                      />
                      <span className={`text-sm ${labelClass}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

    // .................................... Due Amount ...........................................
            {activeCategory === "dueAmount" && (
              <div>
                <h3
                  className={`mb-2 text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  Due Amount
                </h3>
                <p
                  className={`mb-5 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  Select a month to find rooms that have a remaining due amount.
                </p>
                <label
                  className={`mb-2 block text-sm font-medium ${labelClass}`}
                >
                  Select Month
                </label>
                <select
                  value={draftFilters.dueMonth || ""}
                  onChange={(event) =>
                    updateFilter("dueMonth", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <p
                  className={`mt-3 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Only rooms with a due amount in the selected month will be
                  shown.
                </p>
              </div>
            )}

// .................................... Billing Cycle ........................................
            {activeCategory === "billingCycle" && (
              <div>
                <h3
                  className={`mb-5 text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  Billing Cycle
                </h3>
                <select
                  value={draftFilters.billingCycle || "all"}
                  onChange={(event) =>
                    updateFilter("billingCycle", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="all">All Billing Days</option>
                  <option value="1-7">1 - 7</option>
                  <option value="8-14">8 - 14</option>
                  <option value="15-21">15 - 21</option>
                  <option value="22-28">22 - 28</option>
                  <option value="29-31">29 - 31</option>
                </select>
              </div>
            )}

 // ......................................Collection Date......................................
            {activeCategory === "collectionDate" && (
              <div>
                <h3
                  className={`mb-5 text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  Specific Collection Date
                </h3>
                <input
                  type="date"
                  value={draftFilters.collectionDate || ""}
                  onChange={(event) =>
                    updateFilter("collectionDate", event.target.value)
                  }
                  className={inputClass}
                />
                <p
                  className={`mt-3 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Finds rooms whose monthly billing cycle falls on this date.
                </p>
              </div>
            )}

// ....................................Upcoming Collection ....................................
            {activeCategory === "upcomingCollection" && (
              <div>
                <h3
                  className={`mb-5 text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  Upcoming Collection
                </h3>
                <select
                  value={draftFilters.upcomingDays ?? ""}
                  onChange={(event) =>
                    updateFilter("upcomingDays", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">No Filter</option>
                  <option value="0">Today</option>
                  <option value="3">Next 3 Days</option>
                  <option value="5">Next 5 Days</option>
                  <option value="7">Next 7 Days</option>
                  <option value="15">Next 15 Days</option>
                </select>
                <p
                  className={`mt-3 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Shows rooms that need rent collection within the selected
                  period.
                </p>
              </div>
            )}
          </div>
        </div>

  // ........................................ Filter Actions ........................................
        <div
          className={`flex justify-end gap-3 border-t px-6 py-4 ${darkMode ? "border-slate-700" : "border-slate-200"}`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${darkMode ? "bg-slate-700 text-slate-200 hover:bg-slate-600" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="text-sm hover:bg-emerald-400 rounded-lg font-semibold bg-emerald-500 text-slate-950 py-2.5 px-5 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomFilters;