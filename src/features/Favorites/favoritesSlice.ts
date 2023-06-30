import { createSlice } from '@reduxjs/toolkit'
import { PreparedWeatherData } from '../../types/PreparedWeatherData';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  items: PreparedWeatherData[],
  selected: string | null,
}

const initialState: ThemeState = {
  items: [],
  selected: null,
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<PreparedWeatherData | PreparedWeatherData[]>) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.location.place !== action.payload);

      if (state.selected === action.payload) {
        state.selected = null;
      }
    },

    clearAllFavorites: (state) => {
      state.items = [];
      state.selected = null;
    },

    selectFavorite: (state, action: PayloadAction<string | null>) => {
      state.selected = action.payload;
    },
  },
})

export const { addToFavorites, selectFavorite, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
