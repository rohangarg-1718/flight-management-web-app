import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchQuery {
  origin: string;
  destination: string;
  date: string;
}

interface SearchStore {
  searchQuery: SearchQuery;
  setSearchQuery: (query: SearchQuery) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchQuery: {
        origin: "",
        destination: "",
        date: "",
      },

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      resetSearch: () =>
        set({
          searchQuery: {
            origin: "",
            destination: "",
            date: "",
          },
        }),
    }),
    {
      name: "flight-search-store",
    }
  )
);