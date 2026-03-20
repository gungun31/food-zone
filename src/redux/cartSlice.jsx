import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
    name: "cart",
    initialState:[],
    reducers:{
        addToCart: (state, action) => {
            let existingItem = state.find(item => item.name === action.payload.name)
            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                let finalObj = {...action.payload,quantity:1};
                state.push(finalObj);
            }
        },
        removeCart: (state,action) => {
            let itemIndex = state.findIndex(
                (item) => item.name === action.payload.name
            );
            if(itemIndex != -1){
                state.splice(itemIndex,1);
            }
        },
        increment: (state, action) => {
            let item = state.find(item => item.name === action.payload.name);
            if(item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            let item = state.find(item => item.name === action.payload.name);
            if(item) {
                if(item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    let index = state.findIndex(i => i.name === action.payload.name);
                    if(index !== -1) state.splice(index, 1);
                }
            }
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const {addToCart, removeCart, increment, decrement, clearCart} = cartSlice.actions;
export default cartSlice.reducer;