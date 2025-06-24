import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LogEntry {
    id: string;
    timestamp: string;
    username: string;
    action: string;
    details: Record<string, any>;
}

interface LogState {
    entries: LogEntry[];
}

const initialState: LogState = {
    entries: [],
};

const logSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        addLog: (state, action: PayloadAction<Omit<LogEntry, 'id' | 'timestamp'>>) => {

            state.entries.unshift({
                ...action.payload,
                id: new Date().getTime().toString() + Math.random().toString(36).substring(2, 9),
                timestamp: new Date().toISOString(),
            });
        },
        clearLogs: (state) => {
            state.entries = [];
        }
    },
});

export const { addLog, clearLogs } = logSlice.actions;

export const selectAllLogs = (state: RootState) => state.logs.entries;

export default logSlice.reducer;