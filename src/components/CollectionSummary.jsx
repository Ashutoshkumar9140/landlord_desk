import { useState } from "react";

function CollectionSummary({
  darkMode,
  totalRooms,
  thisMonthCollection,
  totalDue,
  onAddRoom,
  collectionHistory = [],
  dueHistory = [],
}) {
  const [showCollectionHistory, setShowCollectionHistory] = useState(false);
  const [showDueHistory, setShowDueHistory] = useState(false);

  // Common styles for the summary cards............................
  const cardClass = `
    p-5 rounded-2xl shadow-md border transition
    ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300"}
  `;

  const labelClass = `
    font-medium text-sm
    ${darkMode ? "text-slate-400" : "text-slate-500"}
  `;

  const valueClass = `
    font-bold mt-2 text-2xl
    ${darkMode ? "text-slate-100" : "text-slate-800"}
  `;

  const safeCollection = Number(thisMonthCollection) || 0;
  const safeDue = Number(totalDue) || 0;

  return (
    <>
      {/* ...........................................Summary cards.............................. */}
      <div className="gap-5 grid grid-cols-1 md:grid-cols-3">
        {/* Total Rooms */}
        <div className={cardClass}>
          <p className={labelClass}>Total Rooms</p>

          <div className="items-center flex justify-between mt-2 gap-4">
            <p className={valueClass.replace("mt-2", "m-0")}>
              {Number(totalRooms) || 0}
            </p>

            <button
              type="button"
              onClick={onAddRoom}
              className="
                rounded-lg shrink-0 px-4 py-2 bg-emerald-500
                font-semibold text-sm text-slate-950
                hover:bg-emerald-400 transition
              "
            >
              + Add New Room
            </button>
          </div>
        </div>

        {/* This Month Collection....................... */}
        <button
          type="button"
          onClick={() => setShowCollectionHistory(true)}
          className={`${cardClass} hover:border-emerald-500 text-left`}
        >
          <p className={labelClass}>This Month Collection</p>

          <p className={valueClass}>
            ₹{safeCollection.toLocaleString("en-IN")}
          </p>

          <p
            className={`
              text-xs mt-2
              ${darkMode ? "text-slate-500" : "text-slate-400"}
            `}
          >
            Click to view collection history
          </p>
        </button>

        {/* Total Due............................ */}
        <button
          type="button"
          onClick={() => setShowDueHistory(true)}
          className={`${cardClass} text-left hover:border-emerald-500`}
        >
          <p className={labelClass}>Total Due</p>

          <p className={valueClass}>₹{safeDue.toLocaleString("en-IN")}</p>

          <p
            className={`
              text-xs mt-2
              ${darkMode ? "text-slate-500" : "text-slate-400"}
            `}
          >
            Click to view due history
          </p>
        </button>
      </div>

      {/* ...........................................Collection History........................................... */}
      {showCollectionHistory && (
        <div
          className="
            flex fixed inset-0 z-50 items-center justify-center
            px-4 bg-black/60
          "
          onClick={() => setShowCollectionHistory(false)}
        >
          <div
            className={`
              p-6 w-full max-w-md rounded-2xl shadow-2xl border
              ${
                darkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-300"
              }
            `}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className={`font-bold text-xl ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  Collection History
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Previous 5 months
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCollectionHistory(false)}
                className="
                  h-8 w-8 flex items-center justify-center
                  text-lg rounded-lg text-slate-400
                  hover:text-white transition hover:bg-slate-700
                "
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              {collectionHistory.length > 0 ? (
                collectionHistory.map((item) => (
                  <div
                    key={item.month}
                    className={`
                      items-center flex justify-between rounded-lg
                      py-3 px-4
                      ${darkMode ? "bg-slate-800" : "bg-slate-100"}
                    `}
                  >
                    <span
                      className={darkMode ? "text-slate-300" : "text-slate-700"}
                    >
                      {item.month}
                    </span>

                    <span className="text-emerald-400 font-semibold">
                      ₹{(Number(item.amount) || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              ) : (
                <p
                  className={`
                    px-4 rounded-lg py-3 text-sm
                    ${
                      darkMode
                        ? "text-slate-400 bg-slate-800"
                        : "text-slate-500 bg-slate-100"
                    }
                  `}
                >
                  No collection history available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ........................................... Due History........................................... */}
      {showDueHistory && (
        <div
          className="
            flex fixed inset-0 z-50 items-center justify-center
            bg-black/60 px-4
          "
          onClick={() => setShowDueHistory(false)}
        >
          <div
            className={`
              rounded-2xl w-full max-w-md border shadow-2xl p-6
              ${
                darkMode
                  ? "bg-slate-900 border-slate-700"
                  : "border-slate-300 bg-white"
              }
            `}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="items-center flex justify-between mb-5">
              <div>
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  Due History
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Previous 5 months
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDueHistory(false)}
                className="
                  justify-center rounded-lg flex h-8 w-8
                  text-slate-400 text-lg items-center
                  transition hover:bg-slate-700 hover:text-white
                "
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              {dueHistory.length > 0 ? (
                dueHistory.map((item) => (
                  <div
                    key={item.month}
                    className={`
                      justify-between flex items-center rounded-lg
                      px-4 py-3
                      ${darkMode ? "bg-slate-800" : "bg-slate-100"}
                    `}
                  >
                    <span
                      className={darkMode ? "text-slate-300" : "text-slate-700"}
                    >
                      {item.month}
                    </span>

                    <span className="font-semibold text-red-400">
                      ₹{(Number(item.amount) || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              ) : (
                <p
                  className={`
                    text-sm rounded-lg px-4 py-3
                    ${
                      darkMode
                        ? "bg-slate-800 text-slate-400"
                        : "text-slate-500 bg-slate-100"
                    }
                  `}
                >
                  No due history available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CollectionSummary;
