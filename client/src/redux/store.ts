import { configureStore } from "@reduxjs/toolkit";

import navbarSlice from "./navbarSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
     reducer: {
          navbar: navbarSlice,
          loader: loaderSlice
     }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch