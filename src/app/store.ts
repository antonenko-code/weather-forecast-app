import themeReducer from '../features/ToggleTheme/themeSlice';
import favoritesReducer from '../features/Favorites/favoritesSlice';
import weatherReducer from '../features/Weather/weatherSlice';
import executionReducer from '../features/Execution/executionSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['weather', 'execution'],
}

const rootReducer = combineReducers({
  theme: themeReducer,
  favorites: favoritesReducer,
  weather: weatherReducer,
  execution: executionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
