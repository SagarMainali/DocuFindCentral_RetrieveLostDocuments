import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        toggleLoader(isLoaderActive, action: PayloadAction<boolean>) {
            return isLoaderActive = action.payload;
        }
    }
})

export default loaderSlice.reducer;
export const { toggleLoader } = loaderSlice.actions;