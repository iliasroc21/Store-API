import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';


const defaultState= {
    cartItems : [], 
    numItemsInCart : 0, 
    cartTotal: 0 , 
    shipping : 500 , 
    tax : 0 , 
    orderTotal : 0 
}
const getCartFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("cart")) || defaultState ; 
}

const cartSlice = createSlice(
    {
        name :'cart' , 
        initialState :getCartFromLocalStorage ,
        reducers: {
            addItem : (state ,action) =>{
                const {product} = action.payload;
                //search if the product already exists in the cart ; 
                const item = state.cartItems.find((item)=>item.cartId ===product.cartId);
                if(!item){
                    state.cartItems.push(product);
                }
                else{
                    item.amount += product.amount; 

                }

                state.numItemsInCart += product.amount; 
                state.cartTotal += product.price * product.amount ; 
                cartSlice.caseReducers.calculateTotals(state);
                
                toast.success("item added to the cart");


                

            }, 
            clearCart : (state )=>{localStorage.setItem('cart',JSON.stringify(defaultState)); return defaultState} , 
            removeItem :(state , action)=>{
                const {cartId} = action.payload; 
                const product = state.cartItems.find((item)=>item.cartId === cartId);
                state.cartItems = state.cartItems.filter((item)=>item.cartId!==cartId);
                state.numItemsInCart -=product.amount;  
                state.cartTotal -=product.price - product.amount; 
                cartSlice.caseReducers.calculateTotals(state);
                toast.error('Item Removed From Cart'); 

            } , 
            editItem : (state ,action )=>{
                const {cartId , amount}= action.payload ; 
                const product = state.cartItems.find((item)=>item.cartId ===cartId);
                state.numItemsInCart += amount -product.amount ; 
                state.cartTotal = amount * product.price -product.price*product.amount ;
                product.amount = amount; 
                cartSlice.caseReducers.calculateTotals(state); 
                toast.success("Cart Updated !!");


            } , 
            calculateTotals : (state)=>{
                
                state.tax= 0.3 * state.cartTotal; 
                state.orderTotal = state.cartTotal + state.shipping + state.tax; 
                localStorage.setItem('cart' , JSON.stringify(state));

            }
        }
    }
);

export const {addItem , clearCart , removeItem ,editItem} = cartSlice.actions; 
export default cartSlice.reducer;