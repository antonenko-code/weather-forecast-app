import { createSlice } from '@reduxjs/toolkit'
import { PreparedWeatherData } from '../../types/PreparedWeatherData';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WeatherState {
  value: PreparedWeatherData | null,
}

const initialState: WeatherState = {
  value: null,
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<PreparedWeatherData | null>) => {
      state.value = action.payload;
    },
  },
})

export const { setWeather } = weatherSlice.actions

export default weatherSlice.reducer
