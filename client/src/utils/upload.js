import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "skillstream");

  try {
    // const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
    const res = await axios.post("https://api.cloudinary.com/v1_1/dpunktpg0/image/upload", data);
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;