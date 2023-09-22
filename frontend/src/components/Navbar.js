import NavLinks from './NavLinks';

import React , {useState , useEffect} from 'react' ;

import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import {NavLink} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import {toggleTheme} from '../features/user/UserSlice';
const themes = {
  winter: 'winter',
  dracula: 'dracula',
};
const Navbar = () => {
 
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const theme =  useSelector((state)=>state.userState.theme);
 const dispatch = useDispatch();
  const handleTheme=()=>{
    dispatch(toggleTheme());
     
  }
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme" , theme);
    



  } , [theme]
  )

  return (
    <nav className="nav">
        <div className="nav-container">
            <div className="nav-start">
                <NavLink to="/" className="home">IR</NavLink>
                <div className="dropdown">
                    <label tabIndex={0}
                    className="btn">
                        <FaBarsStaggered className="btn-icon"/>
                    </label>
                    <ul tabIndex={0}className="links"><NavLinks/></ul>
                </div>
                
            </div>
            <div className="nav-center">
                    <ul className="nav-links"><NavLinks/></ul>
            </div>
            <div className="nav-end">
               <label className='theme'>
                         
                  <input type='checkbox'  onChange={handleTheme}/>

                
                  <BsSunFill className={`${theme === themes.winter ?'sun-icon hide-icon' : 'sun-icon'   }`}/>
                  <BsMoonFill   className={` ${theme === themes.dracula?  'moon-icon hide-icon' : 'moon-icon'   }`}/>
               </label>
                <NavLink to='cart' className='to-cart'>
                <div className='indicator'>
                     <BsCart3 className='icon' />
                       <span className='count'>
                       {numItemsInCart}
                     </span>
                </div>
                </NavLink>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar
