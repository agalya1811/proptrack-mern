import { create } from 'zustand';
import API from '../services/api';

const useDashboardStore = create((set) => ({
  properties: [],
  inquiries: [],
  viewings: [],
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

  fetchInquiries: async () => {
    set({ loading: true });
    try {
      const res = await API.get('/clients');
      set({ inquiries: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchViewings: async () => {
    set({ loading: true });
    try {
      const res = await API.get('/viewings');
      set({ viewings: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  addProperty: async (property) => {
    set({ loading: true });
    try {
      const res = await API.post('/properties', property);
      set((state) => ({ properties: [...state.properties, res.data], loading: false }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
      throw err;
    }
  },

  updateProperty: async (id, updates) => {
    set({ loading: true });
    try {
      const res = await API.put(`/properties/${id}`, updates);
      set((state) => ({
        properties: state.properties.map(p => p._id === id ? res.data : p),
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
      throw err;
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true });
    try {
      await API.delete(`/properties/${id}`);
      set((state) => ({
        properties: state.properties.filter(p => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
      throw err;
    }
  },

  // Similar methods can be added for inquiries and viewings updates
}));

export default useDashboardStore;
