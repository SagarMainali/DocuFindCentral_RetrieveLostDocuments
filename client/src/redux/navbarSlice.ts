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
          // the first if condition in the reducer below doesn't work for an unknown reason failing to prevent event bubbling  
          // toggleMenu(state, action: PayloadAction<MouseEvent | boolean | undefined>) {
          //      const data = action.payload;
          //      console.log(data)
          //      if (data instanceof MouseEvent) {
          //           data.stopPropagation();
          //           state.isMenuOpened = !state.isMenuOpened;
          //      }
          //      else if (typeof data === 'boolean') {
          //           state.isMenuOpened = data;
          //      } else {
          //           state.isMenuOpened = !state.isMenuOpened;
          //      }
          // },
          toggleMenu(state, action: PayloadAction<boolean | undefined>) {
               state.isMenuOpened = action.payload ?? !state.isMenuOpened;
               console.log('first')
          },
          changeTheme(state) {
               state.isLight = !state.isLight;
               localStorage.setItem('isLight', JSON.stringify(state.isLight)); // save boolean as string
          }
     }
})

export default navbarSlice.reducer
export const { toggleMenu, changeTheme } = navbarSlice.actions