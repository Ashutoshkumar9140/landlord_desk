import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import RoomCard from "../components/RoomCard";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import CollectionSummary from "../components/CollectionSummary";
import RoomFilters from "../components/RoomFilters";
import RoomSort from "../components/RoomSort";

const STORAGE_KEY = "landlord_desk_rooms";

const defaultRooms = [
  {
    id: 1,
    number: "01",
    tenant: "Rahul Kumar, Priya Kumar",
    tenants: [
      {
        id: 101,
        name: "Rahul Kumar",
        gender: "Male",
        identity: null,
      },
      {
        id: 102,
        name: "Priya Kumar",
        gender: "Female",
        identity: null,
      },
    ],
    gender: "Male",
    rent: 8000,
    livingSince: "15 August 2026",
    rentCycle: "15 → 14",
    deposit: 16000,
    status: "Occupied",
    facilities: [
      "Fan",
      "Bed",
      "Wi-Fi",
      "Bathroom",
    ],
    month: "October 2026",
    paidDate: "15 August 2026",
    paidAmount: 8000,
    dueAmount: 0,
    electricityReading: 1450,
    electricityUnits: 200,
    electricityBill: 560,
    waterReading: 650,
    waterUnits: 100,
    waterBill: 300,
    lastOpened: "01 Sep, 10:32 AM",
    billingHistory: [
      {
        month: "September 2026",
        rent: {
          paidDate: "15 Sep 2026",
          paidAmount: 8000,
          dueAmount: 0,
        },
        electricity: {
          reading: 1450,
          units: 200,
          bill: 560,
        },
        water: {
          reading: 650,
          units: 100,
          bill: 300,
        },
      },
      {
        month: "August 2026",
        rent: {
          paidDate: "15 Aug 2026",
          paidAmount: 8000,
          dueAmount: 0,
        },
        electricity: {
          reading: 1250,
          units: 180,
          bill: 500,
        },
        water: {
          reading: 550,
          units: 90,
          bill: 270,
        },
      },
      {
        month: "July 2026",
        rent: {
          paidDate: "15 Jul 2026",
          paidAmount: 8000,
          dueAmount: 0,
        },
        electricity: {
          reading: 1070,
          units: 210,
          bill: 590,
        },
        water: {
          reading: 460,
          units: 95,
          bill: 285,
        },
      },
      {
        month: "June 2026",
        rent: {
          paidDate: "15 Jun 2026",
          paidAmount: 8000,
          dueAmount: 0,
        },
        electricity: {
          reading: 860,
          units: 190,
          bill: 530,
        },
        water: {
          reading: 365,
          units: 88,
          bill: 264,
        },
      },
      {
        month: "May 2026",
        rent: {
          paidDate: "15 May 2026",
          paidAmount: 8000,
          dueAmount: 0,
        },
        electricity: {
          reading: 670,
          units: 170,
          bill: 480,
        },
        water: {
          reading: 277,
          units: 85,
          bill: 255,
        },
      },
    ],
  },

  {
    id: 2,
    number: "02",
    tenant: "Amit Sharma",
    tenants: [
      {
        id: 201,
        name: "Amit Sharma",
        gender: "Male",
        identity: null,
      },
    ],
    gender: "Male",
    rent: 7500,
    livingSince: "5 August 2026",
    rentCycle: "5 → 4",
    deposit: 15000,
    status: "Occupied",
    facilities: [
      "Fan",
      "Bed",
      "Cupboard",
    ],
    month: "October 2026",
    paidDate: "5 August 2026",
    paidAmount: 7500,
    dueAmount: 0,
    electricityReading: 1380,
    electricityUnits: 180,
    electricityBill: 520,
    waterReading: 620,
    waterUnits: 90,
    waterBill: 300,
    lastOpened: "01 Sep, 09:20 AM",
    billingHistory: [
      {
        month: "September 2026",
        rent: {
          paidDate: "05 Sep 2026",
          paidAmount: 7500,
          dueAmount: 0,
        },
        electricity: {
          reading: 1380,
          units: 180,
          bill: 520,
        },
        water: {
          reading: 620,
          units: 90,
          bill: 300,
        },
      },
      {
        month: "August 2026",
        rent: {
          paidDate: "05 Aug 2026",
          paidAmount: 7500,
          dueAmount: 0,
        },
        electricity: {
          reading: 1200,
          units: 170,
          bill: 490,
        },
        water: {
          reading: 530,
          units: 85,
          bill: 255,
        },
      },
      {
        month: "July 2026",
        rent: {
          paidDate: "05 Jul 2026",
          paidAmount: 7500,
          dueAmount: 0,
        },
        electricity: {
          reading: 1030,
          units: 160,
          bill: 450,
        },
        water: {
          reading: 445,
          units: 80,
          bill: 240,
        },
      },
      {
        month: "June 2026",
        rent: {
          paidDate: "05 Jun 2026",
          paidAmount: 7500,
          dueAmount: 0,
        },
        electricity: {
          reading: 870,
          units: 155,
          bill: 440,
        },
        water: {
          reading: 365,
          units: 78,
          bill: 234,
        },
      },
      {
        month: "May 2026",
        rent: {
          paidDate: "05 May 2026",
          paidAmount: 7500,
          dueAmount: 0,
        },
        electricity: {
          reading: 715,
          units: 150,
          bill: 420,
        },
        water: {
          reading: 287,
          units: 75,
          bill: 225,
        },
      },
    ],
  },

  {
    id: 3,
    number: "03",
    tenant: "",
    tenants: [],
    gender: "",
    rent: 8000,
    livingSince: "",
    rentCycle: "",
    deposit: "",
    status: "Vacant",
    facilities: [],
    month: "October 2026",
    paidDate: "",
    paidAmount: "",
    dueAmount: 0,
    electricityReading: "",
    electricityUnits: "",
    electricityBill: "",
    waterReading: "",
    waterUnits: "",
    waterBill: "",
    lastOpened: "31 Aug, 07:15 PM",
    billingHistory: [],
  },
];

