import{useLoaderData ,Link } from 'react-router-dom'; 
import {formatPrice } from '../utils';
const ProductsList = () => {
    const {products}= useLoaderData(); 
  return (
    <div className="products-list">
        {products.map((product)=>{
            const {image ,title , price ,company} = product.attributes; 
            const dollarsAmount = formatPrice(price); 
            return (
                <Link key={product.id} to={`/products/${product.id}`} className="product">
                    <img src={image} alt={title} />
                    <div className="info">
                        <h4 className="title">{title}</h4>
                        <h3 className="company">{company}</h3>
                    </div>
                    <p className="price">{dollarsAmount}</p>
                    
                </Link>
            );
        })}

    </div>
  )
}

export default ProductsList
