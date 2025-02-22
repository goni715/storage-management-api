import fs from 'fs';
import cloudinary from '../helper/cloudinary';

const uploaToCloudinary = async (path: string) => {
    
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
           path,{ 
            folder: "storage-management"
           }
      )

     
      fs.unlinkSync(path);
      

   return uploadResult;

   
}


export default uploaToCloudinary;