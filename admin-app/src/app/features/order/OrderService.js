import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/all-orders`, config);
  if (response.data) {
    return response.data;
  }
};
const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/order/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_url}user/order/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/update/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
export const orderService = {
  getOrders,
  updateOrder,
  deleteOrder,
  getOrder,
};
