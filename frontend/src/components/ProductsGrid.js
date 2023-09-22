import {Link, useLoaderData} from 'react-router-dom'; 
import { formatPrice } from '../utils';
export {formatPrice} from '../utils';
const ProductsGrid = () => {
  const {products} = useLoaderData(); 
  console.log(products);
  
  return (
    <div className="products-grid">
      {products.map((product ,index)=>{
        const {title , price ,image}= product;
        const dollarsAmount = formatPrice(price);
        return(
          <Link key={product.id} to={`/products/${product.id}`} className="product">
            <figure>
              <img src={image} alt={title} />
            </figure>
            <div className="info">
              <h2  className="title">{title}</h2>
              <span className="price">{dollarsAmount}</span>
            </div>
          </Link>
        ); 
      })}

      
    </div>
  )
}

export default ProductsGrid
