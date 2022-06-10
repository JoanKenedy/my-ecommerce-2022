import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {  addToCartThunk, getProductsTunk, setIsLogin } from '../redux/actions';
import '../styles/product_detail.css';

const ProductDetail = () => {
   
    const isLogin = useSelector( state => state.isLogin);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [ productFiltered, setProductFiltered ] = useState([]);

    const products = useSelector( state => state.products);
    const productFilter = products.find(productItem => productItem.id === parseInt(id));
   

    useEffect(() => dispatch(getProductsTunk()), [dispatch] );
    
    useEffect(() => {
        if(productFilter){
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productFilter?.category.id}`)
            .then(res => setProductFiltered(res.data.data.products))
        }
    },[dispatch, productFilter])

    const addToCart = () => {
        if(localStorage.getItem("token")){
           
      const product =  {id: Number(id) , quantity: quantity}
      dispatch(addToCartThunk(product))
        }else{
            dispatch(setIsLogin(!isLogin))

        }


    }
 
       
      
    

    return (
        <div className='card_product'>
            <div className="card">
            <div className="item_cards">
               <img src={productFilter?.productImgs[0]} alt="" />
            </div>
            <div className="item_cards">
                <h2>{productFilter?.title}</h2>
                <p>{productFilter?.description}</p>
                <section className='price'>
                    <div className="item-price">
                    <span>Price</span>
                    <h5>$ {productFilter?.price}</h5>
                    </div>
                   

                   <div className='item-price'>
                       <form className='quantity'>
                           <label htmlFor="quantity">Quantity</label>
                           <input type="number"
                           placeholder='Quantity products'
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}/>

                           <button onClick={addToCart}>
                               Add to Cart   <i className="fa-solid fa-cart-shopping"></i>
                           </button>
                       </form>

                      </div>
                </section>
               
            </div>
              
            </div>
           

            <span>Similar products</span>

              
                  <ul className='list_products'>
                      {
                          productFiltered.map(product =>(
                              <li key={product.id}>
                                  <Link to={`/product/${product.id}`} >
                                  <div className="cart_header">
                      <img src={product.productImgs[0]} alt="" />
                      </div>
                      <hr />
                      <div className="cart_footer">
                      <h2>{product.title}</h2> 
                      
                     
                      </div>
                      <div className="sub_item_footer">
                      <span>Price
                      <strong>$ {product.price}</strong>
                      </span>
                
                     <i className="fa-solid fa-cart-shopping"></i>
                      </div>

                                  </Link>

                              </li>
                          ))
                      }
                  </ul>
               


            
        </div>
    );
};

export default ProductDetail;