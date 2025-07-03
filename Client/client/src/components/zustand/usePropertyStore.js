import { create } from 'zustand';
import axios from 'axios';

const usePropertyStore = create((set) => ({
  properties: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,

  fetchProperties: async (filters, page = 1) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`http://localhost:5000/api/properties`, {
        params: { ...filters, page },
      });
      set({
        properties: res.data.properties,
        totalPages: res.data.totalPages,
        currentPage: page,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
    }
  },
}));

export default usePropertyStore;
