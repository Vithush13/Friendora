import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPath';

const initialState = {
    messages: []
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async({token, userId})=>{
    const {data} = await axiosInstance.post(API_PATHS.MESSAGES.GET_MESSAGE, {to_user_id: userId}, {headers: {Authorization: `Bearer ${token}`}})
    return data.success ? data: null
})

const messageSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{
        setMessages: (state, action)=>{
            state.messages = action.payload;
        },
        addMessage: (state, action)=>{
            state.messages = [...state.messages, action.payload]
        },
        resetMessages: (state)=>{
            state.messages = [];
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchMessages.fulfilled, (state, action)=>{
            if(action.payload){
                state.messages  = action.payload.messages
            }
        })
    }
})

export const {setMessages,addMessage,resetMessages} = messageSlice.actions;
export default messageSlice.reducer
