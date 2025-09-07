import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const doctorSchema = new mongoose.Schema(({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image : {
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    date:{
        type:Number,
        required:true,
    },
    slotsBooked : {
        type: Object,
        default:{}
    }
}),{minimize:false}) 

// minimize: false is used with Mongoose when working with schemas and documents.
//  It controls whether empty objects ({}) in your documents
//  are automatically removed (minimized) when saving to the database.

doctorSchema.pre("save",async function(next){// .pre() hook --> run this before (saving) in this case
    if(!this.isModified("password")) return next(); // if password set / modified then only hash password
    this.password = await bcrypt.hash(this.password,10) // hash password for 10 rounds
    next();
})

doctorSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
    // compares provided password and stored password and returns true and false 
}  

export const Doctor = mongoose.model("Doctor",doctorSchema)

export default Doctor