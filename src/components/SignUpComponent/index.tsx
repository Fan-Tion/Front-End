import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { membersApi } from '../../api/member';
import { Styled } from '../../styled-components/AuthStyle';

interface SignUpInterface {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  address: string;
}
const errorMessages = {
  emptyFields: '필수 입력 항목입니다.',
  passwordLength: '비밀번호는 6자 이상 15자 이하로 입력해주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  nicknameLength: '닉네임은 최소 2글자 이상이어야 합니다.',
  phoneNumberInvalid: '전화번호는 11자리 숫자여야 합니다.',
  serverError: '서버에서 에러가 발생했습니다.',
};

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
    setErrors({}); //오류 초기화

    const requiredFields = ['email', 'password', 'confirmPassword', 'nickname', 'phoneNumber', 'address'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof SignUpInterface]); //filter 함수를 사용해서 formData 키 확인
    if (emptyFields.length > 0) { // 
      emptyFields.forEach(field => {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: errorMessages.emptyFields,
        }));
      });
      return;
    }
    //비밀번호 길이 검사
    if (formData.password.length < 6 || formData.password.length > 15) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: errorMessages.passwordLength,
      }));
      return;
    }

    // 비밀번호, 비밀번호 확인 값이 일치하지않으면 오류
    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: errorMessages.passwordMismatch,
      }));
      return;
    }

    //닉네임 길이 검사
    if (formData.nickname.length < 2) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nickname: errorMessages.nicknameLength,
      }));
      return;
    }

    // 전화번호 유효성 검사   .test() 메서드는 boolean값을 반환 11자리가 아닌경우 false, 맞으면 true
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      // 전화번호가 11자리 숫자가 아닌 경우 오류
      setErrors(prevErrors => ({
        ...prevErrors,
        phoneNumber: errorMessages.phoneNumberInvalid,
      }));
      return;
    }

    try {
      const response = await membersApi.signUp(formData);
      console.log(response.data);
      navigate('/signin'); //회원가입 성공후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      // 에러 처리
      setErrors(prevErrors => ({
        ...prevErrors,
        serverError: errorMessages.serverError,
      }));
    }
  };

  return (
    <Styled.OuterWrapper>
      <Styled.Wrapper>
        <Styled.Title>회원가입</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            name="email"
            placeholder="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>}
          <Styled.Input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>}
          <Styled.Input
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <Styled.ErrorMessage>{errors.confirmPassword}</Styled.ErrorMessage>
          )}
          <Styled.Input
            name="nickname"
            placeholder="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <Styled.ErrorMessage>{errors.nickname}</Styled.ErrorMessage>}
          <Styled.Input
            name="phoneNumber"
            placeholder="phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <Styled.ErrorMessage>{errors.phoneNumber}</Styled.ErrorMessage>
          )}
          <Styled.Input
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Styled.Input type="submit" value="Sign up" />
          {errors.serverError && (
            <Styled.ErrorMessage>{errors.serverError}</Styled.ErrorMessage>
          )}
        </Styled.Form>
        <Styled.Switcher>
          이미 계정이 있으신가요? <Link to="/signin">로그인 페이지</Link>
        </Styled.Switcher>
      </Styled.Wrapper>
    </Styled.OuterWrapper>
  );
}
