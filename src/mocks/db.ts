export interface membersMapType {
  email: string;
  password: string;
  nickname: string;
  address: string;
  profileImage: File | null | string;
}

export const members = new Map([
  [
    'Test@email.com', // Map의 Key를 이메일로 저장하면 로그인 요청 Mock API에서 데이터를 빠르게 찾을 수 있을 것...
    {
      email: 'Test@email.com',
      password: 'testPassword123',
      nickname: '테스트',
      address: '테스트 주소',
      profileImage: '',
    },
  ],
]);
