import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyAdmin = asyncHandler(async(req,res,next)=>{
try {
        // mobile development me headers ke through
        // access token bhejte hai in format bearer <token>
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
       const decodedToken =  jwt.verify(token,process.env.JWT_SECRET)
       if(decodedToken.email !== process.env.ADMIN_EMAIL)
       {
            throw new ApiError(401,"Unauthorized Login")
       }
       next();
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token")
}

})

export default verifyAdmin