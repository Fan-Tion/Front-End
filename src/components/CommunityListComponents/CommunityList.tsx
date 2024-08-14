import styled from 'styled-components';

const Container = styled.div`
  margin: 30px auto;
  width: 100%;
  min-height: 70vh;
  background-color: #fff;
`;

const ListCategory = styled.div`
  margin-left: 10px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 10px;
  margin: 0;
`;

const ListItem = styled.li`
  width: 24%;
  margin: 10px 0;
  padding: 10px 20px;
  height: 120px;
  border: 2px solid #e8e9ec;
  box-sizing: border-box;
  cursor: pointer;
`;

const Title = styled.div`
  display: inline-flex;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

const Intro = styled.div`
  font-size: 14px;
  margin-top: 10px;
  height: 42px; // 높이를 2줄 텍스트에 맞게 조정
  display: -webkit-box;
  -webkit-line-clamp: 2; // 2줄까지만 표시
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em; // 줄 간격 조정
  max-height: 2.4em; // 2줄에 해당하는 최대 높이 설정
`;

const Arrow = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #4fd66e;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
const Divider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function CommunityList() {
  return (
    <Container>
      <ListCategory>ㄱ으로 시작하는</ListCategory>
      <List>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>강철의 연금술사 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>
            강철의 연금술사 토론 게시판 강철의 연금술사 토론 게시판 강철의
            연금술사 토론 게시판 강철의 연금술사 토론 게시판
          </Intro>
        </ListItem>
      </List>
      <ListCategory>ㄴ으로 시작하는</ListCategory>
      <List>
        <ListItem>
          <Divider>
            <Title>낚시 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>낚시를 취미로 하는 사람들의 모임</Intro>
        </ListItem>
      </List>
      <ListCategory>ㅍ으로 시작하는</ListCategory>
      <List>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
        <ListItem>
          <Divider>
            <Title>포켓몬스터 게시판</Title>
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Arrow>
          </Divider>
          <Intro>포켓몬을 좋아하시는 분들이라면 언제든지 환영합니다.</Intro>
        </ListItem>
      </List>
    </Container>
  );
}
