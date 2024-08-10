import LinkNaverAccount from '@components/NaverComponent/LinkNaverAccount';
import UnlinkNaverAccount from '@components/NaverComponent/UnlinkNaverAccount';
import { useState } from 'react';
import {
  Container,
  Info,
  Section,
  Title,
} from '../../styled-components/MyPageStyle';

export default function SocialLink() {
  const [isSocialLink] = useState(false);

  return (
    <Container>
      <Section>
        <Title>연동정보</Title>
      </Section>
      {isSocialLink ? (
        <Info>
          네이버 로그인 연동 : O
          <UnlinkNaverAccount />
        </Info>
      ) : (
        <Info>
          네이버 로그인 연동 : X
          <LinkNaverAccount />
        </Info>
      )}
    </Container>
  );
}
