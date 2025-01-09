import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to form data
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post('/image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // header for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading the image", error);
    throw error;
  }
};

export default uploadImage;
