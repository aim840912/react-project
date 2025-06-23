import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const MAX_NOTIFICATIONS = 50;

export interface Notification {
    id: string;
    title: string;
    description: string;
    read: boolean;
    timestamp: string;
}

interface NotificationsState {
    notifications: Notification[];
    unreadCount: number;
}

const initialState: NotificationsState = {
    notifications: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, 'read' | 'id' | 'timestamp'>>) => {
            const newNotification: Notification = {
                id: new Date().getTime().toString(),
                ...action.payload,
                read: false,
                timestamp: new Date().toISOString(),
            };
            state.notifications.unshift(newNotification);
            state.unreadCount += 1;

            if (state.notifications.length > MAX_NOTIFICATIONS) {
                const oldestNotification = state.notifications.pop();
                // 如果被移除的通知是未讀的，也要將未讀計數減一
                if (oldestNotification && !oldestNotification.read) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => n.read = true);
            state.unreadCount = 0;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
});

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;

export default notificationSlice.reducer;