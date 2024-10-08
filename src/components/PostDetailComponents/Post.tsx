import { communityApi } from '@api/community';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from './Comment';
import Delete from './Delete';
import Like from './Like';
import Report from './Report';

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 30px 50px;
  box-shadow: 0px 3px 14px rgba(127, 138, 140, 0.09);
  border: 2px solid #e8e9ec;
`;
const Title = styled.div`
  border: 2px solid white;
  border-bottom: none;
  font-size: 24px;
  width: 100%;
  height: 30px;
  line-height: 26px;
`;
const Info = styled.div`
  display: flex;
  border-top: 2px solid #4fd66e;
  border-bottom: 2px solid #e8e9ec;
  border-left: 2px solid #e8e9ec;
  background-color: #e8e9ec;
  font-size: 14px;
  height: 24px;
  line-height: 20px;
`;
const NickName = styled.div`
  width: 100px;
`;

const Time = styled.div`
  margin-left: 5px;
`;
const Content = styled.div`
  width: 100%;
  border-top: 2px solid #e8e9ec;
  margin-top: 30px;
  padding-top: 20px;
  min-height: 500px;
`;
const Handler = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  border-bottom: 2px solid #e8e9ec;
  padding-bottom: 20px;
`;
const ModifyBtn = styled.button`
  margin-top: 50px;
  cursor: pointer;
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    border: 2px solid #4fd66e;
    background-color: #eee;
  }
`;
interface CustomJwtPayload {
  sub: string;
  memberId: number;
  nickname: string;
  roles: string[];
  iat: number;
  exp: number;
}
function convertMarkdownToHtml(markdown: string) {
  // 정규 표현식을 사용하여 Markdown 이미지 구문을 찾고 변환
  return markdown
    .replace(/\n/g, '<br />')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');
}

export default function Post() {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();
  if (!channelId || !postId) {
    return <div>Invalid parameters</div>;
  }
  const [data, setData] = useState<any | null>(null);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState<string>('');
  useEffect(() => {
    const accessToken = Cookies.get('Authorization');

    if (accessToken) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);

        const storedNickname = decodedToken.nickname;

        if (storedNickname) {
          setNickname(storedNickname);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await communityApi.getPosts(
          parseInt(channelId!, 10),
          parseInt(postId!, 10),
        );
        const postData = response.data;
        setData(postData);

        // Markdown을 HTML로 변환
        const processedContent = convertMarkdownToHtml(postData.content);
        setHtmlContent(processedContent);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    getPost();
  }, [channelId, postId]);

  if (!data) {
    return <div>Loading...</div>; // 데이터가 로드되기 전 로딩 화면 표시
  }

  return (
    <Wrap>
      <Container>
        <Title>{data.title}</Title>
        <Info>
          <NickName>{data.nickname}</NickName>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <Time>{new Date(data.createDate).toLocaleString()}</Time>
        </Info>
        <Content dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <Like likeCnt={data.likeCnt as number} />
        <Handler>
          {data.nickname === nickname && (
            <>
              <ModifyBtn
                onClick={() =>
                  navigate(`/community/${channelId}/${data.postId}/modify`, {
                    state: { data },
                  })
                }
              >
                수정
              </ModifyBtn>
              <Delete />
            </>
          )}
        </Handler>
        <Report />
        <Comment channelId={channelId} postId={postId} nickname={nickname} />
      </Container>
    </Wrap>
  );
}
