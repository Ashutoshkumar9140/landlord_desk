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

  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
};

// ........................................... Get Current Billing ...........................................
const getCurrentBillingRecord = (room) => {
  const currentMonth = getCurrentMonthLabel();
  const currentMonthKey = getMonthKey(currentMonth);
  const history = Array.isArray(room.billingHistory) ? room.billingHistory : [];

  const currentRecord = history.find(
    (item) => getMonthKey(item?.month) === currentMonthKey,
  );

  return currentRecord || null;
};

// ........................................... Get Today's Date ...........................................
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

  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(parsed.getDate()).padStart(2, "0")}`;
};

function RoomCard({ room, expanded, onToggle, onUpdate, onDelete }) {
  const [roomEditing, setRoomEditing] = useState(room.status === "Draft");
  const [billingEditing, setBillingEditing] = useState(false);
  const [history, setHistory] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const fileInputRefs = useRef({});

  const [roomData, setRoomData] = useState({
    number: room.number || "",
    tenants: room.tenants || [],
    rent: room.rent || "",
    livingSince: room.livingSince || "",
    rentCycle: room.rentCycle || "",
    deposit: room.deposit || "",
    facilities: room.facilities || [],
    status: room.status || "Draft",
  });

  const currentBillingRecord = getCurrentBillingRecord(room);

  const [billingData, setBillingData] = useState({
    month: getCurrentMonthLabel(),
    paidDate: currentBillingRecord?.rent?.paidDate || "",
    paidAmount: currentBillingRecord?.rent?.paidAmount ?? "",
    dueAmount: currentBillingRecord?.rent?.dueAmount ?? "",
    electricityReading: currentBillingRecord?.electricity?.reading ?? "",
    electricityUnits: currentBillingRecord?.electricity?.units ?? "",
    electricityBill: currentBillingRecord?.electricity?.bill ?? "",
    waterReading: currentBillingRecord?.water?.reading ?? "",
    waterUnits: currentBillingRecord?.water?.units ?? "",
    waterBill: currentBillingRecord?.water?.bill ?? "",
  });

  const [lastOpened, setLastOpened] = useState(
    room.lastOpened || "Not opened yet",
  );

  // ........................................... Update Room Data ...........................................
  /*
    Update local states when room
    changes from Dashboard
  */
  useEffect(() => {
    setRoomData({
      number: room.number || "",
      tenants: room.tenants || [],
      rent: room.rent || "",
      livingSince: room.livingSince || "",
      rentCycle: room.rentCycle || "",
      deposit: room.deposit || "",
      facilities: room.facilities || [],
      status: room.status || "Draft",
    });

    const currentBillingRecord = getCurrentBillingRecord(room);

    setBillingData({
      month: getCurrentMonthLabel(),
      paidDate: currentBillingRecord?.rent?.paidDate || "",
      paidAmount: currentBillingRecord?.rent?.paidAmount ?? "",
      dueAmount: currentBillingRecord?.rent?.dueAmount ?? "",
      electricityReading: currentBillingRecord?.electricity?.reading ?? "",
      electricityUnits: currentBillingRecord?.electricity?.units ?? "",
      electricityBill: currentBillingRecord?.electricity?.bill ?? "",
      waterReading: currentBillingRecord?.water?.reading ?? "",
      waterUnits: currentBillingRecord?.water?.units ?? "",
      waterBill: currentBillingRecord?.water?.bill ?? "",
    });

    setLastOpened(room.lastOpened || "Not opened yet");
  }, [room]);

  // ........................................... Last Opened ...........................................
  useEffect(() => {
    if (!expanded) return;

    const now = new Date();

    const formattedDate = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setLastOpened(formattedDate);

    onUpdate({
      ...room,
      lastOpened: formattedDate,
    });
  }, [expanded]);

  // ........................................... Room Input ...........................................
  const handleRoomChange = (event) => {
    const { name, value } = event.target;

    setRoomData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ........................................... Billing Input ...........................................
  const handleBillingChange = (event) => {
    const { name, value } = event.target;

    setBillingData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ........................................... Tenant Input ...........................................
  const handleTenantChange = (tenantId, field, value) => {
    setRoomData((previous) => ({
      ...previous,
      tenants: previous.tenants.map((tenant) =>
        tenant.id === tenantId
          ? {
              ...tenant,
              [field]: value,
            }
          : tenant,
      ),
    }));
  };

  // ........................................... Add Tenant ...........................................
  const addTenant = () => {
    setRoomData((previous) => ({
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
    }));
  };

  // ........................................... Remove Tenant ...........................................
  const removeTenant = (tenantId) => {
    setRoomData((previous) => ({
      ...previous,
      tenants: previous.tenants.filter((tenant) => tenant.id !== tenantId),
    }));
  };

  // ........................................... Identity Picker ...........................................
  const handleIdentityClick = (tenantId) => {
    const input = fileInputRefs.current[tenantId];

    if (input) {
      input.click();
    }
  };

  const handleIdentityChange = (tenantId, event) => {
    const file = event.target.files?.[0];

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

    setRoomData((previous) => ({
      ...previous,
      tenants: previous.tenants.map((tenant) =>
        tenant.id === tenantId
          ? {
              ...tenant,
              identity: identityData,
            }
          : tenant,
      ),
    }));
  };

  // ........................................... Save Room Details ...........................................
  const saveRoomDetails = () => {
    const updatedRoom = {
      ...room,
      ...roomData,
      tenant: roomData.tenants
        .map((tenant) => tenant.name)
        .filter(Boolean)
        .join(", "),
      status: roomData.tenants.length > 0 ? "Occupied" : "Vacant",
      lastOpened,
    };

    onUpdate(updatedRoom);
    setRoomEditing(false);
  };

  // ........................................... Save Billing and History ...........................................
  const saveBillingDetails = () => {
    // The running month is always derived from the real current date.
    // The landlord does not manually type the month.
    const currentMonth = getCurrentMonthLabel();

    const newHistoryRecord = {
      month: currentMonth,
      rent: {
        paidDate: getDateInputValue(billingData.paidDate),
        paidAmount: billingData.paidAmount,
        dueAmount: billingData.dueAmount,
      },
      electricity: {
        reading: billingData.electricityReading,
        units: billingData.electricityUnits,
        bill: billingData.electricityBill,
      },
      water: {
        reading: billingData.waterReading,
        units: billingData.waterUnits,
        bill: billingData.waterBill,
      },
    };

    // ........................................... Get Existing History ...........................................
    const existingHistory = Array.isArray(room.billingHistory)
      ? room.billingHistory
      : [];

    // ........................................... Check Current Month ...........................................
    const existingIndex = existingHistory.findIndex(
      (item) => item.month.toLowerCase() === currentMonth.toLowerCase(),
    );

    let updatedHistory;

    if (existingIndex !== -1) {
      // Update existing month
      updatedHistory = [...existingHistory];
      updatedHistory[existingIndex] = newHistoryRecord;
    } else {
      // Add new month
      updatedHistory = [...existingHistory, newHistoryRecord];
    }

    // ........................................... Sort Billing History ...........................................
    /*
      Keep history ordered from
      newest month to oldest month.
      This handles:
      January
      February
      March
      etc.
    */
    const sortedHistory = [...updatedHistory].sort(
      (a, b) => new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`),
    );

    const updatedRoom = {
      ...room,
      ...roomData,
      ...billingData,
      paidDate: getDateInputValue(billingData.paidDate),
      tenant: roomData.tenants
        .map((tenant) => tenant.name)
        .filter(Boolean)
        .join(", "),
      status: roomData.tenants.length > 0 ? "Occupied" : "Vacant",
      billingHistory: sortedHistory,
      lastOpened,
    };

    // ........................................... Update Dashboard ...........................................
    /*
      Update Dashboard state.
      Dashboard automatically saves
      this to localStorage.
    */
    onUpdate(updatedRoom);
    setBillingEditing(false);
  };

  // ........................................... Delete Room ...........................................
  const confirmDelete = () => {
    onDelete(room.id);
    setShowDeleteWarning(false);
  };

  // ........................................... Get Billing History ...........................................
  const billingHistory = Array.isArray(room.billingHistory)
    ? room.billingHistory
    : [];

  // ........................................... Latest 5 Months ...........................................
  const latestHistory = [...billingHistory]
    .sort((a, b) => new Date(`1 ${b.month}`) - new Date(`1 ${a.month}`))
    .slice(0, 5);

  // ........................................... Render History ...........................................
  const renderHistory = () => {
    if (!history) {
      return null;
    }

    return (
      <div className="shadow-sm border-slate-200 bg-white p-5 mt-5 rounded-2xl border">
        <div className="mb-4 justify-between items-center flex">
          <h4 className="text-base font-bold text-slate-800">
            {history === "rent" && "Rent History"}
            {history === "electricity" && "Electricity History"}
            {history === "water" && "Water History"}
          </h4>

          <button
            onClick={() => setHistory(null)}
            className="flex justify-center text-xl items-center transition rounded-full hover:text-slate-700 h-8 hover:bg-slate-100 w-8 text-slate-400"
          >
            ×
          </button>
        </div>

        {/* ........................................... Rent History ........................................... */}
        {history === "rent" && (
          <div className="overflow-x-auto">
            <div className="min-w-[650px]">
              <div className="grid text-xs tracking-wide rounded-xl bg-slate-50 uppercase font-bold text-slate-400 grid-cols-4 px-4 py-3">
                <span>Month</span>
                <span>Paid Date</span>
                <span>Paid Amount</span>
                <span>Due Amount</span>
              </div>

              {latestHistory.length === 0 ? (
                <p className="p-5 text-slate-400 text-sm">
                  No rent history yet.
                </p>
              ) : (
                latestHistory.map((item) => (
                  <div
                    key={item.month}
                    className="border-b grid py-3 grid-cols-4 text-sm last:border-0 border-slate-100 px-4"
                  >
                    <span className="font-semibold text-slate-700">
                      {item.month}
                    </span>

                    <span className="text-slate-500">
                      {item.rent?.paidDate || "Not paid"}
                    </span>

                    <span className="font-bold text-slate-800">
                      ₹
                      {Number(item.rent?.paidAmount || 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>

                    <span className="text-red-500 font-bold">
                      ₹
                      {Number(item.rent?.dueAmount || 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ........................................... Electricity History ........................................... */}
        {history === "electricity" && (
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="py-3 uppercase px-4 text-xs text-slate-400 tracking-wide rounded-xl grid bg-slate-50 font-bold grid-cols-4">
                <span>Month</span>
                <span>Reading</span>
                <span>Units Used</span>
                <span>Bill Amount</span>
              </div>

              {latestHistory.length === 0 ? (
                <p className="text-sm text-slate-400 p-5">
                  No electricity history yet.
                </p>
              ) : (
                latestHistory.map((item) => (
                  <div
                    key={item.month}
                    className="last:border-0 px-4 border-slate-100 grid border-b text-sm py-3 grid-cols-4"
                  >
                    <span className="text-slate-700 font-semibold">
                      {item.month}
                    </span>

                    <span className="text-slate-500">
                      {item.electricity?.reading || "—"}
                    </span>

                    <span className="text-slate-500">
                      {item.electricity?.units || "—"}
                    </span>

                    <span className="text-slate-800 font-bold">
                      ₹
                      {Number(item.electricity?.bill || 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ........................................... Water History ........................................... */}
        {history === "water" && (
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="font-bold text-slate-400 text-xs py-3 grid bg-slate-50 px-4 tracking-wide uppercase grid-cols-4 rounded-xl">
                <span>Month</span>
                <span>Reading</span>
                <span>Units Used</span>
                <span>Bill Amount</span>
              </div>

              {latestHistory.length === 0 ? (
                <p className="text-sm p-5 text-slate-400">
                  No water history yet.
                </p>
              ) : (
                latestHistory.map((item) => (
                  <div
                    key={item.month}
                    className="last:border-0 px-4 grid-cols-4 border-b border-slate-100 py-3 text-sm grid"
                  >
                    <span className="text-slate-700 font-semibold">
                      {item.month}
                    </span>

                    <span className="text-slate-500">
                      {item.water?.reading || "—"}
                    </span>

                    <span className="text-slate-500">
                      {item.water?.units || "—"}
                    </span>

                    <span className="text-slate-800 font-bold">
                      ₹{Number(item.water?.bill || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ........................................... Collapsed Room Card ...........................................
  const currentDisplayRecord = getCurrentBillingRecord(room);

  if (!expanded) {
    return (
      <button
        onClick={onToggle}
        className="shadow-sm w-full rounded-3xl border-slate-200 text-left bg-white transition p-5 border duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="justify-between gap-4 items-start flex">
          <div>
            <p className="font-semibold text-xs uppercase tracking-widest text-slate-400">
              Room
            </p>

            <h2 className="text-slate-900 font-bold text-2xl mt-1">
              {room.number}
            </h2>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              room.status === "Occupied"
                ? "bg-emerald-100 text-emerald-700"
                : room.status === "Draft"
                  ? "text-amber-700 bg-amber-100"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            ● {room.status}
          </span>
        </div>

        {/* ........................................... Tenants ........................................... */}
        <div className="mt-5">
          {room.tenants && room.tenants.length > 0 ? (
            <div className="space-y-1">
              {room.tenants.map((tenant) => (
                <p
                  key={tenant.id}
                  className="text-slate-800 font-semibold text-sm"
                >
                  {tenant.name}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 font-semibold text-sm">
              No tenant added
            </p>
          )}
        </div>

        {/* ........................................... Important Information ........................................... */}
        <div className="grid-cols-2 mt-5 gap-x-5 pt-4 border-slate-100 gap-y-4 border-t grid">
          <div>
            <p className="text-xs text-slate-400">RENT CYCLE</p>

            <p className="mt-1 font-semibold text-slate-700 text-sm">
              {room.rentCycle || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">LAST RENT</p>

            <p className="mt-1 text-slate-700 text-sm font-semibold">
              {currentDisplayRecord?.rent?.paidAmount
                ? `₹${Number(
                    currentDisplayRecord.rent.paidAmount,
                  ).toLocaleString("en-IN")}`
                : "Not paid"}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">PAID ON</p>

            <p className="font-semibold text-slate-700 mt-1 text-sm">
              {currentDisplayRecord?.rent?.paidDate || "—"}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-xs">LAST OPENED</p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {room.lastOpened || "Not opened"}
            </p>
          </div>

          {Number(currentDisplayRecord?.rent?.dueAmount || 0) > 0 && (
            <div className="col-span-2 bg-red-50 px-3 py-2 rounded-xl">
              <div className="justify-between items-center flex">
                <span className="text-red-500 font-bold text-xs">RENT DUE</span>

                <span className="text-red-600 text-sm font-bold">
                  ₹{Number(room.dueAmount).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}
        </div>
      </button>
    );
  }

  // .................. Expanded Room ...........................................
  return (
    <>
{/* ................................. Overlay ........................................... */}
      <div
        className="inset-0 backdrop-blur-sm bg-slate-950/60 z-40 fixed"
        onClick={onToggle}
      />

{/* ................................Expanded Room Window........................................... */}
      <div className="bg-slate-100 flex -translate-y-1/2 border left-1/2 w-[80vw] rounded-3xl h-[80vh] shadow-2xl top-1/2 -translate-x-1/2 overflow-hidden border-slate-200 z-50 fixed flex-col">
   {/* ........................................... Header ........................................... */}
        <div className="bg-white border-slate-200 justify-between px-7 flex shrink-0 items-center py-5 border-b">
          <div>
            <div className="items-center gap-3 flex">
              <h2 className="font-bold text-slate-900 text-2xl">
                Room {room.number}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  room.status === "Occupied"
                    ? "bg-emerald-100 text-emerald-700"
                    : room.status === "Draft"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {room.status}
              </span>
            </div>

            <p className="text-sm mt-1 text-slate-500">
              {room.tenant || "New room"}
            </p>
          </div>

          <button
            onClick={onToggle}
            className="transition bg-slate-100 text-slate-500 rounded-full justify-center hover:text-slate-800 hover:bg-slate-200 flex items-center h-10 text-2xl w-10"
          >
            ×
          </button>
        </div>

{/* ................. Room Content ........................................... */}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="gap-7 grid grid-cols-1 lg:grid-cols-2">
{/* ........................................... Room and Tenant Details ........................... */}

            <section className="border border-violet-200 p-6 shadow-sm bg-violet-50 rounded-3xl">
              <div className="gap-4 justify-between items-start flex">
                <div>
                  <p className="uppercase text-violet-500 text-xs font-bold tracking-widest">
                    People & Room
                  </p>

                  <h3 className="mt-1 font-bold text-slate-900 text-xl">
                    Room/Tenant Details
                  </h3>
                </div>

                <button
                  onClick={() =>
                    roomEditing ? saveRoomDetails() : setRoomEditing(true)
                  }
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    roomEditing
                      ? "hover:bg-violet-700 shadow-md bg-violet-600 text-white"
                      : "shadow-sm hover:bg-violet-100 text-violet-600 bg-white"
                  }`}
                >
                  {roomEditing ? "Save" : "Edit"}
                </button>
              </div>

{/* ................................. Tenants ....................................... */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-bold text-slate-600">Tenants</p>

                <div className="space-y-3">
                  {roomData.tenants.map((tenant, index) => (
                    <div
                      key={tenant.id}
                      className="shadow-sm bg-white border p-4 border-violet-100 rounded-2xl"
                    >
                      <div className="grid-cols-1 grid sm:grid-cols-[1fr_110px_auto] sm:items-center gap-3">
                        {/* Name */}
                        <div className="items-center flex gap-3 min-w-0">
                          <span className="rounded-full w-10 bg-violet-100 justify-center h-10 flex shrink-0 items-center">
                            👤
                          </span>

                          {roomEditing ? (
                            <input
                              type="text"
                              value={tenant.name}
                              onChange={(event) =>
                                handleTenantChange(
                                  tenant.id,
                                  "name",
                                  event.target.value,
                                )
                              }
                              placeholder="Tenant name"
                              className="outline-none py-2 rounded-lg w-full border-slate-200 bg-white text-sm border px-3 focus:border-violet-400 min-w-0 text-slate-800"
                            />
                          ) : (
                            <span className="text-sm truncate font-semibold text-slate-700">
                              {tenant.name || `Tenant ${index + 1}`}
                            </span>
                          )}
                        </div>

                        {/* Gender */}
                        {roomEditing ? (
                          <select
                            value={tenant.gender}
                            onChange={(event) =>
                              handleTenantChange(
                                tenant.id,
                                "gender",
                                event.target.value,
                              )
                            }
                            className="focus:border-violet-400 outline-none border bg-white text-sm border-slate-200 py-2 px-3 text-slate-800 rounded-lg"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        ) : (
                          <span className="text-sm text-slate-500">
                            {tenant.gender}
                          </span>
                        )}

                        {/* Identity */}
                        <div className="items-center gap-2 flex">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            ref={(element) => {
                              fileInputRefs.current[tenant.id] = element;
                            }}
                            onChange={(event) =>
                              handleIdentityChange(tenant.id, event)
                            }
                          />

                          <button
                            type="button"
                            onClick={() => handleIdentityClick(tenant.id)}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              tenant.identity
                                ? "bg-emerald-100 text-emerald-700"
                                : "border text-slate-600 bg-white hover:bg-slate-50 border-slate-200"
                            }`}
                          >
                            {tenant.identity ? "✓ ID Added" : "📎 Identity"}
                          </button>

                          {roomEditing && (
                            <button
                              type="button"
                              onClick={() => removeTenant(tenant.id)}
                              className="py-2 hover:bg-red-50 rounded-lg text-red-500 px-2 text-sm"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {tenant.identity && (
                        <p className="mt-2 pl-12 text-xs truncate text-slate-400">
                          {tenant.identity.name}
                        </p>
                      )}
                    </div>
                  ))}

                  {roomEditing && (
                    <button
                      type="button"
                      onClick={addTenant}
                      className="w-full text-violet-600 border-violet-300 text-sm border-dashed transition font-bold py-3 bg-white rounded-xl border hover:bg-violet-50"
                    >
                      + Add Person
                    </button>
                  )}
                </div>
              </div>

  {/* ........................................... Room Information.................................. */}
              <div className="gap-3 grid-cols-2 grid mt-6">
                {/* Living */}
                <div className="border border-violet-100 p-4 rounded-2xl bg-white">
                  <p className="font-bold text-slate-400 text-xs">
                    LIVING SINCE
                  </p>

                  {roomEditing ? (
                    <input
                      type="date"
                      name="livingSince"
                      value={roomData.livingSince}
                      onChange={handleRoomChange}
                      className="mt-2 text-slate-800 rounded-lg border-slate-200 py-2 w-full text-sm px-2 border bg-white"
                    />
                  ) : (
                    <p className="mt-2 text-slate-700 text-sm font-semibold">
                      {roomData.livingSince || "Not added"}
                    </p>
                  )}
                </div>

                {/* Rent */}
                <div className="bg-white rounded-2xl border-violet-100 border p-4">
                  <p className="font-bold text-xs text-slate-400">
                    MONTHLY RENT
                  </p>

                  {roomEditing ? (
                    <input
                      type="number"
                      name="rent"
                      value={roomData.rent}
                      onChange={handleRoomChange}
                      className="py-2 text-slate-800 text-sm border-slate-200 bg-white mt-2 w-full px-2 border rounded-lg"
                    />
                  ) : (
                    <p className="mt-2 text-slate-700 text-sm font-semibold">
                      ₹{Number(roomData.rent || 0).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                {/* Cycle */}
                <div className="p-4 rounded-2xl border-violet-100 border bg-white">
                  <p className="font-bold text-xs text-slate-400">RENT CYCLE</p>

                  {roomEditing ? (
                    <input
                      type="text"
                      name="rentCycle"
                      value={roomData.rentCycle}
                      onChange={handleRoomChange}
                      placeholder="15 → 14"
                      className="px-2 text-slate-800 border text-sm border-slate-200 bg-white rounded-lg py-2 w-full mt-2"
                    />
                  ) : (
                    <p className="text-sm font-semibold mt-2 text-slate-700">
                      {roomData.rentCycle || "Not set"}
                    </p>
                  )}
                </div>

                {/* Deposit */}
                <div className="rounded-2xl border-violet-100 p-4 border bg-white">
                  <p className="text-xs font-bold text-slate-400">DEPOSIT</p>

                  {roomEditing ? (
                    <input
                      type="number"
                      name="deposit"
                      value={roomData.deposit}
                      onChange={handleRoomChange}
                      className="bg-white border-slate-200 mt-2 border w-full py-2 px-2 text-slate-800 text-sm rounded-lg"
                    />
                  ) : (
                    <p className="mt-2 text-sm text-slate-700 font-semibold">
                      ₹{Number(roomData.deposit || 0).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>

{/* ...........................................Facilities........................................... */}
              <div className="mt-6 border rounded-2xl bg-white p-4 border-violet-100">
                <p className="text-slate-400 mb-3 text-xs font-bold">
                  FACILITIES
                </p>

                <div className="flex gap-2 flex-wrap">
                  {roomData.facilities.length > 0 ? (
                    roomData.facilities.map((facility) => (
                      <span
                        key={facility}
                        className="font-semibold bg-violet-100 rounded-full px-3 py-1.5 text-xs text-violet-700"
                      >
                        {facility}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-sm">
                      No facilities added
                    </span>
                  )}
                </div>
              </div>
            </section>

{/* ....................................... Billing Details ........................................... */}
            <section className="p-6 border-emerald-200 shadow-sm bg-emerald-50 rounded-3xl border">
              <div className="gap-4 flex justify-between items-start">
                <div>
                  <p className="uppercase tracking-widest text-emerald-500 font-bold text-xs">
                    Payments & Utilities
                  </p>

                  <h3 className="mt-1 font-bold text-slate-900 text-xl">
                    Billing Details
                  </h3>
                </div>

                <button
                  onClick={() =>
                    billingEditing
                      ? saveBillingDetails()
                      : setBillingEditing(true)
                  }
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    billingEditing
                      ? "shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "shadow-sm hover:bg-emerald-100 bg-white text-emerald-600"
                  }`}
                >
                  {billingEditing ? "Save" : "Edit"}
                </button>
              </div>

{/* ....................................... Running Month ........................................... */}
              <div className="border-emerald-100 rounded-2xl bg-white p-4 mt-7 border">
                <p className="font-bold text-slate-400 text-xs">
                  RUNNING MONTH
                </p>

                <p className="text-lg text-slate-800 mt-1 font-bold">
                  {getCurrentMonthLabel()}
                </p>
              </div>

{/* ..................................... Total Rent ........................................... */}
              <div className="p-5 border-emerald-100 border rounded-2xl mt-4 bg-white">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-slate-800">💰 Total Rent</p>

                  <span className="bg-emerald-50 text-xs py-1 px-3 text-emerald-600 rounded-full font-semibold">
                    Monthly
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 grid-cols-1 mt-5 gap-4">
                  {/* Paid date */}
                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      PAID DATE
                    </p>

                    {billingEditing ? (
                      <input
                        type="date"
                        name="paidDate"
                        max={getTodayInputValue()}
                        value={getDateInputValue(billingData.paidDate)}
                        onChange={handleBillingChange}
                        className="border w-full py-2 rounded-lg px-2 text-slate-800 text-sm border-slate-200 mt-2 bg-white"
                      />
                    ) : (
                      <p className="text-slate-700 text-sm mt-1 font-semibold">
                        {billingData.paidDate || "Not paid"}
                      </p>
                    )}
                  </div>

                  {/* Paid amount */}
                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      PAID AMOUNT
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="paidAmount"
                        value={billingData.paidAmount}
                        onChange={handleBillingChange}
                        className="px-2 rounded-lg text-slate-800 bg-white py-2 text-sm border-slate-200 mt-2 border w-full"
                      />
                    ) : (
                      <p className="font-bold mt-1 text-slate-800 text-sm">
                        ₹
                        {Number(billingData.paidAmount || 0).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    )}
                  </div>

                  {/* Due */}
                  <div>
                    {billingEditing ? (
                      <>
                        <p className="text-xs text-red-400 font-bold">
                          DUE AMOUNT
                        </p>

                        <input
                          type="number"
                          name="dueAmount"
                          value={billingData.dueAmount}
                          onChange={handleBillingChange}
                          className="border text-sm px-2 rounded-lg py-2 mt-2 bg-red-50 w-full text-slate-800 border-red-100"
                        />
                      </>
                    ) : (
                      Number(billingData.dueAmount || 0) > 0 && (
                        <>
                          <p className="text-red-400 font-bold text-xs">
                            DUE AMOUNT
                          </p>

                          <p className="mt-1 text-sm text-red-600 font-bold">
                            ₹
                            {Number(billingData.dueAmount).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>

{/* ........................................Electricity.................................................. */}
              <div className="p-5 bg-white rounded-2xl border border-emerald-100 mt-4">
                <div className="items-center flex justify-between">
                  <p className="text-slate-800 font-bold">⚡ Electricity</p>

                  {billingEditing ? (
                    <input
                      type="number"
                      name="electricityBill"
                      value={billingData.electricityBill}
                      onChange={handleBillingChange}
                      placeholder="Bill amount"
                      className="border-slate-200 bg-white w-32 rounded-lg text-slate-800 text-sm text-right py-2 px-2 border"
                    />
                  ) : (
                    <p className="text-slate-800 font-bold">
                      ₹
                      {Number(billingData.electricityBill || 0).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  )}
                </div>

                <div className="grid-cols-2 mt-4 grid gap-3">
                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      CURRENT READING
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="electricityReading"
                        value={billingData.electricityReading}
                        onChange={handleBillingChange}
                        className="mt-2 border py-2 text-slate-800 w-full bg-white px-2 rounded-lg border-slate-200 text-sm"
                      />
                    ) : (
                      <p className="mt-1 font-semibold text-sm">
                        {billingData.electricityReading || "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      UNITS USED
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="electricityUnits"
                        value={billingData.electricityUnits}
                        onChange={handleBillingChange}
                        className="text-sm rounded-lg w-full py-2 border-slate-200 bg-white border px-2 mt-2 text-slate-800"
                      />
                    ) : (
                      <p className="text-sm mt-1 font-semibold">
                        {billingData.electricityUnits || "—"}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-slate-400 mt-3 text-xs">
                  Bill Amount: ₹
                  {Number(billingData.electricityBill || 0).toLocaleString(
                    "en-IN",
                  )}
                </p>
              </div>

{/* ...........................................Water...................................... */}
              <div className="p-5 mt-4 border bg-white rounded-2xl border-emerald-100">
                <div className="justify-between flex items-center">
                  <p className="font-bold text-slate-800">💧 Water</p>

                  {billingEditing ? (
                    <input
                      type="number"
                      name="waterBill"
                      value={billingData.waterBill}
                      onChange={handleBillingChange}
                      placeholder="Bill amount"
                      className="rounded-lg border text-right text-slate-800 text-sm w-32 px-2 border-slate-200 py-2 bg-white"
                    />
                  ) : (
                    <p className="text-slate-800 font-bold">
                      ₹
                      {Number(billingData.waterBill || 0).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 grid-cols-2 mt-4">
                  <div>
                    <p className="text-slate-400 text-xs font-bold">
                      CURRENT READING
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="waterReading"
                        value={billingData.waterReading}
                        onChange={handleBillingChange}
                        className="mt-2 border px-2 w-full bg-white text-slate-800 text-sm py-2 rounded-lg border-slate-200"
                      />
                    ) : (
                      <p className="font-semibold text-sm mt-1">
                        {billingData.waterReading || "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      UNITS USED
                    </p>

                    {billingEditing ? (
                      <input
                        type="number"
                        name="waterUnits"
                        value={billingData.waterUnits}
                        onChange={handleBillingChange}
                        className="bg-white text-slate-800 text-sm px-2 py-2 rounded-lg border-slate-200 border mt-2 w-full"
                      />
                    ) : (
                      <p className="font-semibold text-sm mt-1">
                        {billingData.waterUnits || "—"}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Bill Amount: ₹
                  {Number(billingData.waterBill || 0).toLocaleString("en-IN")}
                </p>
              </div>

{/* ...........................................Total Monthly Bill....................................... */}
              <div className="border rounded-2xl p-5 border-emerald-200 bg-emerald-100 mt-4">
                <p className="tracking-wide font-bold uppercase text-emerald-700 text-xs">
                  Total Monthly Bill
                </p>

                <p className="mt-1 text-3xl text-slate-900 font-bold">
                  ₹
                  {(
                    Number(billingData.paidAmount || 0) +
                    Number(billingData.electricityBill || 0) +
                    Number(billingData.waterBill || 0)
                  ).toLocaleString("en-IN")}
                </p>

                <div className="text-xs grid-cols-3 grid mt-4 gap-2 text-slate-600">
                  <span>
                    Rent ₹
                    {Number(billingData.paidAmount || 0).toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  <span>
                    Electricity ₹
                    {Number(billingData.electricityBill || 0).toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  <span>
                    Water ₹
                    {Number(billingData.waterBill || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

{/* .................................... History Buttons ........................................... */}
              <div className="grid-cols-3 gap-2 grid mt-5">
                <button
                  onClick={() => setHistory(history === "rent" ? null : "rent")}
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history === "rent"
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"
                  }`}
                >
                  Rent History
                </button>

                <button
                  onClick={() =>
                    setHistory(history === "electricity" ? null : "electricity")
                  }
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history === "electricity"
                      ? "bg-slate-800 text-white"
                      : "bg-white shadow-sm text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Electricity
                </button>

                <button
                  onClick={() =>
                    setHistory(history === "water" ? null : "water")
                  }
                  className={`rounded-xl px-2 py-3 text-xs font-bold transition ${
                    history === "water"
                      ? "text-white bg-slate-800"
                      : "text-slate-600 shadow-sm hover:bg-slate-100 bg-white"
                  }`}
                >
                  Water History
                </button>
              </div>

{/* .................................... History ........................................... */}
              {renderHistory()}
            </section>
          </div>
        </div>

{/* ........................................... Delete Room ........................................... */}
        <div className="border-t flex shrink-0 bg-white border-slate-200 items-center px-7 py-4">
          <button
            onClick={() => setShowDeleteWarning(true)}
            className="text-sm text-red-500 font-bold px-4 py-2.5 transition rounded-xl hover:bg-red-50"
          >
            Delete Room
          </button>
        </div>
      </div>

{/* ..................................... Delete Warning ........................................... */}
      {showDeleteWarning && (
        <div className="z-[70] fixed px-4 inset-0 items-center flex bg-black/60 justify-center">
          <div className="w-full bg-white rounded-3xl max-w-md shadow-2xl p-7">
            <div className="text-xl h-12 rounded-full justify-center bg-red-100 items-center w-12 flex">
              ⚠️
            </div>

            <h3 className="text-xl text-slate-900 mt-5 font-bold">
              Delete Room?
            </h3>

            <p className="leading-6 text-sm mt-2 text-slate-500">
              Are you sure you want to delete Room {room.number}? All stored
              information for this room will be removed.
            </p>

            <div className="gap-3 flex justify-end mt-7">
              <button
                onClick={() => setShowDeleteWarning(false)}
                className="px-5 hover:bg-slate-50 py-2.5 border transition font-semibold border-slate-200 text-slate-600 text-sm rounded-xl"
              >
                No, Keep Room
              </button>

              <button
                onClick={confirmDelete}
                className="transition text-white hover:bg-red-700 text-sm rounded-xl py-2.5 font-semibold px-5 bg-red-600"
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
