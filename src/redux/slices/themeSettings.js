import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    settings: {
        direction: 'ltr',
        responsiveFontSizes: true,
        theme: 'light'
    }
}

// Action creators are generated for each case reducer function
export const themeSettingsSlice = createSlice({
    name: 'theme-settings',
    initialState,
    reducers: {
        setThemeSettings: (state, action) => {
            state.settings = action.payload
        }
    }
})

export const {
    setThemeSettings
} = themeSettingsSlice.actions

export default themeSettingsSlice.reducer