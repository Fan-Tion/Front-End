import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 먼저 데이터 구조에 맞는 타입을 정의합니다.
interface Channel {
  channelId: number;
  organizer: string;
  title: string;
  description: string;
  image: string | null;
  status: string;
  createDate: string;
  postList: any | null;
}

interface ChannelGroup {
  character: string;
  channelList: Channel[];
}

const Container = styled.div`
  margin: 30px auto;
  width: 100%;
  min-height: 70vh;
  background-color: #fff;
`;

const ListCategory = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
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
  &:hover {
    border: 2px solid #4fd66e;
  }
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
  height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-height: 2.4em;
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

const consonantOrder = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

function convertToHangulJamo(character: string): string {
  const compatibilityJamo = 'ᄀᄂᄃᄅᄆᄇᄉᄋᄌᄎᄏᄐᄑᄒ';
  const hangulJamo = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';

  const index = compatibilityJamo.indexOf(character);
  return index !== -1 ? hangulJamo[index] : character;
}

export default function CommunityList() {
  const [data, setData] = useState<ChannelGroup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allChannels = async () => {
      try {
        const response = await communityApi.getAllChannels();

        // 자음 변환 및 정렬
        const sortedData = response.data
          .map((group: ChannelGroup) => ({
            ...group,
            character: convertToHangulJamo(group.character),
          }))
          .sort((a: ChannelGroup, b: ChannelGroup) => {
            return (
              consonantOrder.indexOf(a.character) -
              consonantOrder.indexOf(b.character)
            );
          });

        setData(sortedData);
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      }
    };
    allChannels();
  }, []);

  return (
    <Container>
      {data.map(group => (
        <div key={group.character}>
          <ListCategory>"{group.character}"</ListCategory>
          <List>
            {group.channelList.map(channel => (
              <ListItem
                key={channel.channelId}
                onClick={() => navigate(`/community/${channel.channelId}`)}
              >
                <Divider>
                  <Title>{channel.title}</Title>
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
                <Intro>{channel.description}</Intro>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </Container>
  );
}
