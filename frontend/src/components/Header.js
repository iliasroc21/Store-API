import {Link ,useNavigate} from 'react-router-dom';
import {logoutUser} from '../features/user/UserSlice'
import {useSelector , useDispatch} from 'react-redux';
import {clearCart} from '../features/cart/CartSlice';
const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.userState);
  const handleLogOut  = ()=>{
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    

  }
  return (
    
    <header className="login-register">
        <div className="layer1">
          {user ? (
            <div className="logout-container">
               <p className="welcome">Hello {user.username}</p>
               <button className="logout-btn" onClick={handleLogOut}>Log Out </button>
            </div>

          ): (

            <div className="layer2">
                <Link to="/login" className="login-link">
                Sign in / Guest
                </Link>
                <Link to="/register" className="register-link">
                Create an Account
                </Link>
            </div>
          )}
            
        </div>
    </header>
  )
}

export default Header
