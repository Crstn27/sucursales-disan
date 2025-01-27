import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginOpen: false
    },
    reducers: {
        onOpenLogin: (state) => {
            state.isLoginOpen = true;
        },
        onCloseLogin: (state) => {
            state.isLoginOpen = false
        },
    }
});

export const { onOpenLogin, onCloseLogin } = uiSlice.actions;
export default uiSlice.reducer;