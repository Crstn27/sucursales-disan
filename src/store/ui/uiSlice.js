import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginOpen: false,
        isProgressOpen: false,
        formAction: null
    },
    reducers: {
        onOpenLogin: (state) => {
            state.isLoginOpen = true;
        },
        onCloseLogin: (state) => {
            state.isLoginOpen = false
        },
        onOpenProgress:(state)=>{
            state.isProgressOpen = true
        },
        onCloseProgress:(state)=>{
            state.isProgressOpen = false
        },
        onToggleForm: (state, {payload})=>{
            state.formAction = payload
        }
    }
});

export const { onOpenLogin, onCloseLogin, onOpenProgress, onCloseProgress, onToggleForm } = uiSlice.actions;
export default uiSlice.reducer;