"use client";

import { useState } from "react";
import { useFlightStore } from "@/store/flightStore";
import { supabase } from "@/lib/supabaseClient";

export default function PassengerForm() {
    const selectedSeat = useFlightStore((state) => state.selectedSeat);
    const selectedFlight = useFlightStore((state) => state.selectedFlight);
    const resetBooking = useFlightStore((state) => state.resetBooking);

    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        passportNo: "",
        nationality: "",
        dob: "",
    });

    async function handleBooking() {
        if (!selectedFlight || !selectedSeat) {
            alert("Please select a flight and seat.");
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login first.");
            return;
        }

        const pnrCode =
            "PNR" + Math.random().toString(36).substring(2, 8).toUpperCase();

        const { data: seatReserved, error: seatError } = await supabase.rpc(
            "reserve_seat",
            {
                p_seat_id: selectedSeat.id,
            }
        );

        if (seatError || !seatReserved) {
            alert("Seat is no longer available.");
            return;
        }

        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .insert([
                {
                    user_id: user.id,
                    flight_id: selectedFlight.id,
                    seat_id: selectedSeat.id,
                    status: "confirmed",
                    total_price:
                        selectedFlight.price + (selectedSeat.fee || 0),
                    pnr_code: pnrCode,
                },
            ])
            .select()
            .single();

        if (bookingError || !booking) {
            alert("Booking failed.");
            return;
        }

        const { error: passengerError } = await supabase
            .from("passengers")
            .insert([
                {
                    booking_id: booking.id,
                    full_name: formData.fullName,
                    passport_no: formData.passportNo,
                    nationality: formData.nationality,
                    dob: formData.dob,
                },
            ]);

        if (passengerError) {
            alert(passengerError.message);
            return;
        }

        setBookingConfirmed(true);
        resetBooking();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

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
                    value={formData.dob}
                    onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                    }
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                />
            </div>

            <button
                disabled={!selectedSeat}
                onClick={handleBooking}
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