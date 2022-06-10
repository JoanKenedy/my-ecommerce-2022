import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk, setIsLogin } from '../redux/actions';
import '../styles/navbar.css'
import Cart from './Cart';
import Login from './Login';



const Navbar = () => {
     const [isOpenCart, setIsOpenCart] = useState(false)
    const isLogin = useSelector( state => state.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openCart = () => {
        if(localStorage.getItem("token")){
            setIsOpenCart(!isOpenCart);
            dispatch(getCartThunk());
           
        } else {
            dispatch(setIsLogin(!isLogin))
           
        };
    }


    const openPurchases = () => {
        if(localStorage.getItem("token")){
            navigate("/purchases");
        } else {
            dispatch(setIsLogin(!isLogin))
          
        };
    }

 
    return (
        <div className='container_menu'>
            <nav className='nav'>
                  
                    <div className='tilte_uno'>
                    <span>e-commerce</span>
                    </div>
              
                   
                       
                       <button className='icons'
                       onClick={() => dispatch(setIsLogin(!isLogin))}
                       type='button' >
                        <i className="fa-solid fa-user"></i>
                        </button>
                      
                    
                        
                       <button className='icons'
                       onClick={() => dispatch(openPurchases)}>
                        <i className="fa-solid fa-gift"></i>
                        </button>
                       
                     
                       <button className='icons'
                       onClick={() => dispatch(openCart)}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    
                      
                    
                  
                  
                  
                       < Cart isOpen={isOpenCart} />
                 
                      
                

                <div className={`login ${isLogin ? 'open' : ''}`}>
                   <Login />
                </div>
               
            </nav>
         
                  
          
            
        </div>
    );
};

export default Navbar;