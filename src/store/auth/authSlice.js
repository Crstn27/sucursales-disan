import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking' | 'authenticated' | 'not-authenticated'
        user : {},
        errorMessage: null,
    },
    reducers: {
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;  
        },
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = null;
        },
        resetErrorMessage:(state) => {
            state.errorMessage = null
        }

    },
});

export const { onLogin, onLogout, onChecking, resetErrorMessage } = authSlice.actions;