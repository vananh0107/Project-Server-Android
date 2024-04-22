import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getCoupon = async (data) => {
  const response = await axios.get(`${base_url}coupon`, config);
  if (response.data) {
    return response.data;
  }
};
const addCoupon = async (data) => {
  const response = await axios.post(`${base_url}coupon`, data, config);
  if (response.data) {
    return response.data;
  }
};
const changeCoupon = async (data) => {
  const response = await axios.put(
    `${base_url}coupon/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const deleteCounpon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const getACoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
export const couponService = {
  getCoupon,
  addCoupon,
  changeCoupon,
  deleteCounpon,
  getACoupon,
};
