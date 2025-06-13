import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        try {
            set({ isUsersLoading: true });
            const response = await axiosInstance.get('messages/users');
            set({ users: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error: Failed to fetch users');
        }
        finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const response = await axiosInstance.get(`messages/${userId}`);
            set({ messages: response.data });

        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Error: Failed to fetch messages');
        }
        finally {
            set({ isMessagesLoading: false });
        }
    },

    setSelectedUser: (selectedUser) => set((state) => set({ selectedUser }))

}));