import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import {
  Container,
  ContentWrapper,
} from '../../styled-components/CommunityStyle';
import ChannelList from './ChannelList';

interface Board {
  id: number;
  title: string;
}

interface Channel {
  id: number;
  title: string;
  boards: Board[];
}

export default function CommunityComponents() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = await communityApi.getChannels();

        setChannels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('index에러', error);
      }
    }
    fetchChannels();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <ChannelList channels={channels} />
      </ContentWrapper>
    </Container>
  );
}