const getMonthOptions = () => {
  const options = [];
  const today = new Date();

  for (let i = 0; i < 6; i += 1) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    const value = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const label = date.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

    options.push({
      value,
      label,
    });
  }

  return options;
};

const MONTH_OPTIONS = getMonthOptions();

const getMonthValue = (date) => {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
};

const DEFAULT_FILTERS = {
  paymentStatus: "all",
  dueAmount: "all",
  billingCycle: "all",
  collectionDate: "",
  upcomingDays: "",
};

function Dashboard({
  darkMode,
  setDarkMode,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showSettings, setShowSettings] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [profileImage, setProfileImage] =
    useState("");

  const [expandedRoom, setExpandedRoom] =
    useState(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [showSort, setShowSort] =
    useState(false);

  const [selectedMonth, setSelectedMonth] =
    useState(MONTH_OPTIONS[0].value);

  const [filters, setFilters] =
    useState(DEFAULT_FILTERS);

  const [sortBy, setSortBy] =
    useState("roomAsc");

  useEffect(() => {
    try {
      const savedProfile =
        localStorage.getItem(
          "landlord_profile"
        );

      if (savedProfile) {
        const profile =
          JSON.parse(savedProfile);

        setProfileImage(
          profile.image || ""
        );
      }
    } catch (error) {
      console.error(
        "Could not load profile:",
        error
      );
    }
  }, []);

  const [rooms, setRooms] = useState(() => {
    try {
      const savedRooms =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (savedRooms) {
        return JSON.parse(savedRooms);
      }

      return defaultRooms;
    } catch (error) {
      console.error(
        "Could not load rooms:",
        error
      );

      return defaultRooms;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(rooms)
      );
    } catch (error) {
      console.error(
        "Could not save rooms:",
        error
      );
    }
  }, [rooms]);

  useEffect(() => {
    document.body.style.overflow =
      expandedRoom !== null
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedRoom]);

  /*
    -----------------------------
    ROOM MANAGEMENT
    -----------------------------
  */

  const handleAddRoom = () => {
    const usedNumbers = new Set(
      rooms
        .map((room) => Number(room.number))
        .filter((number) =>
          Number.isFinite(number)
        )
    );

    let nextNumber = 1;

    while (usedNumbers.has(nextNumber)) {
      nextNumber += 1;
    }

    const newRoom = {
      id: Date.now(),
      number: String(nextNumber).padStart(
        2,
        "0"
      ),
      tenant: "",
      tenants: [],
      gender: "",
      rent: "",
      livingSince: "",
      rentCycle: "",
      deposit: "",
      status: "Draft",
      facilities: [],
      month: "October 2026",
      paidDate: "",
      paidAmount: "",
      dueAmount: 0,
      electricityReading: "",
      electricityUnits: "",
      electricityBill: "",
      waterReading: "",
      waterUnits: "",
      waterBill: "",
      lastOpened: "Just now",
      billingHistory: [],
    };

    setRooms((previousRooms) => [
      ...previousRooms,
      newRoom,
    ]);

    setExpandedRoom(newRoom.id);
  };

  const handleRoomUpdate = (
    updatedRoom
  ) => {
    setRooms((previousRooms) =>
      previousRooms.map((room) =>
        room.id === updatedRoom.id
          ? updatedRoom
          : room
      )
    );
  };

  const handleRoomDelete = (roomId) => {
    setRooms((previousRooms) =>
      previousRooms.filter(
        (room) =>
          room.id !== roomId
      )
    );

    setExpandedRoom(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOpenSettings = () => {
    setShowProfile(false);
    setShowSettings(true);
  };

  /*
    -----------------------------
    MONTH HELPERS
    -----------------------------
  */

  const getHistoryForMonth = (
    room,
    monthValue
  ) => {
    const history =
      Array.isArray(room.billingHistory)
        ? room.billingHistory
        : [];

    const match = history.find(
      (entry) => {
        if (!entry?.month) {
          return false;
        }

        const parsed =
          new Date(
            `1 ${entry.month}`
          );

        if (
          Number.isNaN(
            parsed.getTime()
          )
        ) {
          return false;
        }

        return (
          getMonthValue(parsed) ===
          monthValue
        );
      }
    );

    return match || null;
  };

  const getMonthPayment = (
    room,
    monthValue
  ) => {
    const historyEntry =
      getHistoryForMonth(
        room,
        monthValue
      );

    if (historyEntry?.rent) {
      return {
        rent:
          Number(
            historyEntry.rent.amountDue
          ) ||
          Number(room.rent) ||
          0,

        paid:
          Number(
            historyEntry.rent.paidAmount
          ) || 0,

        due:
          Number(
            historyEntry.rent.dueAmount
          ) || 0,

        paidDate:
          historyEntry.rent
            .paidDate || "",

        nextPaymentDate:
          historyEntry.rent
            .nextPaymentDate || "",
      };
    }

    /*
      No billing record for the selected
      month means there is no collection
      or due amount for that month.

      This is important because current
      room fields belong to the current
      billing state and must not leak into
      another month's calculation.
    */

    return {
      rent: Number(room.rent) || 0,
      paid: 0,
      due: 0,
      paidDate: "",
      nextPaymentDate: "",
    };
  };

  /*
    -----------------------------
    COLLECTION
    -----------------------------
  */

  const thisMonthCollection =
    useMemo(() => {
      return rooms.reduce(
        (sum, room) => {
          const payment =
            getMonthPayment(
              room,
              selectedMonth
            );

          return (
            sum +
            (Number(payment.paid) || 0)
          );
        },
        0
      );
    }, [
      rooms,
      selectedMonth,
    ]);

  /*
    Total Due only means remaining
    amount from a partial payment.

    Example:
    Rent 8000
    Paid 5000
    Due 3000

    Due = 3000
  */

  const totalDue =
    useMemo(() => {
      return rooms.reduce(
        (sum, room) => {
          const payment =
            getMonthPayment(
              room,
              selectedMonth
            );

          const paid =
            Number(payment.paid) || 0;

          const due =
            Number(payment.due) || 0;

          /*
            Total Due This Month means only
            the remaining amount after a
            partial payment has been made.

            Fully unpaid rent is NOT included.
          */
          if (
            paid > 0 &&
            due > 0
          ) {
            return sum + due;
          }

          return sum;
        },
        0
      );
    }, [
      rooms,
      selectedMonth,
    ]);

  /*
    -----------------------------
    FILTER HELPERS
    -----------------------------
  */

  const getPaymentStatus = (
    room
  ) => {
    const payment =
      getMonthPayment(
        room,
        selectedMonth
      );

    const rent =
      Number(payment.rent) || 0;

    const paid =
      Number(payment.paid) || 0;

    const due =
      Number(payment.due) || 0;

    if (
      room.status === "Vacant" ||
      room.status === "Draft"
    ) {
      return "unpaid";
    }

    if (
      rent > 0 &&
      paid >= rent &&
      due === 0
    ) {
      return "paid";
    }

    return "unpaid";
  };

  const matchesDueAmount = (
    room
  ) => {
    if (
      filters.dueAmount === "all"
    ) {
      return true;
    }

    const payment =
      getMonthPayment(
        room,
        selectedMonth
      );

    const due =
      Number(payment.due) || 0;

    if (
      filters.dueAmount ===
      "hasDue"
    ) {
      return due > 0;
    }

    if (
      filters.dueAmount ===
      "noDue"
    ) {
      return due === 0;
    }

    return true;
  };

  const matchesBillingCycle = (
    room
  ) => {
    if (
      filters.billingCycle ===
      "all"
    ) {
      return true;
    }

    if (!room.rentCycle) {
      return false;
    }

    const match =
      String(
        room.rentCycle
      ).match(
        /^\s*(\d{1,2})/
      );

    if (!match) {
      return false;
    }

    const billingDay =
      Number(match[1]);

    const [min, max] =
      filters.billingCycle
        .split("-")
        .map(Number);

    return (
      billingDay >= min &&
      billingDay <= max
    );
  };

  const matchesCollectionDate = (
    room
  ) => {
    if (
      !filters.collectionDate
    ) {
      return true;
    }

    if (!room.rentCycle) {
      return false;
    }

    const match =
      String(
        room.rentCycle
      ).match(
        /^\s*(\d{1,2})/
      );

    if (!match) {
      return false;
    }

    const billingDay =
      Number(match[1]);

    const selectedDate =
      new Date(
        `${filters.collectionDate}T00:00:00`
      );

    return (
      billingDay ===
      selectedDate.getDate()
    );
  };

  const matchesUpcomingCollection = (
    room
  ) => {
    /*
      Empty means the user has not
      selected this filter.

      Therefore it MUST NOT hide rooms.
    */

    if (
      !filters.upcomingDays
    ) {
      return true;
    }

    if (!room.rentCycle) {
      return false;
    }

    const match =
      String(
        room.rentCycle
      ).match(
        /^\s*(\d{1,2})/
      );

    if (!match) {
      return false;
    }

    const billingDay =
      Number(match[1]);

    const days =
      Number(filters.upcomingDays);

    const today =
      new Date();

    const startDate =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

    const endDate =
      new Date(startDate);

    endDate.setDate(
      endDate.getDate() + days
    );

    /*
      Upcoming collection should use
      the selected month.
    */

    const [
      selectedYear,
      selectedMonthNumber,
    ] =
      selectedMonth
        .split("-")
        .map(Number);

    let collectionDate =
      new Date(
        selectedYear,
        selectedMonthNumber - 1,
        billingDay
      );

    /*
      If selected month is the current
      month and billing date has passed,
      the next collection belongs to
      next month.
    */

    const currentMonthValue =
      getMonthValue(today);

    if (
      selectedMonth ===
        currentMonthValue &&
      collectionDate < startDate
    ) {
      collectionDate =
        new Date(
          selectedYear,
          selectedMonthNumber,
          billingDay
        );
    }

    return (
      collectionDate >= startDate &&
      collectionDate <= endDate
    );
  };

  /*
    -----------------------------
    FILTER + SEARCH + SORT
    -----------------------------
  */

  const filteredAndSortedRooms =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      let result = rooms.filter(
        (room) => {
          /*
            Search
          */

          const matchesSearch =
            String(
              room.number || ""
            )
              .toLowerCase()
              .includes(query);

          if (!matchesSearch) {
            return false;
          }

          /*
            Payment Status
          */

          if (
            filters.paymentStatus !==
            "all"
          ) {
            if (
              getPaymentStatus(
                room
              ) !==
              filters.paymentStatus
            ) {
              return false;
            }
          }

          /*
            Due Amount
          */

          if (
            !matchesDueAmount(
              room
            )
          ) {
            return false;
          }

          /*
            Billing Cycle
          */

          if (
            !matchesBillingCycle(
              room
            )
          ) {
            return false;
          }

          /*
            Specific Collection Date
          */

          if (
            !matchesCollectionDate(
              room
            )
          ) {
            return false;
          }

          /*
            Upcoming Collection
          */

          if (
            !matchesUpcomingCollection(
              room
            )
          ) {
            return false;
          }

          return true;
        }
      );

      /*
        Sorting is independent of filters.
      */

      result.sort((a, b) => {
        switch (sortBy) {
          case "roomAsc":
            return (
              Number(a.number) -
              Number(b.number)
            );

          case "roomDesc":
            return (
              Number(b.number) -
              Number(a.number)
            );

          case "billingAsc": {
            const aDay =
              Number(
                String(
                  a.rentCycle || ""
                ).match(
                  /^\s*(\d{1,2})/
                )?.[1]
              ) || 0;

            const bDay =
              Number(
                String(
                  b.rentCycle || ""
                ).match(
                  /^\s*(\d{1,2})/
                )?.[1]
              ) || 0;

            return aDay - bDay;
          }

          case "billingDesc": {
            const aDay =
              Number(
                String(
                  a.rentCycle || ""
                ).match(
                  /^\s*(\d{1,2})/
                )?.[1]
              ) || 0;

            const bDay =
              Number(
                String(
                  b.rentCycle || ""
                ).match(
                  /^\s*(\d{1,2})/
                )?.[1]
              ) || 0;

            return bDay - aDay;
          }
          default:
            return 0;
        }
      });

      return result;
    }, [
      rooms,
      searchQuery,
      filters,
      sortBy,
      selectedMonth,
    ]);

  /*
    -----------------------------
    FILTER STATE
    -----------------------------
  */

  const handleApplyFilters = (
    newFilters
  ) => {
    setFilters(newFilters);
  };

  const handleSortChange = (
    newSort
  ) => {
    setSortBy(newSort);
  };

  const hasActiveFilters =
    filters.paymentStatus !==
      "all" ||
    filters.dueAmount !==
      "all" ||
    filters.billingCycle !==
      "all" ||
    filters.collectionDate !==
      "" ||
    filters.upcomingDays !==
      "";

  const clearAllFilters = () => {
    setFilters({
      ...DEFAULT_FILTERS,
    });
  };

  /*
    -----------------------------
    RENDER
    -----------------------------
  */

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Dashboard Header */}

      <header
        className={`border-b shadow-sm ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div>
            <h1
              className={`text-2xl font-extrabold tracking-tight ${
                darkMode
                  ? "text-white"
                  : "text-slate-800"
              }`}
            >
              Landlord Desk
            </h1>

            {user && (
              <p
                className={`text-xs ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Welcome, {user.name}
              </p>
            )}
          </div>

          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                setShowProfile(
                  (previous) =>
                    !previous
                )
              }
              className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 text-lg shadow-sm transition ${
                darkMode
                  ? "border-slate-600 bg-slate-800 hover:border-indigo-400"
                  : "border-slate-200 bg-slate-100 hover:border-indigo-400"
              }`}
              aria-label="Profile"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                "👤"
              )}
            </button>

            {showProfile && (
              <Profile
                darkMode={darkMode}
                onClose={() =>
                  setShowProfile(false)
                }
                onOpenSettings={
                  handleOpenSettings
                }
                onLogout={
                  handleLogout
                }
                profileImage={
                  profileImage
                }
                setProfileImage={
                  setProfileImage
                }
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Dashboard */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <section>
          {/* Month Selector */}

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-700"
                }`}
              >
                Dashboard Month
              </p>

              <p
                className={`text-xs ${
                  darkMode
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                Select a month to view its
                rent data
              </p>
            </div>

            <select
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(
                  event.target.value
                )
              }
              className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition sm:w-56 ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-slate-100 focus:border-emerald-500"
                  : "border-slate-300 bg-white text-slate-800 focus:border-emerald-500"
              }`}
            >
              {MONTH_OPTIONS.map(
                (month) => (
                  <option
                    key={month.value}
                    value={month.value}
                  >
                    {month.label}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Summary */}

          <CollectionSummary
            darkMode={darkMode}
            totalRooms={rooms.length}
            thisMonthCollection={
              thisMonthCollection
            }
            totalDue={totalDue}
            onAddRoom={
              handleAddRoom
            }
          />

          {/* Rooms Heading */}

          <div className="mb-5 mt-8">
            <h2
              className={`text-2xl font-extrabold tracking-tight ${
                darkMode
                  ? "text-white"
                  : "text-slate-800"
              }`}
            >
              Your Rooms
            </h2>

            <p
              className={`mt-1 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Manage your rooms and
              rent collection
            </p>
          </div>

          {/* Search + Filter + Sort */}

          {rooms.length > 0 && (
            <div
              className={`mb-6 rounded-2xl border p-4 shadow-sm ${
                darkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                {/* Search */}

                <div className="relative flex-1">
                  <input
                    id="room-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search by room number"
                    className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery("")
                      }
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${
                        darkMode
                          ? "text-slate-500 hover:text-slate-300"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                      aria-label="Clear room search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter */}

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(true)
                  }
                  className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                    hasActiveFilters
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : darkMode
                        ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-emerald-500 hover:text-emerald-400"
                        : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600"
                  }`}
                >
                  Filter
                  {hasActiveFilters &&
                    " • Active"}
                </button>

                {/* Sort */}

                <button
                  type="button"
                  onClick={() =>
                    setShowSort(true)
                  }
                  className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-emerald-500 hover:text-emerald-400"
                      : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600"
                  }`}
                >
                  Sort
                </button>
              </div>

              {/* Active Filters */}

              {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Active filters:
                  </span>

                  {filters.paymentStatus !==
                    "all" && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      {filters.paymentStatus ===
                      "paid"
                        ? "Paid"
                        : "Unpaid"}
                    </span>
                  )}

                  {filters.dueAmount !==
                    "all" && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      {filters.dueAmount ===
                      "hasDue"
                        ? "Has Due"
                        : "No Due"}
                    </span>
                  )}

                  {filters.billingCycle !==
                    "all" && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Billing{" "}
                      {
                        filters.billingCycle
                      }
                    </span>
                  )}

                  {filters.collectionDate && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Collection{" "}
                      {
                        filters.collectionDate
                      }
                    </span>
                  )}

                  {filters.upcomingDays && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Next{" "}
                      {
                        filters.upcomingDays
                      }{" "}
                      Days
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={
                      clearAllFilters
                    }
                    className="ml-1 text-xs font-medium text-slate-400 transition hover:text-red-400"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Result Count */}

          {rooms.length > 0 && (
            <div className="mb-4">
              <p
                className={`text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Showing{" "}
                {
                  filteredAndSortedRooms.length
                }{" "}
                of {rooms.length} rooms
              </p>
            </div>
          )}

          {/* Room Cards */}

          {filteredAndSortedRooms.length >
            0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredAndSortedRooms.map(
                (room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    expanded={
                      expandedRoom ===
                      room.id
                    }
                    onToggle={() =>
                      setExpandedRoom(
                        expandedRoom ===
                          room.id
                          ? null
                          : room.id
                      )
                    }
                    onUpdate={
                      handleRoomUpdate
                    }
                    onDelete={
                      handleRoomDelete
                    }
                  />
                )
              )}
            </div>
          )}

          {/* No Rooms */}

          {rooms.length === 0 && (
            <div
              className={`rounded-3xl border-2 border-dashed p-16 text-center ${
                darkMode
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-300 bg-white"
              }`}
            >
              <div className="text-5xl">
                🏠
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No rooms yet
              </h3>

              <p
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Use the Add New Room
                button above to get
                started.
              </p>
            </div>
          )}

          {/* No Results */}

          {rooms.length > 0 &&
            filteredAndSortedRooms.length ===
              0 && (
              <div
                className={`rounded-3xl border-2 border-dashed p-12 text-center ${
                  darkMode
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-300 bg-white"
                }`}
              >
                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  No room found
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  No room matches the
                  current search, month,
                  or filters.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    clearAllFilters();
                  }}
                  className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Clear Search & Filters
                </button>
              </div>
            )}
        </section>
      </main>

      {/* Filter Modal */}

      {showFilters && (
        <RoomFilters
          darkMode={darkMode}
          filters={filters}
          onApply={
            handleApplyFilters
          }
          onClose={() =>
            setShowFilters(false)
          }
        />
      )}

      {/* Sort Modal */}

      {showSort && (
        <RoomSort
          darkMode={darkMode}
          sortBy={sortBy}
          onSortChange={
            handleSortChange
          }
          onClose={() =>
            setShowSort(false)
          }
        />
      )}

      {/* Settings */}

      {showSettings && (
        <Settings
          onClose={() =>
            setShowSettings(false)
          }
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </div>
  );
}

export default Dashboard;