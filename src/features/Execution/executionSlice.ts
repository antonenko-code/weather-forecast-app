import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Errors } from '../../types/Errors';
export interface ExecutionSlice {
  isLoading: boolean,
  errors: Errors,
}

const initialState: ExecutionSlice = {
  isLoading: false,
  errors: {
    onGetFavorites: null,
    onGetCurrentLocation: null,
    onLoading: null,
  },
}

export const executionSlice = createSlice({
  name: 'execution',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<Partial<Errors>>) => {
      state.errors = {...state.errors, ...action.payload};
    },

    clearErrors: (state) => {
      state.errors = {
        onGetFavorites: null,
        onGetCurrentLocation: null,
        onLoading: null,
      }
    }
  }
})

export const { setIsLoading, setError, clearErrors } = executionSlice.actions;
export default executionSlice.reducer;
