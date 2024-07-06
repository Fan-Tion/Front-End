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

export const handlers = [
  // 더미 이미지 URL 가로채지 않게 하기
  http.get('https://via.placeholder.com/', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // 회원가입 요청
  http.post('/members/signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newMember = await request.json();
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

    /**
     * @Todo : 사용자 정보를 Map에 저장하고, email을 key로 사용하도록 수정했음. 따라서 이 함수는 로직을 개선할 수 있음.
     */
    const authenticateUser = (map, inputEmail, inputPassword) => {
      for (const [key, user] of map) {
        if (user.email === inputEmail && user.password === inputPassword) {
          return user; // 인증 성공 시 유저 객체 반환
        }
      }
      return null; // 인증 실패 시 null 반환
    };

    const user = authenticateUser(members, email, password);

    if (!user) return HttpResponse.json('로그인 실패', { status: 401 });

    return HttpResponse.json('로그인 성공', { status: 200 });
  }),

  // 테스트를 위해 생성한 코드
  http.get('/members', () => {
    console.log('Captured a "GET /members" request');
    return HttpResponse.json(Array.from(members.values()));
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
