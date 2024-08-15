import { axiosInstance } from './axios';

export const communityApi = {
  getChannels: async () => {
    return axiosInstance.get('/community/channels');
  },
  getBoards: async (channelId: number) => {
    return axiosInstance.get(`/community/channels/${channelId}`);
  },
};
