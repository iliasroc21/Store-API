import { useRouteError, Link } from "react-router-dom"
const Error = () => {

 
  
  const theme =  useSelector((state)=>state.userState.theme);
  document.documentElement.setAttribute("data-theme" , theme);
    const error = useRouteError(); 
    console.log(error);
    if(error.state === 404){
      return (
        <main className="error">
          <section className="error-center">
            <p className="status">404</p>
            <h1>Page Not Found</h1>
            <p className="message"> Sorry, we couldn’t find the page you’re looking for.</p>
            <div> <Link to="/" className="to-home-btn">Go Back Home</Link></div>
           
          </section>



        </main>
      );
    }


  return (
    <main className="error">
      
        <h4 className="message" >Error in accessing Internet Network !!!
        </h4>
      
    </main>
  )
}

export default Error
