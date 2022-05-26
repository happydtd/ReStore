import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Table, TableHead, TableRow, Typography, TableCell, TableBody, TableContainer, Paper, Box, Grid, Button} from '@mui/material';
//import { useState } from 'react';
import { Link } from 'react-router-dom';
//import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
// import React, { useEffect, useState } from 'react'
// import agent from '../../app/api/agent';
//import { useStoreContext } from '../../app/context/StoreContext';

import BasketSummary from './BasketSummary';
// import { LoadingComponent } from '../../app/layout/LoadingComponent';
// import { Basket } from '../../app/models/basket';

const BasketPage = () => {
    //const {basket, setBasket, removeItem} = useStoreContext();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    // const [status, setStatus] = useState({
    //     loading: false,
    //     name: ''
    // });

    // function handleAddItem(productId: number, name: string){
    //     setStatus({loading:true, name});
    //     agent.Basket.addItem(productId)
    //         .then(basket=> dispatch(setBasket(basket)))
    //         .catch(error=> console.log(error))
    //         .finally(()=> setStatus({loading:false, name:''}))
    // }

    // function handleRemoveItem(productId: number, quantity = 1, name: string){
    //     setStatus({loading:true, name});
    //     agent.Basket.removeItem(productId, quantity)
    //         .then(()=> dispatch(removeItem({productId, quantity})))
    //         .catch(error=> console.log(error))
    //         .finally(()=> setStatus({loading:false, name:''}))
    // }

    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket|null>(null);

    // useEffect(()=>{
    //     agent.Basket.get()
    //     .then(basket=> setBasket(basket))
    //     .catch(error=> console.log(error))
    //     .finally(()=> setLoading(false))
    // }, [])

    // if (loading)
    //     return <LoadingComponent message='Loading basket...'/>

    if (!basket)
        return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                    <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                                <span>{item.name}</span>
                            </Box>
                        {item.name}
                        </TableCell>
                        <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton 
                                // loading={status.loading && status.name === 'rem' + item.productId} 
                                loading={status==='pendingRemoveItem' + item.productId + 'rem'} 
                                onClick={()=> dispatch(removeBasketItemAsync({productId: item.productId, quantity:1, name: 'rem'}))} 
                                color='error'>
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                loading={status ==='pendingAddItem' + item.productId} 
                                onClick={()=> dispatch(addBasketItemAsync({productId:item.productId}))} 
                                color='secondary'>
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">${(item.price /100 * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                loading={status==='pendingRemoveItem' + item.productId + 'del'} 
                                onClick={()=> dispatch(removeBasketItemAsync({productId: item.productId, quantity:item.quantity, name:'del'}))} 
                                color='error'>
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant ='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BasketPage;
