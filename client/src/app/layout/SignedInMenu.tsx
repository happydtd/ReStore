import { Button, Menu ,MenuItem} from '@mui/material';
import React from 'react'
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const SignedInMenu = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button 
            color = 'inherit'
            sx={{typography: 'h6'}}
            onClick={handleClick}
        >
          {user?.email}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My orders</MenuItem>
          <MenuItem onClick={()=>{
              dispatch(clearBasket());
              dispatch(signOut());
            }}>Logout</MenuItem>
        </Menu>
      </div>
    );
}

export default SignedInMenu;
