import FlightCard from "@/components/flight/FlightCard";
import FlightSearch from "@/components/flight/FlightSearch";
import FlightList from "@/components/flight/FlightList";
import FeaturedDestinations from "@/components/flight/FeaturedDestinations";

import { supabase } from "@/lib/supabaseClient";

import SeatMap from "@/components/booking/SeatMap";
import PassengerForm from "@/components/booking/PassengerForm";
import MyBookings from "@/components/booking/MyBookings";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AuthModal from "@/components/auth/AuthModal";
import UserStatus from "@/components/auth/UserStatus";

import { useSearchStore } from "@/store/searchStore";

export default async function Home() {

  const { data: flights } = await supabase
    .from("flights")
    .select("*")
    .order("departs_at", { ascending: true });

  const filteredFlights = flights;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 overflow-hidden">

        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight break-words">
            Flight Management
            <span className="text-cyan-400"> Web App</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Search flights, reserve seats, manage bookings,
            reschedule journeys, and experience realtime
            seat updates with a modern aviation platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-xl font-semibold text-black">
              Search Flights
            </button>

            <button className="border border-slate-700 hover:border-cyan-400 transition px-6 py-3 rounded-xl">
              My Bookings
            </button>
          </div>
        </div>

        <FlightSearch />

        <FeaturedDestinations />

        <AuthModal />

        <UserStatus />

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Realtime Seat Updates
            </h2>

            <p className="text-slate-400">
              Watch seat availability update instantly
              across users using Supabase Realtime.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Smart Booking Flow
            </h2>

            <p className="text-slate-400">
              Complete booking journey from flight search
              to confirmation with generated PNR codes.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Reschedule & Cancellation
            </h2>

            <p className="text-slate-400">
              Manage bookings with secure cancellation
              and flexible flight rescheduling support.
            </p>
          </div>

        </div>

        <FlightList flights={flights || []} />

        <SeatMap />
        
        <PassengerForm />

        <MyBookings />

      </section>
      <Footer />
    </main>
  );
}