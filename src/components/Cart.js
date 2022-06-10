import React from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import '../styles/cart.css';

const Cart = ({isOpen}) => {
    
   
    const productsCart = useSelector( state => state.cart?.products);
    let total = 0;

    if(productsCart?.length > 0){
        if(productsCart?.length > 1){
            total = productsCart?.reduce((initial, current) => {
                if(typeof initial === 'number'){
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity)  +  (current.price * current.productsInCart?.quantity)
                }
            });
        } else {
            total = productsCart?.[0].price * productsCart?.[0].productsInCart?.quantity
        }
    }
  

  

    return (
        <div className={`cart_product ${isOpen ? 'openCart': ''}`}>
         <h2>Carrito de Compras</h2>
         <ul>
             {
                 productsCart?.map(product => (
                     <li key={product.id}>
                         <span>{product.brand}</span>
                      <Link to={`/product/${product.id}`}>
                       {product.title}
                      </Link>
                      
                       
                        
                    
                       <div className='product_quantity'>
                          <h3>{product.productsInCart.quantity}</h3>
                       </div>
                       <div className="button-delete">
                                        <button >
                                        <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                       <div className="total">
                                    <b className="label">Total: </b>
                                    <b>$ {product.price * product.productsInCart?.quantity}</b>
                                </div> 
                     </li>
                 ))
             }
         </ul>
         <div className="buy_all">
                <div className="total_price">
                    <h6 className="price_total">Total:$ {total}</h6>
                    <b></b>
                </div>

                <button className='buy_button'
                >
                    Checkout
                </button>
            </div>

        </div>
    );
};

export default Cart;