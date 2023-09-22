import {FormInput , SubmitBtn} from '../components'
import {Form , Link} from 'react-router-dom';
import { customFetch } from '../utils';
import {toast} from 'react-toastify';

import {loginUser} from '../features/user/UserSlice'
import {redirect , useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';

export const action = (store)=>async ({request})=>{
  const formData = await  request.formData();
  const data = Object.fromEntries(formData);
  
  try{
    const response = await customFetch.post("/local/auth/login" , data);
    

    console.log(response);
    console.log(response.data);
    store.dispatch(loginUser(response.data));

    toast.success("You have logged to your account ");
    return  redirect('/');



  }
  catch(err){
    const errorMessage = err?.response?.data?.error?.message  || 'Please check again your credentials'; 
    toast.error(errorMessage);
    return null ;

  }


}

const Login = () => {
  const theme =  useSelector((state)=>state.userState.theme);
  document.documentElement.setAttribute("data-theme" , theme);
    
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const loginAsGuest = async (event)=>{
    event.preventDefault(); 

  
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('welcome guest user');
      navigate("/");
      

    } catch (error) {
      console.log(error);
      toast.error('guest user login error.please try later.');
    }
  
  }
  return (
    <section className="login-container">
        <Form method="post" className="login-form">
            <h4 className="form-title">Login</h4>
            <FormInput label="email" type="email" name="identifier" />
            <FormInput type="password" label ="password" name="password" />
            <div className="submit">
                <SubmitBtn text="login"/>
            </div>
            <button type="submit" className="submit-btn guest" onClick={loginAsGuest}>Gest User</button>
            <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='link'
          >
            register
          </Link>
        </p>

        </Form>
    </section>
  )
}

export default Login
