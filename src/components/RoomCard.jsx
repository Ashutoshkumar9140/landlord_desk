import { useEffect, useRef, useState } from "react";

function getCurrentMonthLabel() {
  const today = new Date();

  return today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

const getMonthKey = (value) => {
  if (!value) return "";

  const parsed = new Date(`1 ${value}`);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return `${parsed.getFullYear()}-${String(
    parsed.getMonth() + 1
  ).padStart(2, "0")}`;
};

const getCurrentBillingRecord = (room) => {
  const currentMonth = getCurrentMonthLabel();
  const currentMonthKey = getMonthKey(currentMonth);

  const history = Array.isArray(room.billingHistory)
    ? room.billingHistory
    : [];

  const currentRecord = history.find(
    (item) => getMonthKey(item?.month) === currentMonthKey
  );

  return currentRecord || null;
};

const getTodayInputValue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateInputValue = (value) => {
  if (!value) return "";

  const text = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";

  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
};

function RoomCard({
  room,
  expanded,
  onToggle,
  onUpdate,
  onDelete,
}) {
  const [roomEditing, setRoomEditing] =
    useState(
      room.status === "Draft"
    );

  const [billingEditing, setBillingEditing] =
    useState(false);

  const [history, setHistory] =
    useState(null);

  const [showDeleteWarning, setShowDeleteWarning] =
    useState(false);

  const fileInputRefs = useRef({});

  const [roomData, setRoomData] = useState({
    number: room.number || "",

    tenants:
      room.tenants || [],

    rent: room.rent || "",

    livingSince:
      room.livingSince || "",

    rentCycle:
      room.rentCycle || "",

    deposit:
      room.deposit || "",

    facilities:
      room.facilities || [],

    status:
      room.status || "Draft",
  });

  const currentBillingRecord = getCurrentBillingRecord(room);

  const [billingData, setBillingData] =
    useState({
      month: getCurrentMonthLabel(),

      paidDate:
        currentBillingRecord?.rent?.paidDate ||
        "",

      paidAmount:
        currentBillingRecord?.rent?.paidAmount ??
        "",

      dueAmount:
        currentBillingRecord?.rent?.dueAmount ??
        "",

      electricityReading:
        currentBillingRecord?.electricity?.reading ??
        "",

      electricityUnits:
        currentBillingRecord?.electricity?.units ??
        "",

      electricityBill:
        currentBillingRecord?.electricity?.bill ??
        "",

      waterReading:
        currentBillingRecord?.water?.reading ??
        "",

      waterUnits:
        currentBillingRecord?.water?.units ??
        "",

      waterBill:
        currentBillingRecord?.water?.bill ??
        "",
    });

  const [lastOpened, setLastOpened] =
    useState(
      room.lastOpened ||
        "Not opened yet"
    );

  /*
    Update local states when room
    changes from Dashboard
  */

  useEffect(() => {
    setRoomData({
      number: room.number || "",

      tenants:
        room.tenants || [],

      rent: room.rent || "",

      livingSince:
        room.livingSince || "",

      rentCycle:
        room.rentCycle || "",

      deposit:
        room.deposit || "",

      facilities:
        room.facilities || [],

      status:
        room.status || "Draft",
    });

    const currentBillingRecord =
      getCurrentBillingRecord(room);

    setBillingData({
      month: getCurrentMonthLabel(),

      paidDate:
        currentBillingRecord?.rent?.paidDate ||
        "",

      paidAmount:
        currentBillingRecord?.rent?.paidAmount ??
        "",

      dueAmount:
        currentBillingRecord?.rent?.dueAmount ??
        "",

      electricityReading:
        currentBillingRecord?.electricity?.reading ??
        "",

      electricityUnits:
        currentBillingRecord?.electricity?.units ??
        "",

      electricityBill:
        currentBillingRecord?.electricity?.bill ??
        "",

      waterReading:
        currentBillingRecord?.water?.reading ??
        "",

      waterUnits:
        currentBillingRecord?.water?.units ??
        "",

      waterBill:
        currentBillingRecord?.water?.bill ??
        "",
    });

    setLastOpened(
      room.lastOpened ||
        "Not opened yet"
    );
  }, [room]);

  /*
    Last opened
  */

  useEffect(() => {
    if (!expanded) return;

    const now = new Date();

    const formattedDate =
      now.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    setLastOpened(
      formattedDate
    );

    onUpdate({
      ...room,
      lastOpened:
        formattedDate,
    });
  }, [expanded]);

  /*
    Room input
  */

  const handleRoomChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setRoomData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  /*
    Billing input
  */

  const handleBillingChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setBillingData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  /*
    Tenant input
  */

  const handleTenantChange = (
    tenantId,
    field,
    value
  ) => {
    setRoomData(
      (previous) => ({
        ...previous,

        tenants:
          previous.tenants.map(
            (tenant) =>
              tenant.id ===
              tenantId
                ? {
                    ...tenant,
                    [field]:
                      value,
                  }
                : tenant
          ),
      })
    );
  };

  /*
    Add tenant
  */

  const addTenant = () => {
    setRoomData(
      (previous) => ({
        ...previous,

        tenants: [
          ...previous.tenants,

          {
            id: Date.now(),
            name: "",
            gender: "Male",
            identity: null,
          },
        ],
      })
    );
  };

  /*
    Remove tenant
  */

  const removeTenant = (
    tenantId
  ) => {
    setRoomData(
      (previous) => ({
        ...previous,

        tenants:
          previous.tenants.filter(
            (tenant) =>
              tenant.id !==
              tenantId
          ),
      })
    );
  };

  /*
    Identity picker
  */

  const handleIdentityClick = (
    tenantId
  ) => {
    const input =
      fileInputRefs.current[
        tenantId
      ];

    if (input) {
      input.click();
    }
  };

  const handleIdentityChange = (
    tenantId,
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    /*
      File objects cannot be stored
      directly in localStorage.

      We keep useful file information
      here for now.
    */

    const identityData = {
      name: file.name,
      type: file.type,
      size: file.size,
    };

    setRoomData(
      (previous) => ({
        ...previous,

        tenants:
          previous.tenants.map(
            (tenant) =>
              tenant.id ===
              tenantId
                ? {
                    ...tenant,
                    identity:
                      identityData,
                  }
                : tenant
          ),
      })
    );
  };

  /*
    Save room details
  */

  const saveRoomDetails = () => {
    const updatedRoom = {
      ...room,

      ...roomData,

      tenant:
        roomData.tenants
          .map(
            (tenant) =>
              tenant.name
          )
          .filter(Boolean)
          .join(", "),

      status:
        roomData.tenants
          .length > 0
          ? "Occupied"
          : "Vacant",

      lastOpened,
    };

    onUpdate(updatedRoom);

    setRoomEditing(false);
  };

  /*
    SAVE BILLING + HISTORY
  */

  const saveBillingDetails = () => {
    // The running month is always derived from the real current date.
    // The landlord does not manually type the month.
    const currentMonth = getCurrentMonthLabel();

    const newHistoryRecord = {
      month: currentMonth,

      rent: {
        paidDate:
          getDateInputValue(
            billingData.paidDate
          ),

        paidAmount:
          billingData.paidAmount,

        dueAmount:
          billingData.dueAmount,
      },

      electricity: {
        reading:
          billingData.electricityReading,

        units:
          billingData.electricityUnits,

        bill:
          billingData.electricityBill,
      },

      water: {
        reading:
          billingData.waterReading,

        units:
          billingData.waterUnits,

        bill:
          billingData.waterBill,
      },
    };

    /*
      Get existing history
    */

    const existingHistory =
      Array.isArray(
        room.billingHistory
      )
        ? room.billingHistory
        : [];

    /*
      Check whether this month
      already exists.
    */

    const existingIndex =
      existingHistory.findIndex(
        (item) =>
          item.month.toLowerCase() ===
          currentMonth.toLowerCase()
      );

    let updatedHistory;

    if (existingIndex !== -1) {
      /*
        Update existing month
      */

      updatedHistory =
        [...existingHistory];

      updatedHistory[
        existingIndex
      ] = newHistoryRecord;
    } else {
      /*
        Add new month
      */

      updatedHistory = [
        ...existingHistory,
        newHistoryRecord,
      ];
    }

    /*
      Keep history ordered from
      newest month to oldest month.

      This handles:
      January
      February
      March
      etc.
    */

    const sortedHistory =
      [...updatedHistory].sort(
        (a, b) =>
          new Date(
            `1 ${a.month}`
          ) -
          new Date(
            `1 ${b.month}`
          )
      );

    const updatedRoom = {
      ...room,

      ...roomData,

      ...billingData,

      paidDate: getDateInputValue(
        billingData.paidDate
      ),

      tenant:
        roomData.tenants
          .map(
            (tenant) =>
              tenant.name
          )
          .filter(Boolean)
          .join(", "),

      status:
        roomData.tenants
          .length > 0
          ? "Occupied"
          : "Vacant",

      billingHistory:
        sortedHistory,

      lastOpened,
    };

    /*
      Update Dashboard state.
      Dashboard automatically saves
      this to localStorage.
    */

    onUpdate(updatedRoom);

    setBillingEditing(false);
  };

  /*
    Delete room
  */

  const confirmDelete = () => {
    onDelete(room.id);

    setShowDeleteWarning(
      false
    );
  };

  /*
    Get history
  */

  const billingHistory =
    Array.isArray(
      room.billingHistory
    )
      ? room.billingHistory
      : [];

  /*
    Latest 5 months only
  */

  const latestHistory =
    [...billingHistory]
      .sort(
        (a, b) =>
          new Date(
            `1 ${b.month}`
          ) -
          new Date(
            `1 ${a.month}`
          )
      )
      .slice(0, 5);

  /*
    Render history
  */

  const renderHistory = () => {
    if (!history) {
      return null;
    }

    return (
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <h4 className="text-base font-bold text-slate-800">

            {history === "rent" &&
              "Rent History"}

            {history ===
              "electricity" &&
              "Electricity History"}

            {history === "water" &&
              "Water History"}

          </h4>

          <button
            onClick={() =>
              setHistory(null)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        {/* Rent */}

        {history === "rent" && (
          <div className="overflow-x-auto">

            <div className="min-w-[650px]">

              <div className="grid grid-cols-4 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">

                <span>
                  Month
                </span>

                <span>
                  Paid Date
                </span>

                <span>
                  Paid Amount
                </span>

                <span>
                  Due Amount
                </span>

              </div>

              {latestHistory.length ===
              0 ? (
                <p className="p-5 text-sm text-slate-400">
                  No rent history yet.
                </p>
              ) : (
                latestHistory.map(
                  (item) => (
                    <div
                      key={item.month}
                      className="grid grid-cols-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0"
                    >

                      <span className="font-semibold text-slate-700">
                        {item.month}
                      </span>

                      <span className="text-slate-500">
                        {item.rent
                          ?.paidDate ||
                          "Not paid"}
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          item.rent
                            ?.paidAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="font-bold text-red-500">
                        ₹
                        {Number(
                          item.rent
                            ?.dueAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>
                  )
                )
              )}

            </div>

          </div>
        )}

        {/* Electricity */}

        {history ===
          "electricity" && (
          <div className="overflow-x-auto">

            <div className="min-w-[700px]">

              <div className="grid grid-cols-4 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">

                <span>
                  Month
                </span>

                <span>
                  Reading
                </span>

                <span>
                  Units Used
                </span>

                <span>
                  Bill Amount
                </span>

              </div>

              {latestHistory.length ===
              0 ? (
                <p className="p-5 text-sm text-slate-400">
                  No electricity
                  history yet.
                </p>
              ) : (
                latestHistory.map(
                  (item) => (
                    <div
                      key={item.month}
                      className="grid grid-cols-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0"
                    >

                      <span className="font-semibold text-slate-700">
                        {item.month}
                      </span>

                      <span className="text-slate-500">
                        {item.electricity
                          ?.reading ||
                          "—"}
                      </span>

                      <span className="text-slate-500">
                        {item.electricity
                          ?.units ||
                          "—"}
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          item.electricity
                            ?.bill ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>
                  )
                )
              )}

            </div>

          </div>
        )}

        {/* Water */}

        {history === "water" && (
          <div className="overflow-x-auto">

            <div className="min-w-[700px]">

              <div className="grid grid-cols-4 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">

                <span>
                  Month
                </span>

                <span>
                  Reading
                </span>

                <span>
                  Units Used
                </span>

                <span>
                  Bill Amount
                </span>

              </div>

              {latestHistory.length ===
              0 ? (
                <p className="p-5 text-sm text-slate-400">
                  No water history yet.
                </p>
              ) : (
                latestHistory.map(
                  (item) => (
                    <div
                      key={item.month}
                      className="grid grid-cols-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0"
                    >

                      <span className="font-semibold text-slate-700">
                        {item.month}
                      </span>

                      <span className="text-slate-500">
                        {item.water
                          ?.reading ||
                          "—"}
                      </span>

                      <span className="text-slate-500">
                        {item.water
                          ?.units ||
                          "—"}
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          item.water
                            ?.bill ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>
                  )
                )
              )}

            </div>

          </div>
        )}

      </div>
    );
  };

  /*
    COLLAPSED CARD
  */

  const currentDisplayRecord = getCurrentBillingRecord(room);

  if (!expanded) {
    return (
      <button
        onClick={onToggle}
        className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Room
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {room.number}
            </h2>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              room.status ===
              "Occupied"
                ? "bg-emerald-100 text-emerald-700"
                : room.status ===
                  "Draft"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            ● {room.status}
          </span>

        </div>

        {/* Tenants */}

        <div className="mt-5">

          {room.tenants &&
          room.tenants.length >
            0 ? (
            <div className="space-y-1">

              {room.tenants.map(
                (tenant) => (
                  <p
                    key={tenant.id}
                    className="text-sm font-semibold text-slate-800"
                  >
                    {tenant.name}
                  </p>
                )
              )}

            </div>
          ) : (
            <p className="text-sm font-semibold text-slate-400">
              No tenant added
            </p>
          )}

        </div>

        {/* Important information */}

        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-slate-100 pt-4">

          <div>

            <p className="text-xs text-slate-400">
              RENT CYCLE
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {room.rentCycle ||
                "Not set"}
            </p>

          </div>

          <div>

            <p className="text-xs text-slate-400">
              LAST RENT
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {currentDisplayRecord?.rent?.paidAmount
                ? `₹${Number(
                    currentDisplayRecord.rent.paidAmount
                  ).toLocaleString(
                    "en-IN"
                  )}`
                : "Not paid"}
            </p>

          </div>

          <div>

            <p className="text-xs text-slate-400">
              PAID ON
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {currentDisplayRecord?.rent?.paidDate ||
                "—"}
            </p>

          </div>

          <div>

            <p className="text-xs text-slate-400">
              LAST OPENED
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {room.lastOpened ||
                "Not opened"}
            </p>

          </div>

          {Number(
            currentDisplayRecord?.rent?.dueAmount || 0
          ) > 0 && (
            <div className="col-span-2 rounded-xl bg-red-50 px-3 py-2">

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-red-500">
                  RENT DUE
                </span>

                <span className="text-sm font-bold text-red-600">
                  ₹
                  {Number(
                    room.dueAmount
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>
          )}

        </div>

      </button>
    );
  }

  /*
    EXPANDED ROOM
  */

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        onClick={onToggle}
      />

      {/* Expanded room */}

      <div className="fixed left-1/2 top-1/2 z-50 flex h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7 py-5">

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold text-slate-900">
                Room {room.number}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  room.status ===
                  "Occupied"
                    ? "bg-emerald-100 text-emerald-700"
                    : room.status ===
                      "Draft"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {room.status}
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              {room.tenant ||
                "New room"}
            </p>

          </div>

          <button
            onClick={onToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          >
            ×
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">

            {/* ROOM / TENANT */}

            <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
                    People & Room
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Room/Tenant Details
                  </h3>

                </div>

                <button
                  onClick={() =>
                    roomEditing
                      ? saveRoomDetails()
                      : setRoomEditing(
                          true
                        )
                  }
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    roomEditing
                      ? "bg-violet-600 text-white shadow-md hover:bg-violet-700"
                      : "bg-white text-violet-600 shadow-sm hover:bg-violet-100"
                  }`}
                >
                  {roomEditing
                    ? "Save"
                    : "Edit"}
                </button>

              </div>

              {/* Tenants */}

              <div className="mt-7">

                <p className="mb-3 text-sm font-bold text-slate-600">
                  Tenants
                </p>

                <div className="space-y-3">

                  {roomData.tenants.map(
                    (
                      tenant,
                      index
                    ) => (
                      <div
                        key={
                          tenant.id
                        }
                        className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
                      >

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_110px_auto] sm:items-center">

                          {/* Name */}

                          <div className="flex min-w-0 items-center gap-3">

                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100">
                              👤
                            </span>

                            {roomEditing ? (
                              <input
                                type="text"
                                value={
                                  tenant.name
                                }
                                onChange={(
                                  event
                                ) =>
                                  handleTenantChange(
                                    tenant.id,
                                    "name",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                placeholder="Tenant name"
                                className="min-w-0 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-violet-400"
                              />
                            ) : (
                              <span className="truncate text-sm font-semibold text-slate-700">
                                {tenant.name ||
                                  `Tenant ${
                                    index +
                                    1
                                  }`}
                              </span>
                            )}

                          </div>

                          {/* Gender */}

                          {roomEditing ? (
                            <select
                              value={
                                tenant.gender
                              }
                              onChange={(
                                event
                              ) =>
                                handleTenantChange(
                                  tenant.id,
                                  "gender",
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-violet-400"
                            >

                              <option value="Male">
                                Male
                              </option>

                              <option value="Female">
                                Female
                              </option>

                            </select>
                          ) : (
                            <span className="text-sm text-slate-500">
                              {tenant.gender}
                            </span>
                          )}

                          {/* Identity */}

                          <div className="flex items-center gap-2">

                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              ref={(
                                element
                              ) => {
                                fileInputRefs.current[
                                  tenant.id
                                ] =
                                  element;
                              }}
                              onChange={(
                                event
                              ) =>
                                handleIdentityChange(
                                  tenant.id,
                                  event
                                )
                              }
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleIdentityClick(
                                  tenant.id
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                tenant.identity
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {tenant.identity
                                ? "✓ ID Added"
                                : "📎 Identity"}
                            </button>

                            {roomEditing && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeTenant(
                                    tenant.id
                                  )
                                }
                                className="rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50"
                              >
                                ×
                              </button>
                            )}

                          </div>

                        </div>

                        {tenant.identity && (
                          <p className="mt-2 truncate pl-12 text-xs text-slate-400">
                            {
                              tenant
                                .identity
                                .name
                            }
                          </p>
                        )}

                      </div>
                    )
                  )}

                  {roomEditing && (
                    <button
                      type="button"
                      onClick={
                        addTenant
                      }
                      className="w-full rounded-xl border border-dashed border-violet-300 bg-white py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-50"
                    >
                      + Add Person
                    </button>
                  )}

                </div>

              </div>

              {/* Room information */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                {/* Living */}

                <div className="rounded-2xl border border-violet-100 bg-white p-4">

                  <p className="text-xs font-bold text-slate-400">
                    LIVING SINCE
                  </p>

                  {roomEditing ? (
                    <input
                      type="date"
                      name="livingSince"
                      value={
                        roomData.livingSince
                      }
                      onChange={
                        handleRoomChange
                      }
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                    />
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {roomData.livingSince ||
                        "Not added"}
                    </p>
                  )}

                </div>

                {/* Rent */}

                <div className="rounded-2xl border border-violet-100 bg-white p-4">

                  <p className="text-xs font-bold text-slate-400">
                    MONTHLY RENT
                  </p>

                  {roomEditing ? (
                    <input
                      type="number"
                      name="rent"
                      value={
                        roomData.rent
                      }
                      onChange={
                        handleRoomChange
                      }
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                    />
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      ₹
                      {Number(
                        roomData.rent ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}

                </div>

                {/* Cycle */}

                <div className="rounded-2xl border border-violet-100 bg-white p-4">

                  <p className="text-xs font-bold text-slate-400">
                    RENT CYCLE
                  </p>

                  {roomEditing ? (
                    <input
                      type="text"
                      name="rentCycle"
                      value={
                        roomData.rentCycle
                      }
                      onChange={
                        handleRoomChange
                      }
                      placeholder="15 → 14"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                    />
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {roomData.rentCycle ||
                        "Not set"}
                    </p>
                  )}

                </div>

                {/* Deposit */}

                <div className="rounded-2xl border border-violet-100 bg-white p-4">

                  <p className="text-xs font-bold text-slate-400">
                    DEPOSIT
                  </p>

                  {roomEditing ? (
                    <input
                      type="number"
                      name="deposit"
                      value={
                        roomData.deposit
                      }
                      onChange={
                        handleRoomChange
                      }
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                    />
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      ₹
                      {Number(
                        roomData.deposit ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}

                </div>

              </div>

              {/* Facilities */}

              <div className="mt-6 rounded-2xl border border-violet-100 bg-white p-4">

                <p className="mb-3 text-xs font-bold text-slate-400">
                  FACILITIES
                </p>

                <div className="flex flex-wrap gap-2">

                  {roomData.facilities.length >
                  0 ? (
                    roomData.facilities.map(
                      (facility) => (
                        <span
                          key={
                            facility
                          }
                          className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700"
                        >
                          {facility}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-sm text-slate-400">
                      No facilities
                      added
                    </span>
                  )}

                </div>

              </div>

            </section>

            {/* BILLING */}

            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                    Payments &
                    Utilities
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Billing Details
                  </h3>

                </div>

                <button
                  onClick={() =>
                    billingEditing
                      ? saveBillingDetails()
                      : setBillingEditing(
                          true
                        )
                  }
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    billingEditing
                      ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                      : "bg-white text-emerald-600 shadow-sm hover:bg-emerald-100"
                  }`}
                >
                  {billingEditing
                    ? "Save"
                    : "Edit"}
                </button>

              </div>

              {/* Running month */}

              <div className="mt-7 rounded-2xl border border-emerald-100 bg-white p-4">

                <p className="text-xs font-bold text-slate-400">
                  RUNNING MONTH
                </p>

                <p className="mt-1 text-lg font-bold text-slate-800">
                  {getCurrentMonthLabel()}
                </p>

              </div>

              {/* Total Rent */}

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5">

                <div className="flex items-center justify-between">

                  <p className="font-bold text-slate-800">
                    💰 Total Rent
                  </p>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Monthly
                  </span>

                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  {/* Paid date */}

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      PAID DATE
                    </p>

                    {billingEditing ? (
                      <input
                        type="date"
                        name="paidDate"
                        max={getTodayInputValue()}
                        value={
                          getDateInputValue(
                            billingData.paidDate
                          )
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {billingData.paidDate ||
                          "Not paid"}
                      </p>
                    )}

                  </div>

                  {/* Paid amount */}

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      PAID AMOUNT
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="paidAmount"
                        value={
                          billingData.paidAmount
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        ₹
                        {Number(
                          billingData.paidAmount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}

                  </div>

                  {/* Due */}

                  <div>

                    {billingEditing ? (
                      <>
                        <p className="text-xs font-bold text-red-400">
                          DUE AMOUNT
                        </p>

                        <input
                          type="number"
                          name="dueAmount"
                          value={
                            billingData.dueAmount
                          }
                          onChange={
                            handleBillingChange
                          }
                          className="mt-2 w-full rounded-lg border border-red-100 bg-red-50 px-2 py-2 text-sm text-slate-800"
                        />
                      </>
                    ) : (
                      Number(
                        billingData.dueAmount || 0
                      ) > 0 && (
                        <>
                          <p className="text-xs font-bold text-red-400">
                            DUE AMOUNT
                          </p>

                          <p className="mt-1 text-sm font-bold text-red-600">
                            ₹
                            {Number(
                              billingData.dueAmount
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* Electricity */}

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5">

                <div className="flex items-center justify-between">

                  <p className="font-bold text-slate-800">
                    ⚡ Electricity
                  </p>

                  {billingEditing ? (
                    <input
                      type="number"
                      name="electricityBill"
                      value={
                        billingData.electricityBill
                      }
                      onChange={
                        handleBillingChange
                      }
                      placeholder="Bill amount"
                      className="w-32 rounded-lg border border-slate-200 bg-white px-2 py-2 text-right text-sm text-slate-800"
                    />
                  ) : (
                    <p className="font-bold text-slate-800">
                      ₹
                      {Number(
                        billingData.electricityBill ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      CURRENT READING
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="electricityReading"
                        value={
                          billingData.electricityReading
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold">
                        {billingData.electricityReading ||
                          "—"}
                      </p>
                    )}

                  </div>

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      UNITS USED
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="electricityUnits"
                        value={
                          billingData.electricityUnits
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold">
                        {billingData.electricityUnits ||
                          "—"}
                      </p>
                    )}

                  </div>

                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Bill Amount: ₹
                  {Number(
                    billingData.electricityBill ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

              {/* Water */}

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5">

                <div className="flex items-center justify-between">

                  <p className="font-bold text-slate-800">
                    💧 Water
                  </p>

                  {billingEditing ? (
                    <input
                      type="number"
                      name="waterBill"
                      value={
                        billingData.waterBill
                      }
                      onChange={
                        handleBillingChange
                      }
                      placeholder="Bill amount"
                      className="w-32 rounded-lg border border-slate-200 bg-white px-2 py-2 text-right text-sm text-slate-800"
                    />
                  ) : (
                    <p className="font-bold text-slate-800">
                      ₹
                      {Number(
                        billingData.waterBill ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      CURRENT READING
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="waterReading"
                        value={
                          billingData.waterReading
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold">
                        {billingData.waterReading ||
                          "—"}
                      </p>
                    )}

                  </div>

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      UNITS USED
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="waterUnits"
                        value={
                          billingData.waterUnits
                        }
                        onChange={
                          handleBillingChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-semibold">
                        {billingData.waterUnits ||
                          "—"}
                      </p>
                    )}

                  </div>

                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Bill Amount: ₹
                  {Number(
                    billingData.waterBill ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

              {/* Total */}

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-100 p-5">

                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                  Total Monthly Bill
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ₹
                  {(
                    Number(
                      billingData.paidAmount ||
                        0
                    ) +
                    Number(
                      billingData.electricityBill ||
                        0
                    ) +
                    Number(
                      billingData.waterBill ||
                        0
                    )
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">

                  <span>
                    Rent ₹
                    {Number(
                      billingData.paidAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span>
                    Electricity ₹
                    {Number(
                      billingData.electricityBill ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span>
                    Water ₹
                    {Number(
                      billingData.waterBill ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              {/* History buttons */}

              <div className="mt-5 grid grid-cols-3 gap-2">

                <button
                  onClick={() =>
                    setHistory(
                      history ===
                        "rent"
                        ? null
                        : "rent"
                    )
                  }
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history ===
                    "rent"
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                  }`}
                >
                  Rent History
                </button>

                <button
                  onClick={() =>
                    setHistory(
                      history ===
                        "electricity"
                        ? null
                        : "electricity"
                    )
                  }
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history ===
                    "electricity"
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                  }`}
                >
                  Electricity
                </button>

                <button
                  onClick={() =>
                    setHistory(
                      history ===
                        "water"
                        ? null
                        : "water"
                    )
                  }
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history ===
                    "water"
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                  }`}
                >
                  Water History
                </button>

              </div>

              {/* History */}

              {renderHistory()}

            </section>

          </div>

        </div>

        {/* Delete */}

        <div className="flex shrink-0 items-center border-t border-slate-200 bg-white px-7 py-4">

          <button
            onClick={() =>
              setShowDeleteWarning(
                true
              )
            }
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            Delete Room
          </button>

        </div>

      </div>

      {/* Delete warning */}

      {showDeleteWarning && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
              ⚠️
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Delete Room?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to
              delete Room{" "}
              {room.number}? All stored
              information for this room
              will be removed.
            </p>

            <div className="mt-7 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDeleteWarning(
                    false
                  )
                }
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                No, Keep Room
              </button>

              <button
                onClick={
                  confirmDelete
                }
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default RoomCard;