"use client";

import FlightCard from "@/components/flight/FlightCard";
import { useSearchStore } from "@/store/searchStore";

interface Flight {
  id: string;
  flight_no: string;
  origin: string;
  destination: string;
  base_price: number;
}

interface FlightListProps {
  flights: Flight[];
}

export default function FlightList({ flights }: FlightListProps) {
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const filteredFlights = flights.filter((flight) => {
    const originMatch =
      !searchQuery.origin ||
      flight.origin.toLowerCase().includes(searchQuery.origin.toLowerCase());

    const destinationMatch =
      !searchQuery.destination ||
      flight.destination
        .toLowerCase()
        .includes(searchQuery.destination.toLowerCase());

    return originMatch && destinationMatch;
  });

  return (
    <div className="mt-16 grid gap-6">
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            id={flight.id}
            flightNo={flight.flight_no}
            origin={flight.origin}
            destination={flight.destination}
            price={flight.base_price}
          />
        ))
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No matching flights found.
        </div>
      )}
    </div>
  );
}