import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  ErrorMessage,
} from '../../styled-components/AuthStyle';

import { membersApi } from '../../api/member';

export default function FindPasswordForm() {

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!email || !phoneNumber) {
      setError('이메일과 휴대폰 번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 서버로 이메일과 휴대폰 번호 전송
      const response = await membersApi.findPassword({ email, phoneNumber });
      console.log(response.data); 
      
      alert('이메일로 비밀번호 재설정 링크를 보냈습니다.');
    } catch (error) {
      console.error('비밀번호 찾기 요청 실패:', error);
      
      setError('이메일, 전화번호를 다시 확인해주세요!');
    }
  };

  return (
    <OuterWrapper>
      <Wrapper>
        <Title>비밀번호 찾기</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="email" placeholder="email" type="email" value={email} onChange={handleChangeEmail}/>
          <Input name="phone number" placeholder="phone number" value={phoneNumber} onChange={handleChangePhoneNumber} />
          <Input type="submit" value="인증하기" />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <Switcher>
          로그인페이지로 <Link to="/signin">로그인페이지로 이동</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );


}
