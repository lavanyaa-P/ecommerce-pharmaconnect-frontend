import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sellerLogin=createAsyncThunk<any,any>("/auth/signin",
    async(loginRequest, {rejectWithValue})=>{
        try{
            const response=await api.post("/auth/sellers/login",loginRequest)
            console.log("login otp ",response.data)
        }catch(error){
            console.log("error------",error);
        }
    }
)