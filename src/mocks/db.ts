export interface membersMapType {
  member_id: string;
  email: string;
  password: string;
  nickname: string;
  address: string;
  kakao: boolean;
  naver: boolean;
  total_rating: number;
  rating_cnt: number;
  status: string;
  profileImage: File | null | string;
  create_date: Date | null;
}

export const members: Map<string, membersMapType> = new Map([
  [
    'test@email.com', // Map의 Key를 이메일로 저장하면 로그인 요청 Mock API에서 데이터를 빠르게 찾을 수 있을 것...
    {
      member_id: '1',
      email: 'test@email.com',
      password: '1234',
      nickname: 'tester',
      address: '대한민국 강남',
      kakao: false,
      naver: false,
      total_rating: 5,
      rating_cnt: 3,
      status: 'active',
      profileImage: '',
      create_date: null,
    },
  ],
]);

export const auctions = new Map([
  [
    'auctionId',
    {
      title: 'testAuction',
      auctionType: true,
      auctionImage: [],
      description: '',
      currentBidPrice: 10000,
      buyNowPrice: 1000000,
      endDate: '',
    },
  ],
]);
