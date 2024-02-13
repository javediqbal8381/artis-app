import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      if(!state.cartItems.includes(action.payload)) {
        state.cartItems = [...state.cartItems, action.payload]
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer