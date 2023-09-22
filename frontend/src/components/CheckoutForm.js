import {formatPrice ,customFetch} from '../utils'
import {clearCart} from '../features/cart/CartSlice';
import {toast} from 'react-toastify';
import {redirect ,Form} from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn'; 

export const action =(store)=>async({request})=>{
  console.log("ilias rouchdi");
  const formData = await  request.formData() ; 
  const {name, address} = Object.fromEntries(formData);
  const user= store.getState().userState.user; 
  const {cartItems , orderTotal , numItemsInCart} = store.getState().cartState;
  const info = {name  , address , orderTotal :formatPrice(orderTotal),chargeTotal : orderTotal , cartItems , numItemsInCart }; 


  console.log(JSON.stringify(info));
  try{
    const response = await customFetch.post('/orders' ,{data : info} , {headers : {Authorization : `Bearer ${user.token}`}}) ;
    store.dispatch(clearCart());
    toast.success("Order Placed scuccessfully");
    return redirect("/orders");

  }
  catch(err){
  
    const errorMessage= err?.response?.data?.error?.message  || 'There was an error placing your order';

    console.log(errorMessage);
    toast.error(errorMessage);
    if(err?.response?.status === 401 || 403) return redirect("/login");
    return null ; 

  }
}
const CheckoutForm = () => {
  return (
    <Form method ='POST' className="checkoutForm-container" >
      <h4>Shipping Information</h4>
      <FormInput label='first name' type='text' name="name"/>
      <FormInput label='address' type ='text' name ="address"/>
      <div>
        <SubmitBtn text="place your order"/>

      </div>

    </Form>
  )
}

export default CheckoutForm
