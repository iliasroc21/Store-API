import {CartITemsList , CartTotal ,SectionTitle} from '../components'; 
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom' ;

const Cart = () => {
  const user = useSelector((state)=>state.userState.user); 
  const numItemsInCart = useSelector((state)=>state.cartState.numItemsInCart);
  if(numItemsInCart===0){
    return (<SectionTitle text="Your Cart Is Empty"/>)
  }
  
  
  return (
    <>
       <SectionTitle text="Shopping Cart"/>
       <div className="cart-container">
          <div className="cart-items-container">
            <CartITemsList/>
          </div>
          <div className="cart-total-container">
            <CartTotal/>
            {
              user ? (
                <Link className="next-step" to="/checkout">Proceed to Checkout</Link>

              ): (<Link className="next-step" to='/login'>Please Login</Link>)

            }
          </div>
       </div>
    </>
  )
}

export default Cart
