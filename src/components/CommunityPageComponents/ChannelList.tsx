import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../../icons/ArrowIcon';
import {
  ChannelSection,
  List,
  SectionTitle,
  TitleWrap,
} from '../../styled-components/CommunityStyle';
import BoardList from './BoardList';

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

interface ChannelListProps {
  channels: Channel[];
}

export default function ChannelList({ channels }: ChannelListProps) {
  const navigate = useNavigate();

  const handleCannelClick = (channelId: number) => {
    navigate(`/community/channels/${channelId}`);
  };

  return (
    <>
      {channels.map(channel => (
        <ChannelSection key={channel.channelId}>
          <TitleWrap onClick={() => handleCannelClick(channel.channelId)}>
            <SectionTitle>{channel.title}</SectionTitle>
            <ArrowIcon />
          </TitleWrap>
          <List>
            <BoardList boards={channel.boards} />
          </List>
        </ChannelSection>
      ))}
    </>
  );
}
