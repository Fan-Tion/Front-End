import React from 'react';
import { Link } from 'react-router-dom';
import {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
} from '../styled-components/AuthStyle';

export default function FindPasswordPage() {
  return (
    <OuterWrapper>
      <Wrapper>
        <Title>비밀번호 찾기</Title>
        <Form>
          <Input name="email" placeholder="email" type="email" />
          <Input name="phone number" placeholder="phone number" />
          <Input type="submit" value="인증하기" />
        </Form>

        <Switcher>
          로그인페이지로 <Link to="/members/signin">로그인페이지로 이동</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
}
