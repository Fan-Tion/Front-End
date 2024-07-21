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

export interface auctionsType {
  title: string;
  category: string;
  auctionType: boolean;
  auctionImage: string[];
  description: string;
  currentBidPrice: number;
  buyNowPrice: number;
  endDate: string;
  createDate: string;
}

interface bidType {
  bidPrice: number;
  bidder: string;
  createDate: string;
}

export interface auctionDetailsType {
  auctionType: boolean;
  auctionUserNickname?: string;
  auctionUserRating: number;
  title: string;
  category: string;
  description: string;
  auctionImage: string[];
  buyNowPrice: number;
  currentBidder?: string;
  currentBidPrice: number;
  favoriteCnt?: number;
  createDate: string;
  endDate: string;
  status?: boolean;
  bid?: bidType;
}

export const auctions: Map<string, auctionDetailsType> = new Map([
  [
    '1',
    {
      auctionUserNickname: 'John Titor',
      auctionUserRating: 8.8,
      title: '타임머신 팝니다.',
      category: 'digital',
      auctionType: true,
      auctionImage: [],
      description:
        '목표로 했던 IBM 5100을 입수해서 더이상 필요하지 않게 되었습니다.',
      currentBidder: 'CERN',
      currentBidPrice: 10000,
      buyNowPrice: 1000000,
      favoriteCnt: 39,
      createDate: '2001-01-30T10:03:43',
      endDate: '2032-03-24T10:03:43',
      status: true,
      bid: {
        bidPrice: 139800,
        bidder: 'Beryl',
        createDate: '2001-01-30T10:03:43',
      },
    },
  ],
  [
    '2',
    {
      auctionUserNickname: 'CERN',
      auctionUserRating: 6.8,
      title: '미개봉 IBM 5100 팝니다.',
      category: 'digital',
      auctionType: true,
      auctionImage: [
        'https://via.placeholder.com/500',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/200',
        'https://via.placeholder.com/100',
      ],
      description:
        '레트로 PC 중 엄청 유명하고 숨겨진 기능도 존재한다는 전설적인 머신입니다.',
      currentBidder: 'John Titor',
      currentBidPrice: 200000,
      buyNowPrice: 40000000,
      favoriteCnt: 391,
      createDate: '2001-01-20T10:03:43',
      endDate: '2032-03-28T10:03:43',
      status: true,
      bid: {
        bidPrice: 1398000,
        bidder: 'Beryl2',
        createDate: '2001-01-30T10:04:43',
      },
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
export const Checkout = {
  message: '',
  data: {
    paymentType: '카드',
    amount: 50000,
    orderId: '54dsadsa-dasd454d5-dasdadsa2e',
    customerEmail: 'test@email.com',
    customerName: 'test',
    successUrl: 'http://localhost:8080/payments/success',
    failUrl: 'http://localhost:8080/payments/fail',
    successYn: false,
    cancelYn: false,
    paymentData: '2024-06-30T10:00:00',
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
export const RechargeFail = {
  message: '',
  data: {
    errorCode: 'ERROR_CODE',
    message: '에러 메시지',
    orederId: 'orderId',
  },
};
