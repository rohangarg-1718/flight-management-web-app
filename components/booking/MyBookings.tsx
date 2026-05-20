"use client";

import { useState } from "react";

const bookings = [
    {
        pnr: "FP2026A1",
        flight: "AI-202",
        route: "Delhi → Mumbai",
        seat: "2A",
        status: "confirmed",
    },
    {
        pnr: "FP2026B7",
        flight: "IN-748",
        route: "Bangalore → Hyderabad",
        seat: "3C",
        status: "rescheduled",
    },
];

const initialBookings = bookings;

export default function MyBookings() {
    const [bookingList, setBookingList] = useState(initialBookings);
    return (
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">My Bookings</h2>

            <p className="mb-6 text-slate-400">
                View and manage your active flight bookings.
            </p>

            <div className="grid gap-4">
                {bookingList.map((booking) => (
                    <div
                        key={booking.pnr}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm text-slate-400">PNR: {booking.pnr}</p>
                                <h3 className="mt-1 text-xl font-semibold">
                                    {booking.flight} • {booking.route}
                                </h3>
                                <p className="mt-1 text-slate-400">Seat: {booking.seat}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${booking.status === "confirmed"
                                        ? "bg-green-950 text-green-300"
                                        : booking.status === "rescheduled"
                                            ? "bg-yellow-950 text-yellow-300"
                                            : "bg-red-950 text-red-300"
                                        }`}
                                >
                                    {booking.status}
                                </span>

                                <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400">
                                    Reschedule
                                </button>

                                <button
                                    onClick={() =>
                                        setBookingList((prev) =>
                                            prev.map((item) =>
                                                item.pnr === booking.pnr
                                                    ? { ...item, status: "cancelled" }
                                                    : item
                                            )
                                        )
                                    }
                                    className="rounded-lg border border-red-700 px-4 py-2 text-sm text-red-300 hover:bg-red-950"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}