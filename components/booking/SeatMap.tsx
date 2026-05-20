"use client";

import { useFlightStore } from "@/store/flightStore";

const seats = [
    { seatNumber: "1A", seatClass: "First", fee: 2500, status: "available" },
    { seatNumber: "1B", seatClass: "First", fee: 2500, status: "occupied" },
    { seatNumber: "2A", seatClass: "Business", fee: 1500, status: "available" },
    { seatNumber: "2B", seatClass: "Business", fee: 1500, status: "available" },
    { seatNumber: "3A", seatClass: "Economy", fee: 0, status: "available" },
    { seatNumber: "3B", seatClass: "Economy", fee: 0, status: "occupied" },
    { seatNumber: "3C", seatClass: "Economy", fee: 0, status: "available" },
    { seatNumber: "4A", seatClass: "Economy", fee: 0, status: "available" },
    { seatNumber: "4B", seatClass: "Economy", fee: 0, status: "available" },
    { seatNumber: "4C", seatClass: "Economy", fee: 0, status: "available" },
];

export default function SeatMap() {
    const selectedSeat = useFlightStore((state) => state.selectedSeat);
    const setSelectedSeat = useFlightStore((state) => state.setSelectedSeat);

    return (
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">Select Your Seat</h2>

            <p className="mb-6 text-slate-400">
                Choose from First, Business, and Economy class seats.
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
                    const isSelected = selectedSeat?.seatNumber === seat.seatNumber;
                    const isOccupied = seat.status === "occupied";

                    return (
                        <button
                            key={seat.seatNumber}
                            disabled={isOccupied}
                            title={`${seat.seatClass} | Extra Fee: ₹${seat.fee}`}
                            onClick={() => setSelectedSeat(seat)}
                            className={`rounded-xl border p-4 font-semibold transition ${isOccupied
                                    ? "cursor-not-allowed border-red-500 bg-red-950 text-red-300"
                                    : isSelected
                                        ? "border-cyan-400 bg-cyan-400 text-black"
                                        : "border-slate-700 bg-slate-950 hover:border-cyan-400"
                                }`}
                        >
                            {seat.seatNumber}
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