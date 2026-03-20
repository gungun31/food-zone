import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        code:"",
        discount: 0,
        applied: false,
        message:"",
    },

    reducers:{
        applyCoupon(state, action)  {
            const { code, discount } = action.payload;
            state.code = code;
            state.discount = discount;
            state.applied = true;
            state.message = `"${code}" applied! You got ${discount} %off.`;
        },
        resetCoupon: (state) => {
            state.code = "";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        }
    }
});

export const {applyCoupon, resetCoupon} = couponSlice.actions;
export default couponSlice.reducer;