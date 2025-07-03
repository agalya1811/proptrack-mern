import { create } from 'zustand';
import API from '../services/api';

const usePropertyStore = create((set) => ({
  properties: [],
  loading: false,
  filters: {},
  fetchProperties: async (filters = {}) => {
    set({ loading: true });
    try {
      const res = await API.get('/properties', { params: filters });
      set({ properties: res.data, filters, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));

export default usePropertyStore;
