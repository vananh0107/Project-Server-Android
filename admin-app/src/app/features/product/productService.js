import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data;
  }
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const getCategories = async () => {
  const response = await axios.get(`${base_url}category`);
  if (response.data) {
    return response.data;
  }
};
const addProduct = async (data) => {
  const response = await axios.post(`${base_url}product`, data, config);
  if (response.data) {
    return response.data;
  }
};
const updateProduct = async (data) => {
  console.log(data);
  const response = await axios.put(
    `${base_url}product/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const createCategory = async (data) => {
  const response = await axios.post(`${base_url}category`, data, config);
  if (response.data) {
    return response.data;
  }
};
const changeCategory = async (data) => {
  const response = await axios.put(
    `${base_url}category/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
export const productService = {
  getProducts,
  getCategories,
  addProduct,
  createCategory,
  changeCategory,
  deleteCategory,
  getCategory,
  getProduct,
  updateProduct,
  deleteProduct,
};
