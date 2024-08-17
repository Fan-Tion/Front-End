import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import {
  Container,
  ContentWrapper,
} from '../../styled-components/CommunityStyle';
import ChannelList from './ChannelList';
import AllChannelList from './AllChannelList';

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

export default function CommunityComponents() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = await communityApi.getChannels();

        setChannels(response.data);
      } catch (error) {
        console.error('index에러', error);
      }
    }
    fetchChannels();
  }, []);

  return (
    <Container>
      <AllChannelList/>
      <ContentWrapper>
        <ChannelList channels={channels} />
      </ContentWrapper>
    </Container>
  );
}
