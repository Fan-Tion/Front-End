import React from "react"
import styled from "styled-components"

const Wrapper = styled.footer`
  display: flex;
 position: fixed;
 bottom: 0;
 width: 100%;
 height: 90px;
 background-color: rgb(52, 58, 64);
 padding: 20px;
 text-align: center;
 justify-content: center;
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
  margin: 5px;
`

export default function LayoutFooter() {
  return(
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