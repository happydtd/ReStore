import React from 'react'
import {  Grid } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props{
    products: Product[];
}

export default function ProductList({products}:Props) {
  return (
    //spaceing meanings 4*8pix = 32pix
    <Grid container spacing={4}>
      {products.map((product)=>(
        // xs={4} meanings take 4 columns
        <Grid item xs={3} key={product.id}>
          <ProductCard  product={product}/>
        </Grid>
      ))}
    </Grid>
  )
}
