const preset_name = process.env.NEXT_PUBLIC_PRESET_NAME;
const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;

const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const formData = new FormData();

  console.log("cloud name ", cloud_name);
  console.log(preset_name);

  formData.append("file", file);
  formData.append("upload_preset", preset_name);

  console.log(formData);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (error) {
    
    return {
      error,
      data: null,
    };
  }
};

export default uploadImage;
