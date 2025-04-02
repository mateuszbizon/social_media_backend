import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dxnthjjaq",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImageToCloudinary(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'social_media',
    });

    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
}