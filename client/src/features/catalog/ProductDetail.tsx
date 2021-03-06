import { Grid, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import { Product } from '../../app/models/product';
// import agent from '../../app/api/agent';
import { NotFound } from '../../app/errors/NotFound';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
//import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync} from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';

export default function ProductDetails() {
    //const {basket, setBasket, removeItem} = useStoreContext();
    const {basket, status} = useAppSelector(state=> state.basket);
    const dispatch = useAppDispatch();
    // 从地址取值
    const {id} = useParams<{id:string}>();
    //const [product, setProduct] = useState<Product|null>(null);
    const product = useAppSelector(state=> productSelectors.selectById(state, id!))
    // const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    //const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i=>i.productId === product?.id);
    const {status: productStatus} = useAppSelector(state=> state.catalog);

    useEffect(()=>{
        if(item) 
            setQuantity(item.quantity);
        if (!product)
            dispatch(fetchProductAsync(parseInt(id!)));    
        // agent.Catalog.details(parseInt(id!))
        // .then(r=>setProduct(r))
        // .catch(e=>console.log(e))
        // .finally(()=>setLoading(false));
    },[id, item, dispatch, product])

    const handleInputChange = (event: any) =>{
        if (event.target.value >= 0){
            setQuantity(parseInt(event.target.value))
        }
        else{

        }
    }

    function handleUpdateCart(){
        //setSubmitting(true);
        //看看页面上数量是否大于购物车数量
        if(!item|| quantity > item.quantity){
            //如果大于则计算差额，然后发送后台
            const updatedQuantity = item? quantity - item.quantity: quantity;
            // agent.Basket.addItem(product?.id!, updatedQuantity)
            //     .then(basket=> dispatch(setBasket(basket)))
            //     .catch(error=>console.log(error))
            //     .finally(()=> setSubmitting(false))
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        } else{
            //如果页面数量少于购物车数量，则相减后取得差额再发送后台
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
            // agent.Basket.removeItem(product?.id!, updatedQuantity)
            // .then(()=> dispatch(removeItem({productId: product?.id!, quantity: updatedQuantity})))
            // .catch(error=>console.log(error))
            // .finally(()=> setSubmitting(false))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...'/>

    if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h3'>{product.name}</Typography>
            <Divider sx={{mb:2}}/>
            <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity in stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        onChange={handleInputChange}
                        variant ='outlined'
                        type='number'
                        label='Quantity in Cart'
                        fullWidth
                        value={quantity}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton
                        disabled={(item?.quantity === quantity) || (!item && quantity === 0)}
                        loading={status.includes('pending')}
                        onClick = {handleUpdateCart}
                        sx={{height:'55px'}}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth
                    >
                        {item?'Update Quantity': 'Add to Cart'}
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>

    </Grid>
  )
}