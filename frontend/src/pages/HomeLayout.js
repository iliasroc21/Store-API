import {Outlet, useNavigation} from 'react-router-dom'
import{Header , Navbar , Loading } from '../components';
const HomeLayout = () => {
  const navigation = useNavigation();
  return (
    <>
    <Header/>
    <Navbar/>
    
    {navigation.state==="loading"? (
      <Loading />
    ) : (
      <section className='homeLayout-container'>
      <Outlet />
    </section>
    )}
    
    
   


    </>
  )
}

export default HomeLayout
