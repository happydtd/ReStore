import React from 'react'
import {  Grid } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { useAppSelector } from '../../app/store/configureStore';

interface Props{
    products: Product[];
}

export default function ProductList({products}:Props) {
  const {productsLoaded} = useAppSelector(state=>state.catalog)
  return (
    //spaceing meanings 4*8pix = 32pix
    <Grid container spacing={4}>
      {products.map((product)=>(
        // xs={4} meanings take 4 columns
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton/>
          ): (
            <ProductCard  product={product}/>
          )}
          
        </Grid>
      ))}
    </Grid>
  )
}
