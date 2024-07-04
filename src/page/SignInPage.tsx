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

export default function SignInPage() {
  return (
    <OuterWrapper>
      <Wrapper>
        <Title>로그인</Title>
        <Form>
          <Input name="email" placeholder="email" type="email" />
          <Input name="password" placeholder="password" type="password" />
          <Input type="submit" value="Sign In" />
        </Form>
        <Switcher>
          비밀번호를 잊어버리셨나요?{' '}
          <Link to="/members/findpassword">비밀번호 찾기</Link>
        </Switcher>
        <Switcher>
          회원이 아니신가요? <Link to="/members/signup">회원가입</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
}
