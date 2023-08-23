import { createSlice } from "@reduxjs/toolkit";

const menuToggelerSlice = createSlice({
     name: 'menuToggler',
     initialState: true,
     reducers: {
          toggleMenu(state) {
               return !state
          }
     }
})

export default menuToggelerSlice.reducer
export const { toggleMenu } = menuToggelerSlice.actions