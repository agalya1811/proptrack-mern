import { create } from 'zustand';
import API from '../services/api';

const useDashboardStore = create((set) => ({
  properties: [],
  inquiries: [],
  viewings: [],
  clients: [],         // ✅ Add clients array
  loading: false,
  filters: {},

  // --- Existing methods ---
  fetchProperties: async (filters = {}) => {
    set({ loading: true });
    try {
      const res = await API.get('/api/properties', { params: filters });
      set({ properties: res.data, filters, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchInquiries: async () => {
    set({ loading: true });
    try {
      const res = await API.get('/api/inquiries');
      set({ inquiries: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchViewings: async () => {
    set({ loading: true });
    try {
      const res = await API.get('/api/viewings');
      set({ viewings: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  addProperty: async (property) => {
    set({ loading: true });
    try {
      const res = await API.post('/api/properties', property);
      set((state) => ({
        properties: [...state.properties, res.data],
        loading: false
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
      throw err;
    }
  },

  updateProperty: async (id, updates) => {
    set({ loading: true });
    try {
      const res = await API.put(`/api/properties/${id}`, updates);
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
      await API.delete(`/api/properties/${id}`);
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

  // --- ✅ NEW: Clients support ---
  fetchClients: async () => {
    set({ loading: true });
    try {
      const res = await API.get('/api/clients');
      set({ clients: res.data, loading: false });
    } catch (err) {
      console.error('Error fetching clients:', err);
      set({ loading: false });
    }
  },

  addClient: async (client) => {
    set({ loading: true });
    try {
      const res = await API.post('/api/clients', client);
      set((state) => ({
        clients: [...state.clients || [], res.data],
        loading: false,
      }));
    } catch (err) {
      console.error('Error adding client:', err);
      set({ loading: false });
      throw err;
    }
  },
}));

export default useDashboardStore;
