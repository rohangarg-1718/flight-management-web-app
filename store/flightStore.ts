import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FlightStore {
  selectedFlight: any;
  selectedSeat: any;

  setSelectedFlight: (flight: any) => void;
  setSelectedSeat: (seat: any) => void;

  resetBooking: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist(
    (set) => ({
      selectedFlight: null,
      selectedSeat: null,

      setSelectedFlight: (flight) =>
        set({ selectedFlight: flight }),

      setSelectedSeat: (seat) =>
        set({ selectedSeat: seat }),

      resetBooking: () =>
        set({
          selectedFlight: null,
          selectedSeat: null,
        }),
    }),
    {
      name: "flight-booking-store",
    }
  )
);