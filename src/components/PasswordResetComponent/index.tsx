import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { membersApi } from '../../api/member';
import { Styled } from '../../styled-components/AuthStyle';


export default function PasswordResetForm() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const uuid = queryParams.get('uuid');


  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('모든 비밀번호 필드를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!uuid) {
      setError('유효하지 않은 링크입니다.');
      return;
    }

    try {
      await membersApi.resetPassword({
        uuid,
        newPassword,
      });

      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');

    } catch (error) {
      console.error('비밀번호 변경 요청 실패:', error);
      setError('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <Styled.OuterWrapper>
      <Styled.Wrapper>
        <Styled.Title>비밀번호 재설정</Styled.Title>
        <Styled.Form onSubmit={handlePasswordChange}>
          <Styled.Input
            name="newPassword"
            placeholder="새 비밀번호"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Styled.Input
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Styled.Input type="submit" value="비밀번호 변경" />
          {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
          {successMessage && <p>{successMessage}</p>}
        </Styled.Form>
      </Styled.Wrapper>
      <Styled.LogoImage src="/img/mainLogo2.png" />
    </Styled.OuterWrapper>
  );
}
