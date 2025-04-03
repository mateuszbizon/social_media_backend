import { v2 as cloudinary } from 'cloudinary';
import { UploadFile } from '../types';

cloudinary.config({
  cloud_name: "dxnthjjaq",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImageToCloudinary(filePath: string): Promise<UploadFile> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'social_media',
    });

    return { secureUrl: result.secure_url, imageId: result.public_id }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
}

export async function updateImageInCloudinary(filePath: string, imageId: string): Promise<UploadFile> {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: imageId,
            overwrite: true
        });

        return { secureUrl: result.secure_url, imageId: result.public_id }
        } catch (error) {
        console.error('Cloudinary update upload error:', error);
        return null;
    }
}

export async function deleteImageInCloudinary(imageId: string) {
    try {
        await cloudinary.uploader.destroy(imageId)

        return true
        } catch (error) {
        console.error('Cloudinary destroy error:', error);
        return false;
    }
}