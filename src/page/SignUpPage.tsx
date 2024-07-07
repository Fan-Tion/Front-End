import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
} from '../styled-components/AuthStyle';
import { membersApi } from '../api/member';

interface SignUpInterface {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  address: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpInterface>({
    email: '',
    password: '',
    nickname: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await membersApi.signUp(formData);
      console.log(response.data);
      // 성공 처리
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  return (
    <OuterWrapper>
      <Wrapper>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            placeholder="confirm password"
            type="password"
          />
          <Input
            name="nickname"
            placeholder="username"
            value={formData.nickname}
            onChange={handleChange}
          />
          <Input
            name="phoneNumber"
            placeholder="phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input type="submit" value="Sign up" />
        </Form>
        <Switcher>
          이미 계정이 있으신가요?{' '}
          <Link to="/members/signin">로그인 페이지</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
}