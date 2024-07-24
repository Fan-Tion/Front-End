import { axiosInstance } from './axios';

interface Params {
  pageNumber: number;
}

export const productListApi = {
  getProductList: (params: Params) =>
    axiosInstance.get('/auction/list', { params }),
};
