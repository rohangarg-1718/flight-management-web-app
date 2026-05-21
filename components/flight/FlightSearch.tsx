"use client";

import { useSearchStore } from "@/store/searchStore";

import { useState } from "react";

export default function FlightSearch() {
    const [search, setSearch] = useState({
        origin: "",
        destination: "",
        date: "",
    });

    const setSearchQuery = useSearchStore(
        (state) => state.setSearchQuery
    );

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 overflow-hidden">
            <h2 className="mb-6 text-2xl font-semibold">
                Search Flights
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                <input
                    type="text"
                    placeholder="Origin"
                    value={search.origin}
                    onChange={(e) =>
                        setSearch({ ...search, origin: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                />

                <input
                    type="text"
                    placeholder="Destination"
                    value={search.destination}
                    onChange={(e) =>
                        setSearch({ ...search, destination: e.target.value })
                    }
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                />

                <input
                    type="date"
                    value={search.date}
                    onChange={(e) =>
                        setSearch({ ...search, date: e.target.value })
                    }
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                />

                <button
                    onClick={() => {
                        setLoading(true);

                        setTimeout(() => {
                            setLoading(false);
                            setSubmitted(true);

                            setSearchQuery(search);

                        }, 1200);
                    }}
                    className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

            </div>

            {submitted && (
                <p className="mt-4 text-sm text-cyan-400">
                    Showing available flights from{" "}
                    <span className="font-semibold">{search.origin || "any origin"}</span>{" "}
                    to{" "}
                    <span className="font-semibold">
                        {search.destination || "any destination"}
                    </span>
                </p>
            )}
        </div>
    );
}