import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { membersApi } from '../../api/member';
import { Styled } from '../../styled-components/AuthStyle';

const errorMessages = {
  emptyFields: '비밀번호, 비밀번호확인 모두 입력해주세요.',
  passwordLength: '비밀번호는 6자 이상 15자 이하로 입력해주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  success: '비밀번호 변경이 완료되었습니다',
  serverError: '서버에러',
};

export default function PasswordResetForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get('uuid');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    // 입력안할시 에러메세지
    if (formData.password == '' || formData.confirmPassword == '') {
      setError(errorMessages.emptyFields);
      return;
    }

    // 비밀번호 길이 검사
    if (formData.password.length < 6 || formData.password.length > 15) {
      setError(errorMessages.passwordLength);
      return;
    }

    // 비밀번호, 비밀번호 확인 값이 일치하지 않으면 오류
    if (formData.password !== formData.confirmPassword) {
      setError(errorMessages.passwordMismatch);
      return;
    }

    try {
      // 비밀번호 변경 로직 추가
      const response = await membersApi.resetPassword({
        uuid: uuid,
        newPassword: formData.password,
      });
      console.log(response);
      alert(errorMessages.success);
      navigate('/signin');
    } catch (error) {
      // 에러 처리
      setError(errorMessages.serverError);
    }
  };

  return (
    <Styled.OuterWrapper>
      <Styled.Wrapper>
        <Styled.Title>비밀번호 변경</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            name="password"
            placeholder="Change Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Styled.Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Styled.Input type="submit" value="변경하기" />
        </Styled.Form>
        {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
      </Styled.Wrapper>
      <Styled.LogoImage src="/img/mainLogo2.png" />
    </Styled.OuterWrapper>
  );
}
