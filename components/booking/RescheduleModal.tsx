"use client";

import { useState } from "react";

interface RescheduleModalProps {
  bookingId: string;
  onClose: () => void;
  onRescheduled: () => void;
}

export default function RescheduleModal({
  bookingId,
  onClose,
  onRescheduled,
}: RescheduleModalProps) {
  const [selectedOption, setSelectedOption] = useState("");

  function handleReschedule() {
    if (!selectedOption) {
      alert("Please select a new flight option.");
      return;
    }

    alert(`Booking ${bookingId} rescheduled successfully.`);
    onRescheduled();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">
        <h2 className="text-2xl font-semibold">Reschedule Booking</h2>

        <p className="mt-2 text-slate-400">
          Choose an alternative flight on the same route.
        </p>

        <div className="mt-6 grid gap-3">
          {["Next Morning Flight", "Evening Flight", "Next Day Flight"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`rounded-xl border p-4 text-left ${
                  selectedOption === option
                    ? "border-cyan-400 bg-cyan-950"
                    : "border-slate-700 bg-slate-950"
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2"
          >
            Close
          </button>

          <button
            onClick={handleReschedule}
            className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-black"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}