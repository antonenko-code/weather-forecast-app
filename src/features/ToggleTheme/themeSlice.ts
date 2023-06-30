import { createSlice } from '@reduxjs/toolkit'
import { ColorTheme } from '../../types/ColorTheme';

export interface ThemeState {
  color: ColorTheme
}

const initialState: ThemeState = {
  color: ColorTheme.Light,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.color = state.color === ColorTheme.Light ? ColorTheme.Dark : ColorTheme.Light
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
