import React from 'react'
import { AppBar , Switch, Toolbar, Typography} from '@mui/material';

interface Props{
    darkMode : boolean
    handleThemeChange: ()=>void
}
export default function Header({darkMode, handleThemeChange}:Props) {
  return (
      //sx={{mb:4}}, sx is custom style , mb meanings margin bottom
    <AppBar position='static' sx={{mb:4}}>
        <Toolbar>
            <Typography variant='h6'>Re-Store</Typography>
            <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Toolbar>
    </AppBar>
  )
}
