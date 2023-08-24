import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const navbarInitials = {
     isMenuOpened: false,
     isEnglish: true,
     isLight: true
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState: navbarInitials,
     reducers: {
          toggleMenu(state, action: PayloadAction<boolean | undefined>) {
               state.isMenuOpened = action.payload ?? !state.isMenuOpened
          },
          changeLanguage(state) {
               state.isEnglish = !state.isEnglish
          },
          changeTheme(state) {
               state.isLight = !state.isLight
          }
     }
})

export default navbarSlice.reducer
export const { toggleMenu, changeLanguage, changeTheme } = navbarSlice.actions