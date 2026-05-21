"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useFlightStore } from "@/store/flightStore";

interface Seat {
    id: string;
    seat_number: string;
    class: string;
    is_available: boolean;
    extra_fee: number;
}

export default function SeatMap() {
    const selectedFlight = useFlightStore((state) => state.selectedFlight);
    const selectedSeat = useFlightStore((state) => state.selectedSeat);
    const setSelectedSeat = useFlightStore((state) => state.setSelectedSeat);

    const [seats, setSeats] = useState<Seat[]>([]);

    useEffect(() => {
        async function fetchSeats() {
            if (!selectedFlight) return;

            const { data, error } = await supabase
                .from("seats")
                .select("*")
                .eq("flight_id", selectedFlight.id)
                .order("seat_number", { ascending: true });

            if (!error && data) {
                setSeats(data);
            }
        }

        fetchSeats();

        const channel = supabase
            .channel("realtime-seats")

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "seats",
                },
                () => {
                    fetchSeats();
                }
            )

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedFlight]);

    if (!selectedFlight) {
        return (
            <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-2xl font-semibold">Select Your Seat</h2>
                <p className="mt-2 text-slate-400">
                    Please choose a flight first to view available seats.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">Select Your Seat</h2>

            <p className="mb-6 text-slate-400">
                Flight {selectedFlight.flightNo}: {selectedFlight.origin} →{" "}
                {selectedFlight.destination}
            </p>

            <div className="mb-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-slate-700"></div>
                    <span>Available</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-cyan-400"></div>
                    <span>Selected</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-red-700"></div>
                    <span>Occupied</span>
                </div>
            </div>

            <div className="grid max-w-md grid-cols-3 gap-4">
                {seats.map((seat) => {
                    const isOccupied = seat.is_available === false;
                    const isSelected = !isOccupied && selectedSeat?.id === seat.id;

                    return (
                        <button
                            key={seat.id}
                            disabled={isOccupied}
                            title={`${seat.class} | Extra Fee: ₹${seat.extra_fee}`}
                            onClick={() => {
                                if (isOccupied) return;

                                setSelectedSeat({
                                    id: seat.id,
                                    seatNumber: seat.seat_number,
                                    seatClass: seat.class,
                                    fee: seat.extra_fee,
                                    status: "available",
                                });
                            }}
                            className={`rounded-xl border p-4 font-semibold transition ${isOccupied
                                ? "cursor-not-allowed border-red-500 bg-red-950 text-red-300"
                                : isSelected
                                    ? "border-cyan-400 bg-cyan-400 text-black"
                                    : "border-slate-700 bg-slate-950 hover:border-cyan-400"
                                }`}
                        >
                            {seat.seat_number}
                        </button>
                    );
                })}
            </div>

            {selectedSeat && (
                <p className="mt-6 text-cyan-400">
                    Selected Seat:{" "}
                    <span className="font-bold">{selectedSeat.seatNumber}</span>
                </p>
            )}
        </div>
    );
}