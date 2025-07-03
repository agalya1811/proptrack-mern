import { create } from 'zustand';
import axios from 'axios';

const useViewingStore = create((set) => ({
  viewings: [],
  fetchViewings: async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/viewings');
      set({ viewings: res.data });
    } catch (err) {
      console.error('Failed to fetch viewings');
    }
  },
}));

export default useViewingStore;
