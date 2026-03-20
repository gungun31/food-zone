import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: (() => {
        try {
            const savedOrders = localStorage.getItem("orders");
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch {
            return [];
        }
    })(),
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("orders", JSON.stringify(state));
        }
    }
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;