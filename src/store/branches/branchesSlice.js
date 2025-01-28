import { createSlice } from "@reduxjs/toolkit";


export const branchesSlice = createSlice({
    name: 'branches',
    initialState: {
        branches : [],
        selectedBranch : null
    },
    reducers: {
        getBranchesData : (state, {payload})=>{
            state.branches = payload
        },
        toggleSelectBranch: (state, {payload})=>{
            state.selectedBranch= payload
        },
        deleteBranchById: (state, {payload})=>{
            state.branches= state.branches.filter((branch)=>branch.id !== payload);
            state.selectedBranch = null;
        },
        addBranch:(state,{payload})=>{
            state.branches.push(payload);
        },
        editBranch: (state,{payload})=>{
            const index = state.branches.findIndex((branch) => branch.id === payload.id);
            if (index !== -1) {
                state.branches[index] = payload;
            }
        }
    },
});

export const { 
    getBranchesData, 
    toggleSelectBranch, 
    deleteBranchById, 
    resetSelectedBranch, 
    addBranch,
    editBranch 
} = branchesSlice.actions;
export default branchesSlice.reducer;