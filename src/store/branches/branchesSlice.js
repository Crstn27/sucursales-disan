import { createSlice } from "@reduxjs/toolkit";


export const branchesSlice = createSlice({
    name: 'branches',
    initialState: {
        branches : []
    },
    reducers: {
        getBranchesData : (state, {payload})=>{
            state.branches = payload
        }
    },
});

export const { getBranchesData } = branchesSlice.actions;
export default branchesSlice.reducer;