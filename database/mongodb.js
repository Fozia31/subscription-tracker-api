import mongoose from "mongoose";

import {DB_URI } from "../config/env.js";

if(!DB_URI){
    throw new Error("please define DB_URI in .env.<development/pruoduction>.local file");
}
const connectToDB = async () =>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}



export default connectToDB;