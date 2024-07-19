import { http, HttpResponse } from 'msw';
import {
  auctions,
  auctionsType,
  BuyHistory,
  Deposit,
  DepositHistory,
  JoinHistory,
  Likes,
  members,
  membersMapType,
  MyHistory,
} from './db';

export const handlers = [
  // 더미 이미지 URL 가로채지 않게 하기
  http.get('https://via.placeholder.com/', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // 회원가입 요청
  http.post('/members/signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newMember = (await request.json()) as membersMapType;

    if (!newMember) return HttpResponse.json(newMember, { status: 401 });

    members.set(newMember.email, newMember);

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newMember, { status: 201 });
  }),

  // 로그인 요청
  http.post('/members/signin', async ({ request }) => {
    const loginInfo = await request.json();
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
  http.post('/members/reset-password-request', async ({ request }) => {
    const { email, phoneNumber } = await request.json();

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
  }),

  //비밀번호 변경
  http.put('/members/reset-password', async ({ request }) => {
    const { email, newPassword } = await request.json();
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
  http.post('/auction', async ({ request }) => {
    const auctionInfo = (await request.json()) as auctionsType;

    if (!auctionInfo) return HttpResponse.json(auctionInfo, { status: 401 });

    auctions.set(`${new Date()}`, auctionInfo);

    return HttpResponse.json(auctionInfo, { status: 201 });
  }),

  // 예치금 입출금 내역 요청
  http.get('/members/my-blance/:search_option', ({ params, request }) => {
    const { search_option } = params;
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber'), 10) || 1;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const blanceHistory = DepositHistory.data[search_option] || [];
    const paginatedList = blanceHistory.slice(startIndex, endIndex);

    return HttpResponse.json({
      message: '',
      totalCount: blanceHistory.length,
      data: {
        blanceHistory: paginatedList,
      },
    });
  }),
  // 입찰 내역 요청
  http.get('/members/join-auction-list', ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber'), 10) || 1;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = JoinHistory.data.auctionList.slice(
      startIndex,
      endIndex,
    );

    return HttpResponse.json({
      message: '',
      totalCount: JoinHistory.data.auctionList.length,
      data: {
        auctionList: paginatedList,
      },
    });
  }),
  // 구매 내역 요청
  http.get('/members/buy-auction-list', ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber'), 10) || 1;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = BuyHistory.data.auctionList.slice(
      startIndex,
      endIndex,
    );

    return HttpResponse.json({
      message: '',
      totalCount: BuyHistory.data.auctionList.length,
      data: {
        auctionList: paginatedList,
      },
    });
  }),
  // 판매 내역 요청
  http.get('/members/my-auction-list', ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber'), 10) || 1;
    const pageSize = 10; // 페이지당 항목 수
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedList = MyHistory.data.auctionList.slice(
      startIndex,
      endIndex,
    );

    return HttpResponse.json({
      message: '',
      totalCount: MyHistory.data.auctionList.length,
      data: {
        auctionList: paginatedList,
      },
    });
  }),

  // 찜목록 요청
  http.get('/members/my-favorite-auction-list', () => {
    return HttpResponse.json(Likes);
  }),
  // 예치금 요청
  http.get('/members/my-info-deposit', () => {
    return HttpResponse.json(Deposit);
  }),

  // 회원정보 보기 프로필
  http.get('/members/my-info', async ({ request }) => {
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
