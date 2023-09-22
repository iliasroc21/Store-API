import {useSelector} from 'react-redux';
import {formatPrice} from '../utils';
const CartTotal = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div className="cart-totals">
      <div className="cart-totals-layout">
        <p className="subTotal">
          <span>SubTotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </p>
        <p className="shipping">
          <span>Shipping </span>
          <span>{formatPrice(shipping)}</span>
        </p>
        <p className="tax">
          <span>tax</span>
          <span>{formatPrice(tax)}</span>
        </p>
        <p className="orderTotal">
          <span>Order Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </p>

      </div>
    </div>
  )
}

export default CartTotal
