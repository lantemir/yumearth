import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from "redux-thunk";

import { GetAllMessageReducer } from '../pages/Home';

const globalReducer = combineReducers({
  GetSmsStore: GetAllMessageReducer,
})

const initialState  = {

};


export const store = configureStore({
  reducer: globalReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,

  // reducer: {  
  //   // counter: counterReducer,
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
