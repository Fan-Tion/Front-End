import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-right: 2px solid #e2e2e2;
  width: 300px;
  min-width: 240px;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-top: 70px;
`;

const AvatarUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;

  cursor: pointer;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const AvatarInput = styled.input`
  display: none;
`;
const NameTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #777;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const Money = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #777;
`;
const ChargeButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #87ceeb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #00bfff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;
const SignOutButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 16px;
  border: none;
  color: #777;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  background-color: none;
  &:hover {
    color: white;
    background-color: red;
  }
`;

const LogoName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export default function SideProfile() {
  return (
    <Wrapper>
      <Title>마이 페이지</Title>
      <AvatarUpload htmlFor="file">
        <AvatarImg src="https://via.placeholder.com/300" alt="img" />
      </AvatarUpload>
      <AvatarInput id="file" type="file" />
      <NameTitle>닉네임</NameTitle>
      <Name>Anonymous</Name>
      <Money>예치금: 50000원</Money>
      <ChargeButton>충전하기</ChargeButton>
      <Footer>
        <SignOutButton>로그아웃</SignOutButton>
        <LogoName>Fan-tion</LogoName>
      </Footer>
    </Wrapper>
  );
}
