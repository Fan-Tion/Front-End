import { axiosInstance } from './axios';

export const communityApi = {
  post: (payload: any, communityId: string) =>
    axiosInstance.post(`/community/${communityId}/post`, payload),
  uploadImage: (payload: any, communityId: string) =>
    axiosInstance.post(`/community/${communityId}/image`, payload),
  getChannels: async () => {
    return axiosInstance.get('/community/channels');
  },
  getBoards: async (channelId: number) => {
    return axiosInstance.get(`/community/channels/${channelId}`);
  },
};
