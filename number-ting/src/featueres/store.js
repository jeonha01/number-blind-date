import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import uiSlice from "./common/uiSlice";
// import productSlice from "./product/productSlice";
// import cartSlice from "./cart/cartSlice";
// import orderSlice from "./order/orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    // cart: cartSlice,
    ui: uiSlice,
    // order: orderSlice,
  },
}); 
export default store;