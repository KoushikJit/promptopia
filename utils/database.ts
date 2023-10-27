import mongoose from "mongoose"
import { useState } from "react"
import { dbOptions } from "./databaseOptions"

let isConnected= false
export const connectToDB = async () => {
    mongoose.set({strictQuery: true}) 
    if(!isConnected){
        try {
            await mongoose.connect(process.env.MONGODB_URI as string, dbOptions)
            isConnected= true;
            console.log('db connected')
        } catch (error) {
            console.log(error)
        }
    }
}