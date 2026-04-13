import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const store = configureStore({
    reducer:{
        connections: connectionReducer,
        user: userReducer,
        feed: feedReducer,
        requests: requestReducer,
    },
});
export default store;