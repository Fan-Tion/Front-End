import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BoardListContainer,
  BoardListHeader,
  BoardListItem,
  BoarderCell,
  ChannelTitle,
  PageContainer,
  ChannelWrap,
  ChannelDescription,
  ChannelImage,
  ChannelItemContainer,
} from '../../styled-components/CommunityStyle';

interface Board {
  id: number;
  title: string;
}

interface Channel {
  channelId: number;
  organizer: string;
  title: string;
  description: string;
  status: string;
  createDate: string;
  image: string | null;
  boards: Board[];
}

export default function BoardPage() {
  const { channelId } = useParams<{ channelId: string }>();
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    async function fetchChannel() {
      try {
        const response = await communityApi.getBoards(Number(channelId));
        setChannel(response.data);
      } catch (error) {
        console.error('게시판을 불러오는 중 에러가 발생했습니다.', error);
      }
    }

    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <div>게시판 정보를 불러오는 중입니다...</div>;
  }

  return (
    <PageContainer>
      <ChannelWrap>
      {channel.image && <ChannelImage src={channel.image} alt={channel.title} />}
      <ChannelItemContainer>
      <ChannelTitle>{channel.title}</ChannelTitle>
      <ChannelDescription>{channel.description}</ChannelDescription>
      </ChannelItemContainer>
      </ChannelWrap>
      <BoardListContainer>
        <BoardListHeader>
          <BoarderCell>번호</BoarderCell>
          <BoarderCell>제목</BoarderCell>
          <BoarderCell>작성자</BoarderCell>
          <BoarderCell>작성일</BoarderCell>
          <BoarderCell>조회수</BoarderCell>
          <BoarderCell>추천</BoarderCell>
        </BoardListHeader>
        {channel.boards.map(board => (
          <BoardListItem key={board.id}>
            <BoarderCell>{board.id}</BoarderCell>
            <BoarderCell>{board.title}</BoarderCell>
            <BoarderCell>작성자</BoarderCell>
            <BoarderCell>2024-08-15</BoarderCell>
            <BoarderCell>123</BoarderCell>
            <BoarderCell>10</BoarderCell>
          </BoardListItem>
        ))}
      </BoardListContainer>
    </PageContainer>
  );
}
