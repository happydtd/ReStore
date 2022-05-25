import { createSlice } from "@reduxjs/toolkit";

export interface CounterState{
    data:number;
    title: string;
}

const initialState:CounterState={
    data:42,
    title:'redux toolkit counter'
}


export const counterSlice = createSlice(
    {
        name:"counter",
        initialState,
        reducers: {
            increment: (state, action) =>{
                console.log("incrementstate",state)
                state.data += action.payload;
            },
            decrement: (state, action) =>{
                console.log("decrementstate",state)
                state.data -= action.payload;
            },
        }
    })

export const {increment, decrement} = counterSlice.actions;