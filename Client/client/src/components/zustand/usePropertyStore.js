import { create } from 'zustand';
import axios from 'axios';

const usePropertyStore = create((set,get) => ({
  properties: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,

   fetchProperties: async (filters = {}) => {
    set({ loading: true });
    try {
      const res = await axios.get(`http://localhost:5000/api/properties`, { params: filters });
      set({ properties: res.data, filters, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));

export default usePropertyStore;
