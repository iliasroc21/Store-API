import {SubmitBtn , FormInput} from '../components'
import {Form , Link  ,redirect} from 'react-router-dom';
import { customFetch } from '../utils';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

export const action = async({request})=>{
  const formData =  await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try{
    const response = await customFetch.post('/local/auth/register' ,data);
    toast.success("Account created Successfully");
    return redirect("/login");


  }
  catch(err){
    const errorMessage = err?.response?.data?.error?.message || 'Please check your credenctials !!!!';
    toast.error(errorMessage);
    return null ; 
  }
  
}
const Register = () => {
  const theme =  useSelector((state)=>state.userState.theme);
  document.documentElement.setAttribute("data-theme" , theme);
    
  return (
    <section className="register-container">
      <Form method ="post" className="register-form">
        <h4 className="form-title">Register</h4>
        <FormInput type="text" label ="username" name ="username"/>
        <FormInput type="email" label ="email" name="email"/>
        <FormInput type="password" label ="password" name="password"/>
        <div className="submit">
          <SubmitBtn text="register"/>

        </div>
        
        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='link'
          >
            login
          </Link>
        </p>

      </Form>
    </section>
    
  )
}

export default Register
