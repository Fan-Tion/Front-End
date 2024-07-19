import {
  Container,
  EditButton,
  Info,
  InfoName,
  Section,
  Title,
} from '../../styled-components/MyPageStyle';

interface ProfileProps {
  userInfo: any;
}

export default function Profile({ userInfo }: ProfileProps) {

  return (
    <Container>
      <Section>
        <Title>회원정보</Title>
        <EditButton>EDIT</EditButton>
      </Section>
      <Info>
        닉네임 : <InfoName>{userInfo?.nickname}</InfoName>
      </Info>
      <Info>
        전화번호 : <InfoName>{userInfo?.phoneNumber}</InfoName>
      </Info>
      <Info>
        이메일 : <InfoName>{userInfo?.email}</InfoName>
      </Info>
      <Info>
        배송지 주소 : <InfoName>{userInfo?.address}</InfoName>
      </Info>
    </Container>
  );
}
