import { Container, CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetail';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      {/* popup warning message */}
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/>
      {/* 去除基本样式 */}
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {/* list不要靠近左侧边界 */}
      <Container>
        <Route path='/' element={<HomePage/>}/>
        <Route path='catalog' element={<Catalog/>}/>
        <Route path='catalog/:id' element={<ProductDetails/>}/>
        <Route path='about' element={<AboutPage/>}/>
        <Route path='contact' element={<ContactPage/>}/>

      </Container>
    </ThemeProvider>
  );
}

export default App;
