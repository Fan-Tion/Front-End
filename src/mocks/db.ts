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
  rating: number;
  auctionType: boolean;
  auctionUserNickname: string;
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
  status: boolean;
  bid?: bidType;
}

export interface auctionDetailsDataType {
  data: auctionDetailsType | null;
}

export const auctions: Map<string, auctionDetailsDataType> = new Map([
  [
    '1',
    {
      data: {
        auctionUserNickname: 'John Titor',
        rating: 8.8,
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
    },
  ],
  [
    '2',
    {
      data: {
        auctionUserNickname: 'CERN',
        rating: 6.8,
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
    },
  ],
]);

export const DepositHistory = {
  message: '',
  data: {
    content: {
      '1months': Array.from({ length: 10 }, (_, i) => ({
        balance: 20000,
        type: [
          'USE',
          'SALES',
          'CHARGING',
          'WITHDRAWAL',
          'PAYMENTS_CANCEL',
          'CANCEL',
        ][i % 6],
        createTime: '2024-07-30T15:27:28.825519',
      })),
      '3months': Array.from({ length: 30 }, (_, i) => ({
        balance: 20000,
        type: [
          'USE',
          'SALES',
          'CHARGING',
          'WITHDRAWAL',
          'PAYMENTS_CANCEL',
          'CANCEL',
        ][i % 6],
        createTime: '2024-07-30T15:27:28.825519',
      })),
      '1year': Array.from({ length: 60 }, (_, i) => ({
        balance: 20000,
        type: [
          'USE',
          'SALES',
          'CHARGING',
          'WITHDRAWAL',
          'PAYMENTS_CANCEL',
          'CANCEL',
        ][i % 6],
        createTime: '2024-07-30T15:27:28.825519',
      })),
    },
  },
};

export const JoinHistory = {
  message: '',
  data: {
    content: Array.from({ length: 100 }, (_, i) => ({
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
    content: Array.from({ length: 60 }, (_, i) => ({
      auctionId: `${i + 1}`,
      title: `구매 내역 ${i + 1}`,
      status: true,
      createDate: '20240628',
    })),
  },
};
export const SellHistory = {
  message: '',
  data: {
    content: Array.from({ length: 10 }, (_, i) => ({
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
    content: Array.from({ length: 10 }, (_, i) => ({
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
    balance: 50000,
  },
};
export const BidPrice = {
  message: '',
  data: {
    canUseBalance: 20000,
    totalBidPrice: 30000,
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

export const favoriteCategories = {
  data: [
    {
      title: 'ACCESSORIES',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=ACCESSORIES&keyword=&page=0',
    },
    {
      title: 'ALBUM',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=ALBUM&keyword=&page=0',
    },
    {
      title: 'CLOTHES',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=CLOTHES&keyword=&page=0',
    },
    {
      title: 'FIGURE',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=FIGURE&keyword=&page=0',
    },
    {
      title: 'GAME',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=GAME&keyword=&page=0',
    },
    {
      title: 'PHOTO_CARD',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=PHOTO_CARD&keyword=&page=0',
    },
    {
      title: 'POSTER',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=POSTER&keyword=&page=0',
    },
    {
      title: 'SIGN',
      category:
        'http://localhost:8080/auction/search?searchOption=CATEGORY&categoryOption=SIGN&keyword=&page=0',
    },
  ],
};

export const productList = {
  message: '성공적으로 경매 리스트를 가져왔습니다.',
  data: {
    content: Array.from({ length: 65 }, (_, i) => ({
      auctionId: i,
      title: `${i}번 상품 독도 앞바다에 가라앉은 무역선의 스페인 금화`,
      auctionType: true,
      currentBidPrice: 12000 + i,
      buyNowPrice: 5000 + (i % 2 === 1 ? i * 300 : i * 200),
      bidCount: (i % 4) + 20,
      auctionImage: ['https://via.placeholder.com/300'],
      favoriteCnt: i,
      endDate: '2024-06-30T10:00:00',
      status: true,
    })),
  },
};
export const tradeList = {
  message: '성공적으로 거래중 리스트를 가져왔습니다.',
  data: {
    buyList: Array.from({ length: 10 }, (_, i) => ({
      auctionId: i,
      member: {
        memberId: i,
        email: 'seller12@test.com',
        password: '1234',
        nickname: 'seller',
        auth: true,
        isKakao: false,
        isNaver: true,
        address: 'address2',
        phoneNumber: '01012341234',
        totalRating: 10,
        ratingCnt: 3,
        rating: 5,
        status: 'ACTIVE',
        profileImage: null,
        linkedEmail: null,
        createDate: '2025-07-17T10:00:00',
        withdrawalDate: null,
      },
      title: `구매중 목록${i + 1}`,
      category: null,
      auctionType: true,
      auctionImage: null,
      description: '경매설명',
      currentBidPrice: 1000,
      currentBidder: 'tester',
      buyNowPrice: 5000,
      favoriteCnt: 10,
      createDate: '2025-07-15T10:00:00',
      endDate: '2025-07-17T10:00:00',
      status: false,
      sendChk: true,
      receiveChk: false,
    })),
    sellList: Array.from({ length: 10 }, (_, i) => ({
      auctionId: i,
      member: {
        memberId: i,
        email: 'seller12@test.com',
        password: '1234',
        nickname: 'seller',
        auth: true,
        isKakao: false,
        isNaver: true,
        address: 'address2',
        phoneNumber: '01012341234',
        totalRating: 10,
        ratingCnt: 3,
        rating: 5,
        status: 'ACTIVE',
        profileImage: null,
        linkedEmail: null,
        createDate: '2025-07-17T10:00:00',
        withdrawalDate: null,
      },
      title: `판매중 목록${i + 1}`,
      category: null,
      auctionType: true,
      auctionImage: null,
      description: '경매설명',
      currentBidPrice: 1000,
      currentBidder: 'tester',
      buyNowPrice: 5000,
      favoriteCnt: 10,
      createDate: '2025-07-15T10:00:00',
      endDate: '2025-07-17T10:00:00',
      status: false,
      sendChk: true,
      receiveChk: false,
    })),
  },
};
