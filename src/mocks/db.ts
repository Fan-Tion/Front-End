export interface membersMapType {
  member_id: string;
  email: string;
  password: string;
  nickname: string;
  address: string;
  phoneNumber: string;
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
      phoneNumber: '1234',
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
  message: '',
  data: {
    '1months': Array.from({ length: 10 }, (_, i) => ({
      blance: 20000,
      type: ['purchase', 'sale', 'charge', 'withdrawal'][i % 4],
      createDate: 20240628,
    })),
    '3months': Array.from({ length: 30 }, (_, i) => ({
      blance: 20000,
      type: ['purchase', 'sale', 'charge', 'withdrawal'][i % 4],
      createDate: 20240428,
    })),
    '1year': Array.from({ length: 60 }, (_, i) => ({
      blance: 20000,
      type: ['purchase', 'sale', 'charge', 'withdrawal'][i % 4],
      createDate: 20240128,
    })),
  },
};

export const JoinHistory = {
  message: '',
  data: {
    auctionList: Array.from({ length: 100 }, (_, i) => ({
      auctionId: `${i + 1}`,
      title: `입찰 내역 ${i + 1}`,
      status: true,
      createDate: '20240628',
    })),
  },
};
export const BuyHistory = {
  message: '',
  data: {
    auctionList: Array.from({ length: 60 }, (_, i) => ({
      auctionId: `${i + 1}`,
      title: `구매 내역 ${i + 1}`,
      status: true,
      createDate: '20240628',
    })),
  },
};
export const MyHistory = {
  message: '',
  data: {
    auctionList: Array.from({ length: 10 }, (_, i) => ({
      auctionId: `${i + 1}`,
      title: `판매 내역 ${i + 1}`,
      status: true,
      createDate: '20240628',
    })),
  },
};

export const Likes = {
  message: '',
  data: {
    auctionList: Array.from({ length: 10 }, (_, i) => ({
      auctionId: `${i + 1}`,
      title: `찜한 상품 ${i + 1}`,
      status: true,
      createDate: '20240628',
    })),
  },
};

export const Deposit = {
  message: '',
  data: {
    blance: 50000,
  },
};
export const Recharge = {
  message: 'Payment confirmed',
  data: {
    orderId: 'orderId',
    orderName: '예치금 충전',
    method: '카드',
    totalAmount: '0',
    status: 'DONE',
    requestdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
  },
};
