import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: (localStorage.getItem('theme') as Theme) || 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: state => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;