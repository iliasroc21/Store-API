import { useDispatch } from "react-redux";
import { generateAmountOptions ,formatPrice } from "../utils";
import {removeItem , clearCart , editItem} from '../features/cart/CartSlice';

const CartItem = ({item}) => {
    const {cartId , productColor,  title , amount ,  company , description , image , price ,} = item ; 
    const dispatch =useDispatch();
    const handleChangeAmount =(event)=>{
        dispatch(editItem({cartId ,amount :  parseInt(event.target.value)}));


    }
    const removeItemFromCart = ()=>{ 
        dispatch(removeItem({cartId}));

    }
  return (
    <article key={item.cartID} className="single-cart-item">
        <img src={image} alt={title} />
        <div className="item-info">
            <h3 className="title">{title}</h3>
            <h4 className="company">{company}</h4>
            <p className="item-color">
                Color: <span className="color-btn" style={{backgroundColor : productColor}}></span>
            </p>
        </div>
        <div className="amount-settings">
            <div className="form-control">
                <label htmlFor="amount" className="label">
                    <span className="label">Amount</span>
                </label>
                <select className="form-select small" name='amount' value={amount} id ='amount' onChange={handleChangeAmount}>
                    {generateAmountOptions(amount +3)}
                </select>

            </div>
            <button
          className='remove-item-btn'
          onClick={removeItemFromCart}
        >
          remove
        </button>


        </div>
        <p className='price'>{formatPrice(price)}</p>

    </article>
  )
}

export default CartItem
