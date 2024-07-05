import axios, { AxiosError } from 'axios';

/*
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  timeout: 1000,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
  },
});
*/

const API_BASE_URL = 'https://example.com/api';
const API_TOKEN = 'your_api_token';

// axios instance creation.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
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
  }
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
  }
);

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

interface signUpPayloadType {
  email: string;
  password: string;
  nickname: string;
  address: string;
  profileImage: File | null;
}

interface signInPayloadType {
  email: string;
  password: string;
}

const api = {
  signUp: (payload: signUpPayloadType) =>
    axiosInstance.post('/members/signup', payload),
  signIn: (payload: signInPayloadType) =>
    axiosInstance.get('/members/signin', {
      params: payload, // GET 요청의 경우 params를 사용
    }),
};

export default api;
