import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getDiscount = async (data) => {
  const response = await axios.get(`${base_url}discount`, config);
  if (response.data) {
    return response.data;
  }
};
const addDiscount = async (data) => {
  const response = await axios.post(`${base_url}discount`, data, config);
  if (response.data) {
    return response.data;
  }
};
const changeDiscount = async (data) => {
  const response = await axios.put(
    `${base_url}discount/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const deleteDiscount = async (id) => {
  const response = await axios.delete(`${base_url}discount/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const getADiscount = async (id) => {
  const response = await axios.get(`${base_url}discount/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
export const discountService = {
  getDiscount,
  addDiscount,
  changeDiscount,
  deleteDiscount,
  getADiscount,
};
