import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const store = configureStore({
    reducer:{
        connections: connectionReducer,
        user: userReducer,
        feed: feedReducer,
    },
});
export default store;