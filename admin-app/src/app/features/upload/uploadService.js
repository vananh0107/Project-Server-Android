import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const uploadImage = async (data) => {
  console.log(data);
  const response = await axios.post(`${base_url}upload`, data, config);
  if (response.data) {
    return response.data;
  }
};
const deleteImage = async (data) => {
  console.log(data)
  const response = await axios.put(
    `${base_url}upload/delete-img/${data.id}`,data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
export const uploadService = {
  uploadImage,
  deleteImage,
};
