import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginOpen: false,
        isProgressOpen: false
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
        }
    }
});

export const { onOpenLogin, onCloseLogin, onOpenProgress, onCloseProgress } = uiSlice.actions;
export default uiSlice.reducer;