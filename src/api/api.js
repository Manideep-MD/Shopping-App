import axios from 'axios';
import apiClient, {BASE_URL} from './apiConst';

export const FETCH_CATEGORIES = async () => {
  return await axios.get(`${BASE_URL}categories`);
};

export const FETCH_PRODUCTS = async () => {
    return await axios.get(`${BASE_URL}`);
  };
