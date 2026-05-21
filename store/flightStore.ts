import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedFlight {
  id: string;
  flightNo: string;
  origin: string;
  destination: string;
  price: number;
}

interface SelectedSeat {
  id?: string;
  seatNumber: string;
  seatClass?: string;
  fee?: number;
  status?: string;
}

interface FlightStore {
  selectedFlight: SelectedFlight | null;
  selectedSeat: SelectedSeat | null;

  setSelectedFlight: (flight: SelectedFlight) => void;
  setSelectedSeat: (seat: SelectedSeat) => void;

  resetBooking: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist(
    (set) => ({
      selectedFlight: null,
      selectedSeat: null,

      setSelectedFlight: (flight) =>
        set({
          selectedFlight: flight,
          selectedSeat: null,
        }),

      setSelectedSeat: (seat) => set({ selectedSeat: seat }),

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