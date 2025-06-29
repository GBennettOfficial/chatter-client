
import axios from 'axios';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

export const useAuthStore = create((set, get) => {
    return {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: [],
        socket: null,

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get('auth/check');
                if (res.status === 200) {
                    set({ authUser: res.data })
                    get().connectSocket();
                    toast.success("Logged in successfully!");
                }
            } catch (error) {
                console.log("Error checking auth:", error);
                set({ authUser: null })
            }
            finally {
                set({ isCheckingAuth: false })
            }
        },

        signup: async (data) => {
            try {
                set({ isSigningUp: true });
                const res = await axiosInstance.post('auth/signup', data);
                if (res.status === 200) {
                    set({ authUser: res.data })
                    get().connectSocket();
                    toast.success("Account created successfully!");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error signing up. Please try again.");
                console.error("Error signing up:", error);
            } finally {
                set({ isSigningUp: false });
            }
        },

        login: async (data) => {
            try {
                set({ isLoggingIn: true });
                const res = await axiosInstance.post('auth/login', data);
                if (res.status === 200) {
                    set({ authUser: res.data })
                    get().connectSocket();
                    toast.success("Logged in successfully!");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error logging in. Please try again.");
                console.error("Error logging in:", error);
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                axiosInstance.post('auth/logout');
                get().disconnectSocket();
                set({ authUser: null });
                toast.success("Logged out successfully!");
            } catch (error) {
                toast.error(error.response?.data?.message || "Error logging out. Please try again.");
                console.error("Error logging out:", error);
            }
        },

        updateProfile: async (data) => {
            try {
                set({ isUpdatingProfile: true });
                const res = await axiosInstance.put('auth/update-profile', data);
                set({ authUser: res.data });
                toast.success("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error(error.response?.data?.message || "Error updating profile. Please try again.");
            }
            finally {
                set({ isUpdatingProfile: false });
            }
        },

        connectSocket: () => {
            try {
                const authUser = get().authUser;
                console.log(authUser);
                if (!authUser) return;
                const socket = io("http://localhost:5001", {
                    query: {
                        userId: authUser._id,
                    }
                });
                socket.connect();
                set({ socket: socket });
                socket.on("getOnlineUsers", (userIds) => {
                    set({ onlineUsers: userIds });
                    console.log("Online users:", userIds);
                })
                if (socket.connected) {
                    console.log("Socket connected");
                }
            } catch (error) {
                console.log("error connecting socket:", error);
                toast.error("Error connecting to socket. Please try again.");
            }
        },

        disconnectSocket: () => {
            if (get().socket?.connected) get().socket.disconnect();
        }
    }
})