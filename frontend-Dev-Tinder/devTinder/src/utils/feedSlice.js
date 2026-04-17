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
        // Clear feed when user logs out
        clearFeed : (state) => {
            state.feed = [];
        },
        removeUserFromFeed : (state, action) => {
            const userIdToRemove = action.payload;
            state.feed = state.feed.filter(user => user._id !== userIdToRemove);
        }
    }
});

export default feedSlice.reducer;
export const { setFeed, clearFeed , removeUserFromFeed } = feedSlice.actions;