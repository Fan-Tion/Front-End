import { axiosInstance } from './axios';

interface Params {
  page: number;
}

export const productListApi = {
  getProductList: (params: Params) =>
    axiosInstance.get('/auction/list', { params }),
};
