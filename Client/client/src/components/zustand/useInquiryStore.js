import { create } from 'zustand';
import axios from 'axios';

const useInquiryStore = create((set) => ({
  inquiries: [],
  fetchInquiries: async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients');
      set({ inquiries: res.data });
    } catch (err) {
      console.error('Failed to load inquiries');
    }
  },
}));

export default useInquiryStore;
