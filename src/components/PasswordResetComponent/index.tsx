import React, { useState } from 'react';
import { Styled } from '../../styled-components/AuthStyle';
import { useParams } from 'react-router-dom';

const errorMessages = {
  emptyFields: '비밀번호, 비밀번호확인 모두 입력해주세요.',
  passwordLength: '비밀번호는 6자 이상 15자 이하로 입력해주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  success: '비밀번호 변경이 완료되었습니다',
};

export default function PasswordResetForm() {
  const {uId} = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    uId
  });
  const [error, setError] = useState('');
  
  console.log(formData);
  
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
        
      alert(errorMessages.success);
    } catch (error) {
      // 에러 처리
      setError('오류가 발생했습니다. 다시 시도해주세요.');
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
    </Styled.OuterWrapper>
  );
}
