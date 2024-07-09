import { http, HttpResponse } from 'msw';



const members = new Map([
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

import { auctions, members, membersMapType } from './db';


export const handlers = [
  // 더미 이미지 URL 가로채지 않게 하기
  http.get('https://via.placeholder.com/', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // 회원가입 요청
  http.post('/members/signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newMember = await request.json();

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
      inputPassword: string
    ) => {
      const user = map.get(inputEmail);

      if (user && user.password === inputPassword) {
        return user; // 인증 성공 시 유저 객체 반환
      }
      return null; // 인증 실패 시 null 반환
    };

    const user = authenticateUser(members, email, password);

    if (!user) return HttpResponse.json('로그인 실패', { status: 401 });

    return HttpResponse.json('로그인 성공', { status: 200 });
  }),


  //비밀번호 재설정 요청
  http.post('/members/reset-password-request', async ({ request }) => {
    const { email, phoneNumber } = await request.json();

    console.log('Captured a "POST /members/reset-password-request" request : ', email, phoneNumber);

    const user = members.get(email);

    if (!user || user.phoneNumber !== phoneNumber) {
      return HttpResponse.json('사용자를 찾을 수 없습니다.', { status: 404 });
    }

    // 여기서 비밀번호 재설정 로직 수정하기 , 메일 보내고 비밀번호 변경 페이지 보여주기.
    // 테스트 코드여서 일단은 성공응답 반환 
    return HttpResponse.json('비밀번호 재설정 요청이 성공했습니다.', { status: 200 });
  }),

  // 테스트를 위해 생성한 코드
  http.get('/members', () => {
    console.log('Captured a "GET /members" request');
    return HttpResponse.json(Array.from(members.values()));

  // 경매 생성
  http.post('/auction', async ({ request }) => {
    const auctionInfo = await request.json();
    if (!auctionInfo) return HttpResponse.json(auctionInfo, { status: 401 });
    auctions.set(`${new Date()}`, auctionInfo);
    return HttpResponse.json(auctionInfo, { status: 201 });

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
