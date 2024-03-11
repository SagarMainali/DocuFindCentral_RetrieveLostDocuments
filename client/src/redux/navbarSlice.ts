import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem('isLight');

const navbarInitials = {
     isMenuOpened: false,
     isLight: storedTheme ? JSON.parse(storedTheme) : true
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState: navbarInitials,
     reducers: {
          toggleMenu(state, action: PayloadAction<boolean | undefined>) {
               state.isMenuOpened = action.payload ?? !state.isMenuOpened
          },
          changeTheme(state) {
               state.isLight = !state.isLight;
               localStorage.setItem('isLight', JSON.stringify(state.isLight)); // save boolean as string
          }
     }
})

export default navbarSlice.reducer
export const { toggleMenu, changeTheme } = navbarSlice.actions