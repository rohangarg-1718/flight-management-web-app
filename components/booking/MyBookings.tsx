"use client";

import RescheduleModal from "@/components/booking/RescheduleModal";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Booking {
  id: string;
  pnr_code: string;
  status: string;
  total_price: number;

  flights: {
    flight_no: string;
    origin: string;
    destination: string;
  };

  seats: {
    seat_number: string;
  };
}

export default function MyBookings() {
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [rescheduleBookingId, setRescheduleBookingId] =
    useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          pnr_code,
          status,
          total_price,
          flights (
            flight_no,
            origin,
            destination
          ),
          seats (
            seat_number
          )
        `)
        .eq("user_id", user.id)
        .order("booked_at", { ascending: false });

      if (!error && data) {
        setBookingList(data as unknown as Booking[]);
      }
    }

    fetchBookings();
  }, []);

  async function handleCancel(bookingId: string) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const { data, error } = await supabase.rpc("cancel_booking", {
      p_booking_id: bookingId,
    });

    if (error || !data) {
      alert(error?.message || "Cancellation failed.");
      return;
    }

    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      )
    );
  }
  return (
    <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-2 text-2xl font-semibold">
        My Bookings
      </h2>

      <p className="mb-6 text-slate-400">
        View and manage your active flight bookings.
      </p>

      <div className="grid gap-4">
        {bookingList.map((booking) => (
          <div
            key={booking.id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  PNR: {booking.pnr_code}
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {booking.flights.flight_no} •{" "}
                  {booking.flights.origin} →{" "}
                  {booking.flights.destination}
                </h3>

                <p className="mt-1 text-slate-400">
                  Seat: {booking.seats.seat_number}
                </p>

                <p className="mt-1 text-cyan-400">
                  ₹{booking.total_price}
                </p>
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

                <button
                  onClick={() =>
                    setRescheduleBookingId(booking.id)
                  }
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400"
                >
                  Reschedule
                </button>

                <button
                  onClick={() =>
                    handleCancel(booking.id)
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
      {rescheduleBookingId && (
        <RescheduleModal
          bookingId={rescheduleBookingId}
          onClose={() => setRescheduleBookingId(null)}
          onRescheduled={() => {
            setBookingList((prev) =>
              prev.map((booking) =>
                booking.id === rescheduleBookingId
                  ? {
                    ...booking,
                    status: "rescheduled",
                  }
                  : booking
              )
            );
          }}
        />
      )}
    </div>
  );
}