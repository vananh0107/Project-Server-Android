import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getEnquiries = async () => {
  const response = await axios.get(`${base_url}user/all-orders`, config);
  if (response.data) {
    return response.data;
  }
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}user/order/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}user/order/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const updateEnquiry = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/update/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
export const enquiryService = {
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
};
