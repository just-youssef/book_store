import axios from "axios";

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','book_store');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwcreplnt/image/upload',
        formData
      )
      const fileUrl = response.data.secure_url
    //   console.log(fileUrl);

      return fileUrl
    } catch (error) {
      console.error(error);
    }
}