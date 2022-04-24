import { Container, CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

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
      {/* 去除基本样式 */}
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {/* list不要靠近左侧边界 */}
      <Container>
        <Catalog ></Catalog>
      </Container>
    </ThemeProvider>
  );
}

export default App;
