import { axiosInstance } from './axios';

export const communityApi = {
  post: (payload: any, channelId: number) =>
    axiosInstance.post(`/community/${channelId}/post`, payload),
  uploadImage: (payload: any, channelId: number, postId: number | null) =>
    axiosInstance.post(`/community/${channelId}/image`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        postId: postId, // postId를 쿼리 파라미터로 포함
      },
    }),

  getChannels: async () => {
    return axiosInstance.get('/community/channels');
  },
  getBoards: async (channelId: number) => {
    return axiosInstance.get(`/community/channels/${channelId}`);
  },
  getPosts: (communityId: number, postId: number) =>
    axiosInstance.get(`/community/${communityId}/post/${postId}`),

  modifyPosts: (payload: any, channelId: number, postId: number) =>
    axiosInstance.put(`/community/${channelId}/post/${postId}`, payload),
  deletePosts: (channelId: number, postId: number) =>
    axiosInstance.delete(`/community/${channelId}/post/${postId}`),
  getAllChannels: () => axiosInstance.get('/community/channel/all'),
  commentPost: (payload: any, channelId: number, postId: number) =>
    axiosInstance.post(
      `/community/${channelId}/post/${postId}/comment`,
      payload,
    ),
  getComments: (communityId: number, postId: number) =>
    axiosInstance.get(`/community/${communityId}/post/${postId}/comment`),
  modifyComment: (
    payload: any,
    channelId: number,
    postId: number,
    commentId: number,
  ) =>
    axiosInstance.put(
      `/community/${channelId}/post/${postId}/comment/${commentId}`,
      payload,
    ),
  deleteComment: (channelId: number, postId: number, commentId: number) =>
    axiosInstance.delete(
      `/community/${channelId}/post/${postId}/comment/${commentId}`,
    ),
};
