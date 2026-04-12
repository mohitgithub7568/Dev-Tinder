import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: [],
    },
    reducers:{
        setFeed : (state, action) => {
            state.feed = action.payload;
        },
        clearFeed : (state) => {
            state.feed = [];
        }
    }
});

export default feedSlice.reducer;
export const { setFeed, clearFeed } = feedSlice.actions;