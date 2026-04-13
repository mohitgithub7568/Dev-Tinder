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
        removeRequests : (state, action) => {    
            // action.payload is the requestId to be removed from the state
            const requestId = action.payload;
            state.requests = state.requests.filter((request) => request._id !== requestId);
        }
    }
});

export default RequestSlice.reducer;
export const { setRequests, removeRequests } = RequestSlice.actions;