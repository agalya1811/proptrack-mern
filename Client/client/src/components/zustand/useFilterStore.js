import { create } from 'zustand';

const useFilterStore = create((set) => ({
  filters: {
    priceRange: [0, 1000000],
    location: '',
    type: '',
    bedrooms: 0,
    bathrooms: 0,
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () =>
    set({
      filters: {
        priceRange: [0, 1000000],
        location: '',
        type: '',
        bedrooms: 0,
        bathrooms: 0,
      },
    }),
}));

export default useFilterStore;
