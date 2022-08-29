import { createSlice, combineReducers ,createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from '../store/index';
import { Action } from 'redux';
import { profile } from 'console';

const GET_API  = 'fetch/api';


export  const  getApi  = createAsyncThunk(GET_API,async () => {
  const response  = await  fetch('https://www.google.com/') 
  const data  = await response.json();
  return data
})


export const  ProfileSlice = createSlice({
  name: 'Profile',

  initialState:{
    name:null,
  },

  reducers:{
    setProfileData(state,  action) {
      state.name = action.payload
    }
  },

  
  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (state,  action:any)=>{
        state.name  = action.payload.profile.name
      })
  },




//   extraReducers:{
//     [HYDRATE]:(state,  action)=>{
//   //TODO -   handle Client  Side State  override
//   if(!action.payload.profile.name){
//     return state
//   }
//   state.name  =  action.payload.profile.name
// }
//   }
    
});

// [HYDRATE]:(state,  action)=>{
//   //TODO -   handle Client  Side State  override
//   if(!action.payload.profile.name){
//     return state
//   }
//   state.name  =  action.payload.profile.name
// }




export const {setProfileData} = ProfileSlice.actions;
export const selectProfile = (state:  AppState)=> state.profile

export  default ProfileSlice.reducer;


