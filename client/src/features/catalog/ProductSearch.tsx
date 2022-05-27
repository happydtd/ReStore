import { debounce, TextField } from '@mui/material'
import React, { useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { setProductParams } from './catalogSlice';

export const ProductSearch = () => {
    const {productParams} = useAppSelector(state=> state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    //debounce的目的是等待客户输入完成查询条件，而不是立刻就开始查询
    const debouncedSearch = debounce((event: any)=>{
        dispatch(setProductParams({searchTerm: event.target.value}))
    },1000)

  return (
    <TextField
        label = 'Search products'
        variant='outlined'
        fullWidth
        value={searchTerm || ''}
        onChange = {event=> {
            setSearchTerm(event.target.value);
            debouncedSearch(event);
        }}
    />
  )
}
