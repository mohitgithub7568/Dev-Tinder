import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: {
        connections: [],
    },
    reducers:{
        setConnections : (state, action) => {
            state.connections = action.payload;
        },
        removeConnections : (state) => {           
             state.connections = []; 
        }
    }
});

export default connectionSlice.reducer;
export const { setConnections, removeConnections } = connectionSlice.actions;
    