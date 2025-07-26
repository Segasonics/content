import mongoose from "mongoose";
//Function for connecting to the database
export const connectDB =async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connectiong to Mongodb",error.message);
        process.exit(1)
    }
}