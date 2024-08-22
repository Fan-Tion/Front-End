import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../../icons/ArrowIcon';
import {
  ChannelSection,
  List,
  SectionTitle,
  TitleWrap,
} from '../../styled-components/CommunityStyle';
import BoardList from './BoardList';

interface PostList {
  postId: number;
  channelName: string;
  nickname: string;
  title: string;
  content: string;
  likeCnt: number;
  viewCnt: number;
  createDate: string;
  status: string;
}

interface Channel {
  channelId: number;
  organizer: string;
  title: string;
  description: string;
  status: string;
  createDate: string;
  image: string | null;
  postList: PostList[];
}

interface ChannelListProps {
  channels: Channel[];
}

export default function ChannelList({ channels }: ChannelListProps) {
  const navigate = useNavigate();

  const handleChannelClick = async (channelId: number, page: number = 1) => {
    navigate(`/community/${channelId}?page=${page}`);
  };

  return (
    <>
      {channels.map(channel => (
        <ChannelSection key={channel.channelId}>
          <TitleWrap onClick={() => handleChannelClick(channel.channelId)}>
            <SectionTitle>{channel.title}</SectionTitle>
            <ArrowIcon />
          </TitleWrap>
          <List>
            <BoardList
              boards={channel.postList}
              channelId={channel.channelId}
            />
          </List>
        </ChannelSection>
      ))}
    </>
  );
}
