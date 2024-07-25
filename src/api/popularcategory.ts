import { axiosInstance } from "./axios";


export const categoryApi = {
  getFavoriteCategories : () => axiosInstance.get('/auction/favorite-category'),
}