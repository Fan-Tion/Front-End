import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  ErrorMessage,
} from '../../styled-components/AuthStyle';

interface SignUpInterface {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  address: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpInterface>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    address: '',
  });
  // 유효성 검사 오류를 담는 상태와 해당 상태를 업데이트 하는 함수 선언
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //사용자가 입력을 하면 입력 필드 오류 상태 초기화
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //오류 초기화
    setErrors({});
    // 비밀번호, 비밀번호 확인 값이 일치하지않으면 오류
    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }

    // 전화번호 유효성 검사   .test() 메서드는 boolean값을 반환 11자리가 아닌경우 false, 맞으면 true
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      // 전화번호가 11자리 숫자가 아닌 경우 오류
      setErrors(prevErrors => ({
        ...prevErrors,
        phoneNumber: '전화번호는 11자리 숫자여야 합니다.',
      }));
      return;
    }

    try {
      const response = await api.signUp(formData);
      console.log(response.data);
      navigate('/signin'); //회원가입 성공후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      // 에러 처리
      setErrors({
        ...errors,
       
      });
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
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
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
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
          )}
          <Input
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input type="submit" value="Sign up" />
          {errors.serverError && (
            <ErrorMessage>{errors.serverError}</ErrorMessage>
          )}
        </Form>
        <Switcher>
          이미 계정이 있으신가요? <Link to="/signin">로그인 페이지</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
}
