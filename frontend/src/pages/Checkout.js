import {useSelector} from 'react-redux';
import {CheckoutForm , SectionTitle , CartTotal} from '../components';
import {toast} from 'react-toastify';
import {redirect }from 'react-router-dom' ;


export const loader =(store)=> async()=>{
  
  const user = store.getState().userState.user; 
  if(!user){
    toast.warn("You are not logged in !!!!"); 
    return redirect("/login");
  }
  return null ; 


}

const Checkout = () => {
  
  const {cartTotal} = useSelector((state)=>state.cartState);
  if(cartTotal ===0){
    return(<SectionTitle text="Your Cart is Empty"/>);
  }
  return (
    <>
    <SectionTitle text="Place Your Order"/>
    <div className="checkout-container">
      <CheckoutForm/>
      <CartTotal/>

    </div>
    </>
  )
}

export default Checkout
