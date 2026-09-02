function RoomSort({
  darkMode,
  sortBy,
  onSortChange,
  onClose,
}) {
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
      <div
        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`fixed right-6 top-24 z-50 w-full max-w-sm rounded-2xl border p-5 shadow-2xl ${
          darkMode
            ? "border-slate-700 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3
              className={`text-lg font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Sort Rooms
            </h3>

            <p
              className={`mt-1 text-xs ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
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
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            ×
          </button>
        </div>

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
                    : "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : darkMode
                    ? "border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{option.label}</span>

              {sortBy === option.value && (
                <span className="text-emerald-500">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default RoomSort;
