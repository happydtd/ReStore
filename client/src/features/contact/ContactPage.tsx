import { Button, ButtonGroup, Typography } from '@mui/material'
import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { decrement, increment } from './counterSlice';
//import { CounterState, increment, decrement } from './counterReducer';

export default function ContactPage() {
  const dispatch =  useAppDispatch();//useDispatch();
  const {data, title} = useAppSelector(state=> state.counter)//useSelector((state:CounterState) => state);
  return (
    <>
    <Typography variant='h2'>{title}</Typography>
    <Typography variant='h5'>the data is {data}</Typography>
    <ButtonGroup>
      <Button onClick={()=>dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
      <Button onClick={()=>dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
    </ButtonGroup>
    </>
    
  )
}