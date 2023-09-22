import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import {ErrorElement} from './components'; 
import {loader as landingLoader} from './pages/Landing';
import {loader as singleProductLoader}  from './pages/SingleProduct';
import {loader as productsLoader} from './pages/Products';
import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login';
import {loader as checkoutLoader} from './pages/Checkout';
import {action as checkoutAction} from './components/CheckoutForm';
import {loader as ordersLoader} from './pages/Orders'; 

import {store} from './store'; 



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader :landingLoader , 
        ErrorElement : <ErrorElement/>
      },
      {
        path: 'products',
        element: <Products />,
        loader : productsLoader , 
        ErrorElement : <ErrorElement/>
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader : singleProductLoader,
        ErrorElement : <ErrorElement/>
      },
      {
        path: 'cart',
        element: <Cart />,
        ErrorElement : <ErrorElement/>
      },
      { path: 'about', element: <About /> ,
      ErrorElement : <ErrorElement/>},
      {
        path: 'checkout',
        element: <Checkout />,
        loader : checkoutLoader(store) , 
        action: checkoutAction(store),
        ErrorElement : <ErrorElement/>
      },
      {
        path: 'orders',
        element: <Orders />,
        loader : ordersLoader(store), 
        ErrorElement : <ErrorElement/>
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action : loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action :registerAction , 
  },
]);
function App() {
  return (
    <RouterProvider router ={router}/>
  );
}

export default App;
