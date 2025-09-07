import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/MediCare`)
        console.log(`\n MONGODB connected !! DB HOST:${connectionInstance.connection.host}`)
    // injects the host value from the connectionInstance.connection object.
    // If connected to a local MongoDB instance, the console might show: DB HOST: localhost
    // if using MongoDB Atlas: DB HOST: cluster0.mongodb.net

    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1) // study
    // process.exit() is a method in Node.js used to immediately terminate the Node.js process.
    // 0 (default): Indicates a successful exit.
    // Any non-zero value (e.g., 1, 2): Indicates an error or abnormal termination.
    }
}

export default connectDB