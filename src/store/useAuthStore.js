
import axios from 'axios';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => {
    return {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get('auth/check');
                set({authUser: res.data})
            } catch (error) {
                console.log("Error checking auth:", error);
                set({authUser: null})
            }
            finally {
                set({isCheckingAuth: false})
            }
        },

        signup: async (data) => {
            try {
                set({ isSigningUp: true });
                const res = await axiosInstance.post('auth/signup', data);
                set({ authUser: res.data });
            } catch (error) {
                console.error("Error signing up:", error);
            } finally {
                set({ isSigningUp: false });
            }
        }
    }
})