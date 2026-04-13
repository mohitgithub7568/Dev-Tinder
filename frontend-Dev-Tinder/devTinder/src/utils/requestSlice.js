import { createSlice } from "@reduxjs/toolkit";
const RequestSlice = createSlice({
    name: "requests",
    initialState: {
        requests: [],
    },
    reducers:{
        setRequests : (state, action) => {
            state.requests = action.payload;
        },
        removeRequests : (state) => {           
             state.requests = []; 
        }
    }
});

export default RequestSlice.reducer;
export const { setRequests, removeRequests } = RequestSlice.actions;