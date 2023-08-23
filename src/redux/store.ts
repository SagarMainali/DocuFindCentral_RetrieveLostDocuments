import { configureStore } from "@reduxjs/toolkit";

import menuTogglerSlice from "./menuTogglerSlice";

const store = configureStore({
     reducer: {
          menuToggler: menuTogglerSlice
     }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch