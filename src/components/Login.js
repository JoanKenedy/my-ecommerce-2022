import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, setIsLogin } from '../redux/actions';
import '../styles/login.css'

const Login = () => {
    const isLogin = useSelector(state => state.isLogin);
    const dispatch = useDispatch();
    const [ refresh, setRefresh ] = useState(true);


    const token = localStorage.getItem("token");  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('');
    const loginForm = e => {
        e.preventDefault();
        const credentials = {email, password}
       dispatch(loginThunk(credentials))
        .then(res => {
            localStorage.setItem('token', res.data.data.token)
            setLoginError('');
            dispatch(setIsLogin(!isLogin))
        })
        .catch( error =>{
            setLoginError(error.response.data.message)
        })
            
        
        
    }


    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userName", "");
        setRefresh(!refresh)
    }


 
    return (
        <>

        {
            token ? (
                  <button  className='logout' onClick={logout}>
                      Log out
                  </button>
            ) : (
               <>
               
               <div className='user_image'>
                <i className="fa-solid fa-user"></i>
                </div>
                
    
                <form onSubmit={loginForm} className='login_form'>
                    <div className="credential">
                        <p>
                        <i className="fa-solid fa-envelope"></i>  john@gmail.com
                        </p>
                        <p>
                        <i className="fa-solid fa-lock"></i>  john1234
                        </p>
                    </div>
                    <label htmlFor="">Email</label>
                    <input type="email"
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email} />
                    <label htmlFor="">Password</label>
                  <input type="password"
                  placeholder='Password' 
                  onChange={e => setPassword(e.target.value)}
                  value={password}/>
                   <p className='error'>{loginError}</p>
                  <button className='btn_login'>
                      Login
                  </button>
                  </form>
                </>
               
            )
        }
         
                
           
        
        </>
           
      
    );
};

export default Login;