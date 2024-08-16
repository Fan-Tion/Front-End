import { API_BASE_URL } from '@api/axios';
import { http, HttpResponse } from 'msw';
import {
  auctionDetailsType,
  auctions,
  BidPrice,
  BuyHistory,
  ChannelData,
  Checkout,
  Deposit,
  DepositHistory,
  favoriteCategories,
  JoinHistory,
  Likes,
  members,
  membersMapType,
  productList,
  Recharge,
  RechargeFail,
  searchList,
  SellHistory,
  testImageUrl,
  tradeList,
} from './db';
interface PaymentSuccessRequest {
  orderId: string;
  amount: string;
}
interface BalanceHistoryEntry {
  balance: number;
  type: 'purchase' | 'sale' | 'charge' | 'withdrawal';
  createDate: number;
}

interface DepositHistoryType {
  '1months': BalanceHistoryEntry[];
  '3months': BalanceHistoryEntry[];
  '1year': BalanceHistoryEntry[];
}

function isValidSearchOption(option: any): option is keyof DepositHistoryType {
  return ['1months', '3months', '1year'].includes(option);
}

export const handlers = [
  // 더미 이미지 URL 가로채지 않게 하기
  http.get('https://via.placeholder.com/', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // 회원가입 요청
  http.post(`${API_BASE_URL}/members/signup`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newMember = (await request.json()) as membersMapType;

    if (!newMember) return HttpResponse.json(newMember, { status: 401 });

    members.set(newMember.email, newMember);

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newMember, { status: 201 });
  }),

  // 로그인 요청
  http.post(`${API_BASE_URL}/members/signin`, async ({ request }) => {
    const loginInfo = (await request.json()) as {
      email: string;
      password: string;
    };
    const { email, password } = loginInfo;

    console.log('Captured a "GET /members/signin" request : ', email, password);

    const authenticateUser = (
      map: Map<string, membersMapType>,
      inputEmail: string,
      inputPassword: string,
    ) => {
      const user = map.get(inputEmail);

      if (user && user.password === inputPassword) {
        return user; // 인증 성공 시 유저 객체 반환
      }
      return null; // 인증 실패 시 null 반환
    };

    const user = authenticateUser(members, email, password);

    if (!user) return HttpResponse.json('로그인 실패', { status: 401 });

    return HttpResponse.json(
      { token: 'your_api_token', user },
      { status: 200 },
    ); //로그인 성공시 토큰 , 사용자 정보 반환
  }),

  //비밀번호 재설정 요청
  http.post(
    `${API_BASE_URL}/members/reset-password-request`,
    async ({ request }) => {
      const { email, phoneNumber } = (await request.json()) as {
        email: string;
        phoneNumber: string;
      };

      console.log(
        'Captured a "POST /members/reset-password-request" request : ',
        email,
        phoneNumber,
      );

      const user = members.get(email);

      if (!user || user.phoneNumber !== phoneNumber) {
        return HttpResponse.json('사용자를 찾을 수 없습니다.', { status: 404 });
      }

      return HttpResponse.json(`/${user.email}`, { status: 201 });
    },
  ),

  //비밀번호 변경
  http.put(`${API_BASE_URL}/members/reset-password`, async ({ request }) => {
    const { email, newPassword } = (await request.json()) as {
      email: string;
      newPassword: string;
    };
    const user = members.get(email);

    if (!user) {
      return HttpResponse.json('핸들러오류', { status: 404 });
    }
    user.password = newPassword;
    members.set(email, user);
    return HttpResponse.json('비밀번호 변경 완료', { status: 200 });
  }),

  // 테스트를 위해 생성한 코드
  http.get('/members', () => {
    console.log('Captured a "GET /members" request');
    return HttpResponse.json(Array.from(members.values()));
  }),

  // 경매 생성
  http.post(`${API_BASE_URL}/auction`, async ({ request }) => {
    const auctionInfo = (await request.json()) as auctionDetailsType;

    if (!auctionInfo) return HttpResponse.json(auctionInfo, { status: 401 });

    // auctionUserRating 필드 추가
    const auctionDetails = {
      data: {
        ...auctionInfo,
        auctionUserRating: 10,
      },
    };

    auctions.set(`${new Date()}`, auctionDetails);

    return HttpResponse.json(auctionDetails, { status: 201 });
  }),
  // 경매 수정
  http.put(`${API_BASE_URL}/auction/:auctionId`, async ({ request }) => {
    const auctionInfo = (await request.json()) as auctionDetailsType;

    if (!auctionInfo) return HttpResponse.json(auctionInfo, { status: 401 });

    // auctionUserRating 필드 추가
    const auctionDetails = {
      data: {
        ...auctionInfo,
        auctionUserRating: 10,
      },
    };

    auctions.set(`${new Date()}`, auctionDetails);

    return HttpResponse.json(auctionDetails, { status: 201 });
  }),

  // 예치금 입출금 내역 요청
  http.get(
    `${API_BASE_URL}/members/my-balance/:search_option`,
    ({ params, request }) => {
      const { search_option } = params;

      if (!isValidSearchOption(search_option)) {
        return HttpResponse.json(
          { message: 'Invalid search option' },
          { status: 400 },
        );
      }

      const url = new URL(request.url);

      const pageNumberStr = url.searchParams.get('page');
      const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;

      const pageSize = 10; // 페이지당 항목 수
      const startIndex = pageNumber * pageSize;
      const endIndex = startIndex + pageSize;

      const balanceHistory = DepositHistory.data.content[search_option] || [];
      const paginatedList = balanceHistory.slice(startIndex, endIndex);

      return HttpResponse.json({
        message: '',
        data: {
          totalElements: balanceHistory.length,
          content: paginatedList,
        },
      });
    },
  ),
  // 입찰 내역 요청
  http.get(`${API_BASE_URL}/auction/join-auction-list`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumberStr = url.searchParams.get('page');
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = JoinHistory.data.content.slice(startIndex, endIndex);

    return HttpResponse.json({
      message: '',
      data: {
        totalElements: JoinHistory.data.content.length,
        content: paginatedList,
      },
    });
  }),
  // 구매 내역 요청
  http.get(`${API_BASE_URL}/auction/buy-auction-list`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumberStr = url.searchParams.get('page');
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = BuyHistory.data.content.slice(startIndex, endIndex);

    return HttpResponse.json({
      message: '',
      data: {
        totalElements: BuyHistory.data.content.length,
        content: paginatedList,
      },
    });
  }),
  // 판매 내역 요청
  http.get(`${API_BASE_URL}/auction/sell-auction-list`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumberStr = url.searchParams.get('page');
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = SellHistory.data.content.slice(startIndex, endIndex);

    return HttpResponse.json({
      message: '',
      data: {
        totalElements: SellHistory.data.content.length,
        content: paginatedList,
      },
    });
  }),

  // 찜목록 요청
  http.get(`${API_BASE_URL}/auction/favorite-auction-list`, () => {
    return HttpResponse.json(Likes);
  }),
  // 예치금 요청
  http.get(`${API_BASE_URL}/members/my-info`, () => {
    return HttpResponse.json(Deposit);
  }),
  // 가용예치금 요청
  http.get(`${API_BASE_URL}/bid/balance`, () => {
    return HttpResponse.json(BidPrice);
  }),

  // 회원정보 보기 프로필
  http.get(`${API_BASE_URL}/members/my-info`, async ({ request }) => {
    // Authorization 헤더를 통해 현재 로그인한 사용자의 이메일을 가져옴
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== 'Bearer your_api_token') {
      return HttpResponse.json('Unauthorized', { status: 401 });
    }
    // 토큰이 유효하다고 가정하고, 예를 들어, 로그인 시 반환된 사용자 정보로 설정
    const user = members.get('qudgus5125@naver.com'); //테스트용 이메일 주소
    if (!user) {
      return HttpResponse.json('사용자 정보를 찾을 수 없습니다.', {
        status: 404,
      });
    }
    return HttpResponse.json(user, { status: 200 });
  }),
  //결제 성공
  http.post(`${API_BASE_URL}/payments/success`, async ({ request }) => {
    // 요청 본문을 JSON으로 읽어옵니다.
    const newPost = (await request.json()) as PaymentSuccessRequest;
    // totalAmount를 number로 변환하여 Deposit의 balance에 추가
    const rechargeAmount = parseFloat(newPost.amount);
    Deposit.data.balance += rechargeAmount;

    // Recharge 객체를 응답으로 반환합니다.
    Recharge.data.orderId = newPost.orderId;
    Recharge.data.totalAmount = newPost.amount;

    return HttpResponse.json(Recharge, { status: 200 });
  }),
  //결제 요청
  http.post(`${API_BASE_URL}/payments/request`, async () => {
    return HttpResponse.json(Checkout, { status: 200 });
  }),
  //결제 실패
  http.get(`${API_BASE_URL}/payments/fail`, async () => {
    return HttpResponse.json(RechargeFail, { status: 200 });
  }),
  http.get(`${API_BASE_URL}/auction/view/:auctionId`, async ({ params }) => {
    const auctionId = Array.isArray(params.auctionId)
      ? params.auctionId[0]
      : params.auctionId; // 'string | readonly string[]' 타입을 'string'으로 변환

    const auction = auctions.get(auctionId);

    if (!auction) {
      return HttpResponse.json(
        { message: 'Auction not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json(auction, { status: 200 });
  }),

  // 인기 카테고리 리스트
  http.get(`${API_BASE_URL}/auction/favorite-category`, async () => {
    return HttpResponse.json(favoriteCategories, { status: 200 });
  }),

  // 전체 상품 리스트
  http.get(`${API_BASE_URL}/auction/list`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumberStr = url.searchParams.get('page');
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = productList.data.content.slice(startIndex, endIndex);

    return HttpResponse.json({
      message: '성공적으로 경매 리스트를 가져왔습니다.',
      data: {
        content: paginatedList,
      },
    });
  }),

  //거래중 내역 리스트
  http.get(`${API_BASE_URL}/bid/auction`, async () => {
    return HttpResponse.json({
      message: '성공적으로 거래중 리스트를 가져왔습니다.',
      data: {
        buyList: tradeList.data.buyList,
        sellList: tradeList.data.sellList,
      },
    });
  }),

  //검색 상품 리스트 or 카테고리를 눌렀을 때 상품 리스트
  http.get(`${API_BASE_URL}/auction/search`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumberStr = url.searchParams.get('page');
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 0;
    const pageSize = 12; // 페이지당 항목 수
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = searchList.data.content.slice(startIndex, endIndex);
    return HttpResponse.json({
      message: '성공적으로 거래중 리스트를 가져왔습니다.',
      data: {
        totalPages: searchList.data.totalPages,
        content: paginatedList,
      },
    });
  }),

  http.get(`${API_BASE_URL}/community/channels`, async ({}) => {
    return HttpResponse.json(ChannelData);
  }),
  http.get(
    `${API_BASE_URL}/community/channels/:channelId`,
    async ({ params }) => {
      const channelId = Array.isArray(params.channelId)
        ? params.channelId[0]
        : params.channelId;
      const channel = ChannelData.data.find(
        c => c.id === parseInt(channelId, 10),
      );

      if (!channel) {
        return HttpResponse.json(
          { message: '채널을 찾을 수 없습니다' },
          { status: 404 },
        );
      }

      return HttpResponse.json(
        { message: '성공', data: channel },
        { status: 200 },
      );
    },
  ),
  //게시글이미지업로드
  http.post(`${API_BASE_URL}/community/:communityId/image`, async () => {
    return HttpResponse.json({
      data: { url: testImageUrl.data.url },
    });
  }),
];

