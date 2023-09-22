import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './features/cart/CartSlice'
import userReducer from './features/user/UserSlice';
export const store = configureStore(
    {
        reducer :{
            cartState : cartReducer , 
            userState : userReducer  
        }
    }
);