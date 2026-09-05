function RoomSort({ darkMode, sortBy, onSortChange, onClose }) {
// ........................................ Sort Options ....................................
  const options = [
    {
      value: "roomAsc",
      label: "Room Number: Low → High",
    },
    {
      value: "roomDesc",
      label: "Room Number: High → Low",
    },
    {
      value: "billingAsc",
      label: "Billing Day: 1 → 31",
    },
    {
      value: "billingDesc",
      label: "Billing Day: 31 → 1",
    },
  ];

  return (
    <>
{/* ....................................Sort Overlay ........................................ */}
      <div
        className="backdrop-blur-sm fixed inset-0 z-40 bg-slate-950/50"
        onClick={onClose}
      />

{/* .................................Sort Panel ............................................ */}
      <div
        className={`fixed right-6 top-24 z-50 w-full max-w-sm rounded-2xl border p-5 shadow-2xl ${
          darkMode
            ? "border-slate-700 bg-slate-900"
            : "bg-white border-slate-200"
        }`}
      >
{/* ........................................ Sort Header ................................. */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Sort Rooms
            </h3>

            <p
              className={`mt-1 text-xs ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Choose how rooms should be arranged.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg px-2 py-1 text-lg ${
              darkMode
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "hover:text-slate-800 text-slate-400 hover:bg-slate-100"
            }`}
          >
            ×
          </button>
        </div>

{/* ..................................Sorting Choices ........................................ */}
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSortChange(option.value);
                onClose();
              }}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                sortBy === option.value
                  ? darkMode
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-700 border-emerald-500"
                  : darkMode
                    ? "hover:border-slate-600 text-slate-300 border-slate-700 hover:bg-slate-800"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span>{option.label}</span>

{/* ........................................Selected Option........................................ */}
              {sortBy === option.value && (
                <span className="text-emerald-500">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default RoomSort;