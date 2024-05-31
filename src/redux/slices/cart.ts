import { ProductType } from "@/app/products/[article_id]/page";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
  data: ProductType[];
}

const initialState: IState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
