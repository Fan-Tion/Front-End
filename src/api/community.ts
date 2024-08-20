import { axiosInstance, uploadMultipartData } from './axios';

export const communityApi = {
  getChannels: async () => {
    return axiosInstance.get('/community/channel/random');
  },
  getBoards: async (channelId: number, params: { page: number }) => {
    return axiosInstance.get(`/community/${channelId}`, { params });
  },
  postChannel: (payload: any) =>
    uploadMultipartData('/community/channel', payload),

  searchBoard: (
    channelId: number,
    searchOption: string,
    keyword: string,
    page: number,
  ) => {
    return axiosInstance.get(`/community/${channelId}/search`, {
      params: {
        searchOption,
        keyword,
        page,
      },
    });
  },
};
