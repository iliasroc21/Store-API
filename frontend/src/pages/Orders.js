import {toast} from 'react-toastify';
import {useLoaderData , redirect} from 'react-router-dom'; 
import {customFetch} from '../utils';


import { SectionTitle , OrderList, ComplexPaginationContainer } from '../components';

export const loader = (store)=>async({request})=>{
  const user = store.getState().userState.user ;
  if(!user){
    toast.warn("Your must be logged in to access your orders");
    return redirect("/login");

  } 
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  try{
    const response = await customFetch('/orders', {params , headers : {Authorization : `Bearer ${user.token}`}});
    console.log(response);

    console.log(JSON.stringify(response.data.data));
    return {orders : response.data.data , meta: response.data.meta};


  }
  catch(err){
    console.log(err);
    toast.error("");
    const errorMessage= err?.response?.data?.error?.message || "There was an error while procedding your Orders";
    toast.error(errorMessage);
    if(err?.response?.status === 401 || 403 ) return redirect("/login");



  }
  return null ; 

}
const Orders = () => {
  const {meta} = useLoaderData();
  if(meta.pagination.total < 1){
    return (
      <>
        <SectionTitle text="Please make an Order"/>
      </>
    );

  }
  return (
    <>
         <SectionTitle text="Your Orders"/>
         <OrderList/>
         <ComplexPaginationContainer/>
    </>
  )
}

export default Orders
