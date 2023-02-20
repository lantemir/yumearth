import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from "redux-thunk";

// import { GetAllMessageReducer } from '../pages/Home';
import { GetAllMessageReducer } from '../redux/message-reducer';
import { GetProductsReducer } from '../redux/products-reducer';
import { GetProductReducer} from '../redux/product-reducer'

const globalReducer = combineReducers({
  GetSmsStore: GetAllMessageReducer,
  GetProductsStore: GetProductsReducer,
  GetProductStore: GetProductReducer,
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
