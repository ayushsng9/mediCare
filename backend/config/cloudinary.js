import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" // file system --> file ko read,write remove karne ke liye

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        // upload the file
        const uploadResult = await cloudinary.uploader
       .upload(localFilePath,{resource_type: "auto"})  
       fs.unlinkSync(localFilePath)
       return uploadResult;
    } catch (error) {
        if(fs.existsSync(localFilePath))
        {
            fs.unlinkSync(localFilePath) 
        }
        // removes the locally saved temporary files if the upload operation fails
        return null;
    }
}

export {uploadOnCloudinary}
