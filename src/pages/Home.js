import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  filterCategoryThunk, filterNameThunk, getCategoriesTunk, getProductsTunk } from '../redux/actions';
import '../styles/home.css'

const Home = () => {
    const dispatch = useDispatch();
    const [nameProduct, setNameProduct] = useState(" ")
    const products = useSelector( state => state.products);
    const categories = useSelector( state => state.categories);
    

    useEffect(() => {
      dispatch(getProductsTunk());
      dispatch(getCategoriesTunk());
    }, [dispatch]);

    const searchProduct = e => {
        e.preventDefault();
       dispatch(filterNameThunk(nameProduct));
    }
  
    

    return (
        <div className='container_home'>
            <div className="container_input">
            <form onSubmit={searchProduct} >
              <input type="text"
               value={nameProduct}
               onChange={e => setNameProduct(e.target.value)}
               placeholder="Search product" />
              <button>
              <i className="fa-solid fa-magnifying-glass"></i>
              </button>
          </form>
            </div>
       

          <aside className='container_category'>
              
              
              <p>Category  <i className="fa-solid fa-angle-down"></i></p>    
                 
              
              <hr />
              
              

     
            {
                categories.map(category =>(
                   <button key={category.id}
                       onClick={() => dispatch(filterCategoryThunk(category.id))} type="button">
                         {category.name}
                     </button>
                        ))

            }
        
             

          </aside>

      
            <ul className='list_products'>
            {
              products.map(product =>(
                  

                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}> 
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
                      </div>
                      </Link>

                       <div>
                         
                      <button className='shpoping'
                     >
                        <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    
                      </div>
                  
                   
                  </li>
                
                  
              ))
          }
            </ul>
          
        </div>
    );
};

export default Home;