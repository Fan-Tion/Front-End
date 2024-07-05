import { http, HttpResponse } from 'msw';

const members = new Map([
  [
    '1',
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
  http.get('https://via.placeholder.com/300', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  http.post('/members/signup', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newMember = await request.json();

    members.set(newMember.id, newMember);

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newMember, { status: 201 });
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
