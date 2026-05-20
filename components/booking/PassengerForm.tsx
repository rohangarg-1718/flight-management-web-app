"use client";

import { useState } from "react";
import { useFlightStore } from "@/store/flightStore";

export default function PassengerForm() {
    const selectedSeat = useFlightStore((state) => state.selectedSeat);

    const [formData, setFormData] = useState({
        fullName: "",
        passportNo: "",
        nationality: "",
        dob: "",
    });
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    return (
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">Passenger Details</h2>

            <p className="mb-6 text-slate-400">
                Enter passenger information to continue booking.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                <input
                    placeholder="Full Name"
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                    onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                    }
                />

                <input
                    placeholder="Passport Number"
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                    onChange={(e) =>
                        setFormData({ ...formData, passportNo: e.target.value })
                    }
                />

                <input
                    placeholder="Nationality"
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                    onChange={(e) =>
                        setFormData({ ...formData, nationality: e.target.value })
                    }
                />

                <input
                    type="date"
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                    onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                    }
                />
            </div>

            <button
                disabled={!selectedSeat}
                onClick={() => setBookingConfirmed(true)}
                className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
                Confirm Booking
            </button>
            {bookingConfirmed && (
                <div className="mt-6 rounded-xl border border-green-500 bg-green-950 p-4 text-green-300">
                    Booking Confirmed Successfully ✈️
                </div>
            )}
        </div>
    );
}