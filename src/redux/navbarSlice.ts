import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const savedLng = localStorage.getItem('isEnglish');
const savedTheme = localStorage.getItem('isLight');

const navbarInitials = {
     isMenuOpened: false,
     isEnglish: savedLng ? JSON.parse(savedLng) : true,
     isLight: savedTheme ? JSON.parse(savedTheme) : true
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState: navbarInitials,
     reducers: {
          toggleMenu(state, action: PayloadAction<boolean | undefined>) {
               state.isMenuOpened = action.payload ?? !state.isMenuOpened
          },
          changeLanguage(state) {
               state.isEnglish = !state.isEnglish;
               localStorage.setItem('isEnglish', JSON.stringify(state.isEnglish)); // save boolean as string
          },
          changeTheme(state) {
               state.isLight = !state.isLight;
               localStorage.setItem('isLight', JSON.stringify(state.isLight)); // save boolean as string
          }
     }
})

export default navbarSlice.reducer
export const { toggleMenu, changeLanguage, changeTheme } = navbarSlice.actions