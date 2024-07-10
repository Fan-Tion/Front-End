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

export const DepositHistory = {
  '1months': [
    { id: 1, description: ' 예치금 내역 1' },
    { id: 2, description: ' 예치금 내역 2' },
    { id: 3, description: ' 예치금 내역 3' },
    { id: 4, description: ' 예치금 내역 4' },
    { id: 5, description: ' 예치금 내역 5' },
    { id: 6, description: ' 예치금 내역 6' },
    { id: 7, description: ' 예치금 내역 7' },
    { id: 8, description: ' 예치금 내역 8' },
    { id: 9, description: ' 예치금 내역 9' },
    { id: 10, description: ' 예치금 내역 10' },
    { id: 11, description: ' 예치금 내역 11' },
    { id: 12, description: ' 예치금 내역 12' },
    { id: 13, description: ' 예치금 내역 13' },
    { id: 14, description: ' 예치금 내역 14' },
    { id: 15, description: ' 예치금 내역 15' },
    { id: 16, description: ' 예치금 내역 16' },
    { id: 17, description: ' 예치금 내역 17' },
    { id: 18, description: ' 예치금 내역 18' },
    { id: 19, description: ' 예치금 내역 19' },
    { id: 20, description: ' 예치금 내역 20' },
    { id: 21, description: ' 예치금 내역 21' },
    { id: 22, description: ' 예치금 내역 22' },
    { id: 23, description: ' 예치금 내역 23' },
    { id: 24, description: ' 예치금 내역 24' },
    { id: 25, description: ' 예치금 내역 25' },
    { id: 26, description: ' 예치금 내역 26' },
    { id: 27, description: ' 예치금 내역 27' },
    { id: 28, description: ' 예치금 내역 28' },
    { id: 29, description: ' 예치금 내역 29' },
    { id: 30, description: ' 예치금 내역 30' },
    { id: 31, description: ' 예치금 내역 31' },
    { id: 32, description: ' 예치금 내역 32' },
    { id: 33, description: ' 예치금 내역 33' },
    { id: 34, description: ' 예치금 내역 34' },
    { id: 35, description: ' 예치금 내역 35' },
    { id: 36, description: ' 예치금 내역 36' },
    { id: 37, description: ' 예치금 내역 37' },
    { id: 38, description: ' 예치금 내역 38' },
    { id: 39, description: ' 예치금 내역 39' },
    { id: 40, description: ' 예치금 내역 40' },
    { id: 41, description: ' 예치금 내역 41' },
    { id: 42, description: ' 예치금 내역 42' },
    { id: 43, description: ' 예치금 내역 43' },
    { id: 44, description: ' 예치금 내역 44' },
    { id: 45, description: ' 예치금 내역 45' },
    { id: 46, description: ' 예치금 내역 46' },
    { id: 47, description: ' 예치금 내역 47' },
    { id: 48, description: ' 예치금 내역 48' },
    { id: 49, description: ' 예치금 내역 49' },
    { id: 50, description: ' 예치금 내역 50' },
    { id: 51, description: ' 예치금 내역 51' },
    { id: 52, description: ' 예치금 내역 52' },
    { id: 53, description: ' 예치금 내역 53' },
    { id: 54, description: ' 예치금 내역 54' },
    { id: 55, description: ' 예치금 내역 55' },
    { id: 56, description: ' 예치금 내역 56' },
    { id: 57, description: ' 예치금 내역 57' },
    { id: 58, description: ' 예치금 내역 58' },
    { id: 59, description: ' 예치금 내역 59' },
    { id: 60, description: ' 예치금 내역 60' },
    { id: 61, description: ' 예치금 내역 61' },
    { id: 62, description: ' 예치금 내역 62' },
  ],
  '3months': [
    { id: 1, description: ' 예치금 내역 1' },
    { id: 2, description: ' 예치금 내역 2' },
    { id: 3, description: ' 예치금 내역 3' },
    { id: 4, description: ' 예치금 내역 4' },
    { id: 5, description: ' 예치금 내역 5' },
  ],
  '1year': [
    { id: 1, description: ' 예치금 내역 1' },
    { id: 2, description: ' 예치금 내역 2' },
    { id: 3, description: ' 예치금 내역 3' },
  ],
};

export const JoinHistory = {
  join: [
    { id: 1, description: ' 입찰 내역 1' },
    { id: 2, description: ' 입찰 내역 2' },
    { id: 3, description: ' 입찰 내역 3' },
    { id: 4, description: ' 입찰 내역 4' },
    { id: 5, description: ' 입찰 내역 5' },
    { id: 6, description: ' 입찰 내역 6' },
    { id: 7, description: ' 입찰 내역 7' },
    { id: 8, description: ' 입찰 내역 8' },
    { id: 9, description: ' 입찰 내역 9' },
    { id: 10, description: ' 입찰 내역 10' },
    { id: 11, description: ' 입찰 내역 11' },
  ],
};
export const BuyHistory = {
  buy: [
    { id: 1, description: ' 구매 내역 1' },
    { id: 2, description: ' 구매 내역 2' },
    { id: 3, description: ' 구매 내역 3' },
    { id: 4, description: ' 구매 내역 4' },
    { id: 5, description: ' 구매 내역 5' },
  ],
};
export const MyHistory = {
  my: [
    { id: 1, description: ' 판매 내역 1' },
    { id: 2, description: ' 판매 내역 2' },
    { id: 3, description: ' 판매 내역 3' },
  ],
};
export const Likes = [
  { id: 1, description: ' 찜한 상품 1' },
  { id: 2, description: ' 찜한 상품 2' },
  { id: 4, description: ' 찜한 상품 3' },
  { id: 5, description: ' 찜한 상품 4' },
  { id: 6, description: ' 찜한 상품 5' },
  { id: 7, description: ' 찜한 상품 6' },
  { id: 8, description: ' 찜한 상품 7' },
];

export const Deposit = { id: 1, description: '50,000' };
