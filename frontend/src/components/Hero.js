
import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import {Link} from 'react-router-dom' ; 
const carouselImages= [hero1 , hero2 , hero3 , hero4]; 

const Hero = () => {
  return (
    <div className="hero-container">
        <div className="hero-layer1">
            <h1 classNam e="hero-title">We are changing people shop</h1>
            <p className="hero-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias labore excepturi illum accusantium, facere odio at et modi doloribus magnam voluptatum amet iste dignissimos. Dolorem adipisci ut inventore architecto sit.</p>
            <div className="hero-layer2">
                <Link to="products" className="to-products-btn">
                    Our Products 
                </Link>
            </div>
        </div>
        <div className="image-container">
            {
                carouselImages.map((img , index)=>{
                    return( 
                        <div key={index} className="carousel-item">
                          <img src={img} className="carousel-img" />    
                        </div>

                    ); 

                })
            }
        </div>
    </div>
    
  )
}

export default Hero
