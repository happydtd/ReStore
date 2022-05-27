import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AppPagination } from '../../app/components/AppPagination';
import { CheckBoxButtons } from '../../app/components/CheckBoxButtons';
import { RadioButtonGroup } from '../../app/components/RadioButtonGroup';
//import agent from '../../app/api/agent';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
//import { Product } from '../../app/models/product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from './catalogSlice';
import ProductList from './ProductList';
import { ProductSearch } from './ProductSearch';

const sortOptions =[
  {value:'name', lable:'Alphabetical'},
  {value:'priceDesc', lable:'Price - High to low'},
  {value: 'price', lable: 'Price- Low to high'}
]

export default function Catalog() {

  //const[products, setProducts] = useState<Product[]>([])
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state=> state.catalog);
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);

  useEffect(()=>{
    // agent.Catalog.list()
    // .then(products=>setProducts(products))
    // .catch(error=>console.log(error))
    // .finally(()=>setLoading(false))
    if (!productsLoaded) dispatch(fetchProductsAsync());

  },[productsLoaded, dispatch])

  useEffect(()=>{

    if (!filtersLoaded) dispatch(fetchFilters());
  },[dispatch, filtersLoaded])


  if(status.includes('pending') || !metaData) return <LoadingComponent message='Loading products ...'/>

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb:2}}>
          <ProductSearch/>
        </Paper>
        <Paper sx={{mb:2, p:2}}>
          <RadioButtonGroup 
            selectedValue={productParams.orderBy} 
            options={sortOptions} 
            onChange ={(e)=> dispatch(setProductParams({orderBy: e.target.value}))}
            />
        </Paper>
        <Paper sx={{mb:2, p:2}}>
          <CheckBoxButtons
            items = {brands}
            checked = {productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({brands:items}))}
          />
        </Paper>
        <Paper sx={{mb:2, p:2}}>
          <CheckBoxButtons
            items = {types}
            checked = {productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({types:items}))}
          />
          {/* <FormGroup>
            {types.map((type)=>(
              <FormControlLabel key={type} control={<Checkbox/>} label={type} />
            ))}
          </FormGroup> */}
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}/>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
          <AppPagination 
            metaData = {metaData}
            onPageChange={(page:number)=> dispatch(setProductParams({pageNumber:page}))}
            />
      </Grid>
    </Grid>
  )
}
