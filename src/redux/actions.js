// 1. Declarar la propiedad en el objeto actions
// 2. Crear el case con la propeiedad creada en 1
// 3. Hacer la funcion que retorne la accion
// 4. Despachar la funcion en un componenente o tunhk

import axios from "axios"


export const actions = {
    setProducts : "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setIsLogin: "SET_IS_LOGIN",
    setCart: "SET_CART"

 
    
    
}

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading =>({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setIsLogin = isLogin => ({
    type: actions.setIsLogin,
    payload: isLogin
})

export const setCart = cart =>({
    type: actions.setCart,
    payload: cart
})




const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });





export const getProductsTunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
      return  axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
      .then(res => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
    }
}
export const getCategoriesTunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
      return  axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
      .then(res => dispatch(setCategories(res.data.data.categories)))
      .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterNameThunk = nameProduct => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${nameProduct}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
        .finally(() => dispatch(setIsLoading(false)));

    }
}

export const addToCartThunk = product => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
        .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCartThunk = () =>{
    return dispatch => {
      dispatch(setIsLoading(true));
      return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
      .then(res => dispatch(setCart(res.data.data.cart)))
      .catch(error => {
        if(error.response.status === 404){
            console.log("El carrito esta vacio")
            dispatch(setCart({}));
        }
    })
      .finally(() => dispatch(setIsLoading(false)));
    }
}



