import styled from 'styled-components';
const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Head = styled.div`
  border: 2px solid white;
  border-bottom: none;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;
  height: 30px;
  line-height: 26px;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 10px;
  border-bottom: 2px solid #e8e9ec;
  border-left: 2px solid #e8e9ec;
  background-color: #e8e9ec;
  font-size: 14px;
  height: 24px;
  line-height: 20px;
`;
const NickName = styled.div`
  width: 100px;
`;

const Time = styled.div`
  margin-left: 5px;
`;
const Content = styled.div`
  width: 100%;
  border: 1px solid #e8e9ec;
  min-height: 30px;
  padding-left: 10px;
`;
const Com = styled.div`
  margin-top: 10px;
`;
export default function Comment() {
  return (
    <Wrap>
      <Head>댓글(3)</Head>
      <Com>
        <Info>
          <NickName>닉네임1</NickName>
          <Time>20시22분</Time>
        </Info>
        <Content>내용</Content>
      </Com>
      <Com>
        <Info>
          <NickName>닉네임2</NickName>
          <Time>20시23분</Time>
        </Info>
        <Content>내용</Content>
      </Com>
      <Com>
        <Info>
          <NickName>닉네임3</NickName>
          <Time>20시32분</Time>
        </Info>
        <Content>내용</Content>
      </Com>
    </Wrap>
  );
}
