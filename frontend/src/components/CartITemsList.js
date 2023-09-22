import {useSelector} from 'react-redux';
import CartItem from './CartItem';
const CartITemsList = () => {
  const {cartItems} = useSelector((state)=>state.cartState);
  return (
    <div className="cart-items-list">
      {cartItems.map((item)=>{
        return (
          <CartItem item ={item} key={item.cartID}/>

        );
      })}
    </div>
  )
}

export default CartITemsList
