import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, ProductDetail, Purchases } from './pages';
import './App.css';
import { Footer, LoadingScreen, Navbar, ProctectedRoutes} from './components';
import { useSelector } from 'react-redux';



function App() {
  const isLoading = useSelector( state => state.isLoading);
  

  return (
    <div className='App'>
      <HashRouter>
        < Navbar/>
  { isLoading && <LoadingScreen /> }
       <Routes>

     <Route  path='/' element={< Home />} />
     <Route  path='/product/:id' element={< ProductDetail />} />
    
    <Route element={ProctectedRoutes}>
    <Route  path='/purchases' element={ < Purchases />} />
    </Route>
    
    
          
       </Routes>
      
      < Footer />


      </HashRouter>

    </div>
  );
}

export default App;
