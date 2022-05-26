import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../app/api/agent';
import {Basket} from '../../app/models/basket'
interface BasketState{
    basket:Basket|null;
    status: string;
}

const initialState:BasketState={
    basket:null,
    status:'idle'
}

//<Basket,{productId:number, quantity:number}>第一个是返回类型，第二个是传入参数
export const addBasketItemAsync = createAsyncThunk<Basket,{productId:number, quantity?:number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1})=>{
        try{
            return await agent.Basket.addItem(productId, quantity);
        }
        catch (error){
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void,{productId:number, quantity?:number, name?:string}>(
    'basket/removeBasketItemAsync',
    async({productId, quantity = 1}) =>{
        try{
            return await agent.Basket.addItem(productId, quantity);
        } catch (error){
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers:{
        setBasket: (state,action)=>{
            state.basket = action.payload
        },
        // removeItem: (state, action) =>{
        //     const {productId, quantity} = action.payload;
        //     const itemIndex = state.basket?.items.findIndex(i=>i.productId === productId);
        //     if (itemIndex === -1 || itemIndex === undefined)
        //         return;
        //     state.basket!.items[itemIndex].quantity -= quantity;
        //     if (state.basket?.items[itemIndex].quantity === 0)
        //         state.basket.items.splice(itemIndex, 1);
        // }
    },
    extraReducers:(builder) =>{
        builder.addCase(addBasketItemAsync.pending, (state, action)=>{
            //action.meta.arg.productId可以在browe调试看到
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action)=>{
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action)=>{
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action)=>{
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action)=>{
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i=>i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined)
                return;
            state.basket!.items[itemIndex].quantity -= quantity!;
            if (state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action)=>{
            state.status = 'idle';
        });
    }
})

export const{setBasket} = basketSlice.actions;