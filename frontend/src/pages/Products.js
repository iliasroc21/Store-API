import {Filters ,ProductsContainer , PaginationContainer} from '../components'; 
import {customFetch} from '../utils';
import {useLoaderData} from 'react-router-dom' ; 
export const loader = async({request})=>{
 
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  console.log(params);
  const response = await customFetch(`/products` ,{params});
  return {products : response.data.data , meta : response.data.meta , params}; 
  
}
const Products = () => {

  return (
    <>
    <Filters/>
    <ProductsContainer/>
    <PaginationContainer/>
    </>
  )
}

export default Products
