import { Container, CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useEffect, useState } from 'react';
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
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  //const {setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie('buyerId');
    if (buyerId){
      agent.Basket.get()
      .then(basket=> dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[dispatch])

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
          <Route path='*' element={<NotFound/>}/>
        </Routes>


      </Container>
    </ThemeProvider>
  );
}

export default App;
