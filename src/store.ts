import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
