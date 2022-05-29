import { Container, CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetail';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import ServerError from '../errors/ServerError';
import BasketPage from '../../features/basket/BasketPage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { NotFound } from '../errors/NotFound';
//import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../../util/util';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import CheckoutPage from '../../features/checkout/checkoutPage'
import {useAppDispatch} from '../store/configureStore'
import { fetchBasketAsync, setBasket } from '../../features/basket/basketSlice';
import Register from '../../features/account/Register';
import Login from '../../features/account/Login';
import { fetchCurrentUser } from '../../features/account/accountSlice';


function App() {
  //const {setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async ()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }
    catch(error){
      console.log(error);
    }
  },[dispatch])

  useEffect(()=>{
    initApp().then(()=>setLoading(false));
    // const buyerId = getCookie('buyerId');
    // dispatch(fetchCurrentUser());
    // if (buyerId){
    //   agent.Basket.get()
    //   .then(basket=> dispatch(setBasket(basket)))
    //   .catch(error=>console.log(error))
    //   .finally(()=>setLoading(false))
    // }
    // else{
    //   setLoading(false);
    // }
  },[initApp])

  const[darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode?'dark':'light';
  const theme = createTheme({
    palette:{
      mode:paletteType,
      background:{
        default: paletteType === 'light'? '#eaeaea':'#121212'
      }
    }
  });

  function handleThemeChange(){
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message='Initialising app...'/>
  
  return (
    <ThemeProvider theme={theme}>
      {/* popup warning message */}
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/>
      {/* 去除基本样式 */}
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {/* list不要靠近左侧边界 */}
      <Container>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/catalog/:id' element={<ProductDetails/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/server-error' element={<ServerError/>}/>
          <Route path='/basket' element={<BasketPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>


      </Container>
    </ThemeProvider>
  );
}

export default App;


