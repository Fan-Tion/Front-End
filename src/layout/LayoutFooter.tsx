import styled from "styled-components"

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #FFD4D4;
  padding: 20px;
  text-align: center;
  justify-content: center;
  margin-top : 100px;
  min-width : 1800px;
  
`

const FooterBox = styled.div`
  display: flex;
  align-items: center;
  gap : 120px;
  color : white;
  white-space: nowrap;
  cursor: pointer;
`

const FooterName = styled.div`
  color : #222;
  font-weight : bold;
  margin: 5px;
  padding : 15px;
  &:hover {
    border-radius : 25px;
    background-color: #FFB3B3;
    transform: scale(1.05); 
  }
`

export default function LayoutFooter() {
  return (
    <Wrapper>
      <FooterBox>
        <FooterName>History</FooterName>
        <FooterName>이용약관</FooterName>
        <FooterName>개인정보 처리방침</FooterName>
        <FooterName>공지사항</FooterName>
      </FooterBox>
    </Wrapper>


  )

}