// const allPosts = new Map();

// export const handlers = [
//   http.get('/posts', () => {
//     // Construct a JSON response with the list of all posts
//     // as the response body.
//     console.log('Captured a "GET /posts" request');
//     return HttpResponse.json(Array.from(allPosts.values()));
//   }),

//   // ...the other request handlers.
//   // 포스트 요청 보내는 방법
//   http.post('/posts', async ({ request }) => {
//     // Read the intercepted request body as JSON.
//     const newPost = await request.json();

//     allPosts.set(newPost.id, newPost);

//     // Don't forget to declare a semantic "201 Created"
//     // response and send back the newly created post!
//     return HttpResponse.json(newPost, { status: 201 });
//   }),

//   // 쿠키 읽기
//   http.get('/user', ({ cookies }) => {
//     const { session } = cookies;

//     if (!session) {
//       return new HttpResponse(null, { status: 401 });
//     }
//   }),

//   // params를 이용해 id 읽기
//   http.delete('/posts/:id', ({ params }) => {
//     // All request path params are provided in the "params"
//     // argument of the response resolver.
//     const { id } = params;

//     // Let's attempt to grab the post by its ID.
//     const deletedPost = allPosts.get(id);

//     // Respond with a "404 Not Found" response if the given
//     // post ID does not exist.
//     if (!deletedPost) {
//       return new HttpResponse(null, { status: 404 });
//     }

//     // Delete the post from the "allPosts" map.
//     allPosts.delete(id);

//     // Respond with a "200 OK" response and the deleted post.
//     return HttpResponse.json(deletedPost);
//   }),
// ];
