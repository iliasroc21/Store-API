import { useLoaderData , Link } from 'react-router-dom';
import { generateAmountOptions , formatPrice, customFetch } from '../utils';

import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {addItem} from '../features/cart/CartSlice'
export const loader =async({params})=>{
  
  const response = await customFetch.get(`/products/${params.id}`)
  return {product : response.data.data};

}


const SingleProduct = () => {
  
  const {product} = useLoaderData();
  
  const {image , title , price ,description ,colors ,company} = product;

  const dollarsAmount = formatPrice(price);
  const [amount , setAmount] = useState(1);
  
  const [productColor ,setProductColor]= useState(colors[0]);
  const dispatch = useDispatch(); 
  const cartProduct = {
    cartId : product.id + productColor, 
    productId : product.id , 
    image, 
    title , 
    price ,
    description , 
    productColor , 
    amount : parseInt(amount) ,
    company
  }
  console.log(cartProduct);

  const addTocart =()=>{
    
    dispatch(addItem({product :cartProduct}));
    
  }

  return (

    <section className="single-product">
      
      <div className="navigation-path">
        <ul>
          <li>
            <Link className="path" to="/">Home</Link>
          </li>
          
          <li>
            <Link className="path" to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="product-info">
        <img src={image} alt={title}/>
        <div>
          <h1 className="title">{title}</h1>
          <h4 className="company">{company}</h4>
          <p className="price">{dollarsAmount}</p>
          <p className="description">{description}</p>
          <div className="colors-container">
            {colors.map((color )=>{
              return(
                <button type="button" key={color} className={`color-btn ${color === productColor && 'active-color-btn'}`}
                onClick={()=>setProductColor(color)}
                style={{backgroundColor:color }}></button>
               ); 
            })}
          </div>
          <div className="amount-container">
            <label >
              <h4>Amount</h4>
            </label>
            <select value={amount} onChange={(event)=>setAmount(event.target.value)}>
              {generateAmountOptions(20)}
            </select>
          </div>

        </div>
        <div className="add-to-bag-btn">
          <button onClick={addTocart}>Add To bag</button>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
