import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedLang = localStorage.getItem('isEnglish');
const storedTheme = localStorage.getItem('isLight');

const navbarInitials = {
     isMenuOpened: false,
     isEnglish: storedLang ? JSON.parse(storedLang) : true,
     isLight: storedTheme ? JSON.parse(storedTheme) : true
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
               localStorage.setItem('isEnglish', JSON.stringify(state.isEnglish)); //save as boolean
          },
          changeTheme(state) {
               state.isLight = !state.isLight;
               localStorage.setItem('isLight', JSON.stringify(state.isLight)); // save as boolean
          }
     }
})

export default navbarSlice.reducer
export const { toggleMenu, changeLanguage, changeTheme } = navbarSlice.actions