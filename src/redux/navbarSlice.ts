import { createSlice } from "@reduxjs/toolkit";

const navbarInitials = {
     isMenuOpened: true,
     isEnglish: true,
     isLight: true
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState: navbarInitials,
     reducers: {
          toggleMenu(state) {
               state.isMenuOpened = !state.isMenuOpened
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