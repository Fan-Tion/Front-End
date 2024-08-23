import { axiosInstance, uploadMultipartData } from './axios';

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
  getComments: (
    communityId: number,
    postId: number,
    params: { page: number },
  ) =>
    axiosInstance.get(`/community/${communityId}/post/${postId}/comment`, {
      params,
    }),
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

  getChannelInfo: (channelId: number) =>
    axiosInstance.get(`/community/channel/${channelId}`),
  getIsLiked: (channelId: number, postId: number) =>
    axiosInstance.get(`/community/${channelId}/postLike/${postId}`),
  toggleLike: (channelId: number, postId: number) =>
    axiosInstance.post(`/community/${channelId}/postLike/${postId}`),
};
