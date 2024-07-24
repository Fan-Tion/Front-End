import axios, { AxiosError } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjanNkbGY0NEBnbWFpbC5jb20iLCJtZW1iZXJJZCI6OCwibmlja25hbWUiOiJoaXJhIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcyMTgyODI4NiwiZXhwIjoxNzIxODM1NDg2fQ.VTudyK3aROB4IIiRFF30vIVoquOz8AxC_na5S_HvdKM';
// axios instance creation.
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 1000,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    // 요청 헤더에 인증 토큰 추가
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    return config;
  },
  error => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  response => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터를 처리하고 반환
    return response.data;
  },
  error => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 에러 처리
    const axiosError = error as AxiosError;
    // 여기서 에러 처리 로직 구현
    return Promise.reject(axiosError);
  },
);

export async function uploadMultipartData<T>(
  url: string,
  data: Record<string, any>,
): Promise<T> {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach((file: File) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axiosInstance.post(url, formData, config);
}

// async function fetchCall<T>(
//   url: string,
//   method: 'get' | 'post' | 'put' | 'delete',
//   data?: any
// ): Promise<T> {
//   const config = {
//     method,
//     url,
//     ...(data && { data }), // data가 있을 경우에만 data 속성 추가
//   };
//   return axiosInstance(config);
// }

// Usage
// const id = 123;
// const result = await fetchCall<{ message: string }>(`/posts`, 'post', {
//   itemId: id,
// });
// console.log(result.message);
