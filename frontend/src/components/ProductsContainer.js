import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import {useLoaderData} from 'react-router-dom';
import {useState} from 'react' ; 
import{BsFillGridFill , BsList} from 'react-icons/bs';


const ProductsContainer = () => {
  const { meta}= useLoaderData(); 
  const {total} = meta.pagination;
  const [state, setState] =useState("grid");  
  const setActiveStyles = (pattern) => {
    return `grid-list-btn ${
      pattern === state
        ? 'active-btn'
        : 'unactive-btn'
    }`;
  };
  return (
    <>
    <div className="header-container">
      <h4 className="total-products">
        {total} product{total > 1 && 's'}

      </h4>
      <div className="btn-container">
      <button className={setActiveStyles('grid')} onClick={()=>{setState("grid")}}><BsFillGridFill/></button>
      <button className={setActiveStyles('list')} onClick={()=>{setState("list")}}><BsList/></button>

      </div>
      
    </div>
    <div className="products-container">
    {total=== 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : state === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
    </div>
    
       
    </>
  )
}

export default ProductsContainer
