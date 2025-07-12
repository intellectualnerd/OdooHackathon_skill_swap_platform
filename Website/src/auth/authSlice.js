import {createSlice} from "@reduxjs/toolkit";


const initialState={
    user:null,
    session:null,
    isRendered:false,
    profile:null,
    ratings:[]
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
state.user=action.payload.user
state.session=action.payload.session
state.profile=action.payload.profile
state.isRendered=true
        },
        updateProfile:(state,action)=>{
state.profile=action.payload.profile

        },
        logout:(state,action)=>{
state.user=null
state.session=null
state.profile=null
state.isRendered=true

        },
        setRatings:(state,action)=>{
state.ratings=action.payload.ratings
        }
    }
})

export const {login,logout,updateProfile,setRatings}=authSlice.actions
export default authSlice.reducer;