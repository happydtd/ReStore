import React from 'react'
import { AppBar , Switch, Toolbar, Typography, List, ListItem, Badge , IconButton, Box} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

interface Props{
    darkMode : boolean
    handleThemeChange: ()=>void
}

const midLinks = [
  {title:'catalog', path:'/catalog'},
  {title:'about', path:'/about'},
  {title:'contact', path:'/contact'},
]

const rightLinks = [
  {title:'login', path:'/login'},
  {title:'register', path:'/register'},
]

const navStyles ={
    color:'inherit', 
    textDecoration:'none',
    typography:'h6', 
    '&:hover':{
      color: 'grey.500'
    },
    '&.active':{
      color:'text.secondary'
    }
}

export default function Header({darkMode, handleThemeChange}:Props) {
  return (
      //sx={{mb:4}}, sx is custom style , mb meanings margin bottom
    <AppBar position='static' sx={{mb:4}}>
        {/* sx={{display:'flex', justifyContent:'space-between', alignItems:'center' 可以让子element平均分布 */}
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          {/* box可以分组 */}
          <Box display='flex' alignItems='center'>
            {/* 这里加exact是因为不希望 /catalog也选中'/' */}
            <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>Re-Store</Typography>
            <Switch checked={darkMode} onChange={handleThemeChange}/>
          </Box>
          <Box>
            {/* display: 'flex' 目的是默认值为横向排列 flexDirection :'row' */}
            <List sx={{display:'flex', flexDirection :'row'}}>
              {
                midLinks.map(({title,path})=>(
                  <ListItem
                    component={NavLink}
                    to={path} 
                    key={path} 
                    sx={navStyles}>
                    {title.toUpperCase()}
                  </ListItem>
                ))
              }
            </List>
          </Box>
          <Box  display='flex' alignItems='center'>
          <IconButton size='large' sx={{color:'inherit'}}>
              <Badge badgeContent={4} color='secondary'>
                <ShoppingCart/>
              </Badge>
            </IconButton>
            <List sx={{display:'flex', flexDirection :'row'}}>
              {
                rightLinks.map(({title,path})=>(
                  <ListItem  component={NavLink} to={path} key={path} sx={navStyles}>
                    {title.toUpperCase()}
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Toolbar>
    </AppBar>
  )
}
