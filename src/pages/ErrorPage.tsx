import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width : 100%;
  height: 100vh;
`

const WrapError = styled.div`
  overflow : hidden;
  width: 100%;
  padding : 50px 0 ;
  text-align : center;
  margin : auto;
`

const Title = styled.h1`
  display : block;
  font-weight : bold;
  font-size : 28px;
  color : black;
  line-height : 50px;
`

const Description = styled.p`
  padding-top: 16px;
  font-size : 16px;
  color : #888;
  line-height : 30px;
`
const ErrorImg = styled.img`
  display : block;
  width : 200px;
  height : 170px;
  margin : 17px auto 0 ;
`
const Button = styled.button`
  width : 200px;
  height : 50px;
  color : white;
  font-size : 16px;
  font-weight : bold;
  background-color : #50bcdf;
  border : #50bcdf;
  border-radius : 10px;
  cursor: pointer;
`

export default function ErrorPage() {
  return (
    <Wrapper>
      <WrapError>
        <Title>페이지가 없어요</Title>
        <Description>
          주소가 잘못되었거나 바뀐것 같습니다.<br />
          다시 확인해주시겠어요?
        </Description>
        <ErrorImg src="/img/img_error.png" />
        <Link to="/">
          <Button>홈으로</Button>
        </Link>
      </WrapError>
    </Wrapper>
  )
}
