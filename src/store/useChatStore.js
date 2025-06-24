import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useChatStore = create((set, get) => ({
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

    getMessages: async () => {
        try {
            set({ isMessagesLoading: true });
            const { selectedUser } = get();
            const response = await axiosInstance.get(`messages/${selectedUser._id}`);
            set({ messages: response.data });

        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Error: Failed to fetch messages');
        }
        finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending message. Please try again.");
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })

}));