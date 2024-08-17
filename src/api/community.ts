import { axiosInstance, uploadMultipartData } from './axios';

export const communityApi = {
  getChannels: async () => {
    return axiosInstance.get('/community/channel/random');
  },
  getBoards: async (channelId: number) => {
    return axiosInstance.get(`/community/channels/${channelId}`);
  },
  postChannel: (payload: any) =>
    uploadMultipartData('/community/channel', payload),
};
