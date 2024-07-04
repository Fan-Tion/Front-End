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

export default function SignUpPage() {
  return (
    <OuterWrapper>
      <Wrapper>
        <Title>회원가입</Title>
        <Form>
          <Input name="email" placeholder="email" type="email" />
          <Input name="password" placeholder="password" type="password" />
          <Input
            name="confirm password"
            placeholder="confirm password"
            type="password"
          />
          <Input name="username" placeholder="username" />
          <Input name="phonenumber" placeholder="phone number" />
          <Input name="address" placeholder="address" />
          <Input type="submit" value="Sign up" />
        </Form>
        <Switcher>
          이미 계정이 있으신가요??{' '}
          <Link to="/members/signin">로그인 페이지</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
}
