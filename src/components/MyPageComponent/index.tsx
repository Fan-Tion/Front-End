import React from 'react';
import SideProfile from './SideProfile';
import styled from 'styled-components';
import Profile from './Profile';
import HistoryView from './HistoryView';


const Wrapper = styled.div`
  display: flex;
  width : 100%;
  height : 100%;
  
`
const ColumnWrap = styled.div`
  display : flex;
  align-items : center;
  width : 1800px;
  flex-direction : column;
  gap : 100px;
  margin-top : 40px;
 
  
`
const PasswordEditButton = styled.button`
  width : 350px;
  height : 60px;
  font-size : 16px;
  font-weight : bold;
  background-color : #87CEEB;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border : none;
  color : white;
  margin-bottom : 40px;
  transition: all 0.3s ease;
  &:hover {
    background-color : #00BFFF;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    
  }
  
`




export default function MyPageComponents() {
  return (
    <Wrapper>
      <SideProfile/>
      <ColumnWrap>
        <Profile/>
        <HistoryView/>
        <PasswordEditButton>비밀번호 변경 요청 메일 발송하기</PasswordEditButton>
      </ColumnWrap>
    </Wrapper>
  );
}
