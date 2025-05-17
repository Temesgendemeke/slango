import cloudinary from "cloudinary";

const deleteImage = async (public_id) => {
  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECERT,
  });

  cloudinary.v2.uploader.destroy(public_id, (result, error) => {
    if (error) throw new Error(error);

    return result;
  });
};

export default deleteImage;
