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
const [showCollectionHistory, setShowCollectionHistory] =
useState(false);

const [showDueHistory, setShowDueHistory] =
useState(false);

const cardClass = `     rounded-2xl border p-5 shadow-md transition
    ${
      darkMode
        ? "border-slate-700 bg-slate-900"
        : "border-slate-300 bg-white"
    }
  `;

const labelClass = `     text-sm font-medium
    ${darkMode ? "text-slate-400" : "text-slate-500"}
  `;

const valueClass = `     mt-2 text-2xl font-bold
    ${darkMode ? "text-slate-100" : "text-slate-800"}
  `;

const safeCollection = Number(thisMonthCollection) || 0;
const safeDue = Number(totalDue) || 0;

return (
<> <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

    {/* Total Rooms */}
    <div className={cardClass}>
      <p className={labelClass}>Total Rooms</p>

      <div className="mt-2 flex items-center justify-between gap-4">
        <p className={valueClass.replace("mt-2", "m-0")}>
          {Number(totalRooms) || 0}
        </p>

        <button
          type="button"
          onClick={onAddRoom}
          className="
            shrink-0 rounded-lg bg-emerald-500 px-4 py-2
            text-sm font-semibold text-slate-950
            transition hover:bg-emerald-400
          "
        >
          + Add New Room
        </button>
      </div>
    </div>

    {/* This Month Collection */}
    <button
      type="button"
      onClick={() => setShowCollectionHistory(true)}
      className={`${cardClass} text-left hover:border-emerald-500`}
    >
      <p className={labelClass}>
        This Month Collection
      </p>

      <p className={valueClass}>
        ₹{safeCollection.toLocaleString("en-IN")}
      </p>

      <p
        className={`
          mt-2 text-xs
          ${darkMode ? "text-slate-500" : "text-slate-400"}
        `}
      >
        Click to view collection history
      </p>
    </button>

    {/* Total Due */}
    <button
      type="button"
      onClick={() => setShowDueHistory(true)}
      className={`${cardClass} text-left hover:border-emerald-500`}
    >
      <p className={labelClass}>
        Total Due
      </p>

      <p className={valueClass}>
        ₹{safeDue.toLocaleString("en-IN")}
      </p>

      <p
        className={`
          mt-2 text-xs
          ${darkMode ? "text-slate-500" : "text-slate-400"}
        `}
      >
        Click to view due history
      </p>
    </button>
  </div>

  {/* Collection History */}
  {showCollectionHistory && (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 px-4
      "
      onClick={() => setShowCollectionHistory(false)}
    >
      <div
        className={`
          w-full max-w-md rounded-2xl border p-6 shadow-2xl
          ${
            darkMode
              ? "border-slate-700 bg-slate-900"
              : "border-slate-300 bg-white"
          }
        `}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2
              className={`text-xl font-bold ${
                darkMode
                  ? "text-slate-100"
                  : "text-slate-800"
              }`}
            >
              Collection History
            </h2>

            <p
              className={`mt-1 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Previous 5 months
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCollectionHistory(false)}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-lg text-slate-400
              transition hover:bg-slate-700 hover:text-white
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
                  flex items-center justify-between rounded-lg
                  px-4 py-3
                  ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-slate-100"
                  }
                `}
              >
                <span
                  className={
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  {item.month}
                </span>

                <span className="font-semibold text-emerald-400">
                  ₹
                  {(
                    Number(item.amount) || 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            <p
              className={`
                rounded-lg px-4 py-3 text-sm
                ${
                  darkMode
                    ? "bg-slate-800 text-slate-400"
                    : "bg-slate-100 text-slate-500"
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

  {/* Due History */}
  {showDueHistory && (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 px-4
      "
      onClick={() => setShowDueHistory(false)}
    >
      <div
        className={`
          w-full max-w-md rounded-2xl border p-6 shadow-2xl
          ${
            darkMode
              ? "border-slate-700 bg-slate-900"
              : "border-slate-300 bg-white"
          }
        `}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2
              className={`text-xl font-bold ${
                darkMode
                  ? "text-slate-100"
                  : "text-slate-800"
              }`}
            >
              Due History
            </h2>

            <p
              className={`mt-1 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Previous 5 months
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDueHistory(false)}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-lg text-slate-400
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
                  flex items-center justify-between rounded-lg
                  px-4 py-3
                  ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-slate-100"
                  }
                `}
              >
                <span
                  className={
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }
                >
                  {item.month}
                </span>

                <span className="font-semibold text-red-400">
                  ₹
                  {(
                    Number(item.amount) || 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            <p
              className={`
                rounded-lg px-4 py-3 text-sm
                ${
                  darkMode
                    ? "bg-slate-800 text-slate-400"
                    : "bg-slate-100 text-slate-500"
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
