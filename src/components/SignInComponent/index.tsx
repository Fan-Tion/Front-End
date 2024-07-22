import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { membersApi } from '../../api/member';
import { Styled } from '../../styled-components/AuthStyle';

const errorMessages = {
  emptyFields: '이메일 또는 비밀번호가 올바르지 않습니다.',
};

export default function SignInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await membersApi.signIn({ email, password });
      console.log(response.data);
      // 로그인 성공 처리
      navigate('/');
    } catch (error) {
      console.error(error);
      // 로그인 실패 처리 (예: 에러 메시지 표시)
      setError(errorMessages.emptyFields);
    }
  };

  return (
    <Styled.OuterWrapper>
      <Styled.Wrapper>
        <Styled.Title>로그인</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            name="email"
            placeholder="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Styled.Input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
          <Styled.Input type="submit" value="Sign In" />
        </Styled.Form>
        <Styled.SocialButtonWrap>
          <Styled.NaverImg src="/img/naver_logo.png" />
          Naver Login
        </Styled.SocialButtonWrap>
        <Styled.Switcher>
          비밀번호를 잊어버리셨나요?{' '}
          <Link to="/findpassword">비밀번호 찾기</Link>
        </Styled.Switcher>
        <Styled.Switcher>
          회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </Styled.Switcher>
      </Styled.Wrapper>
      <Link to="/">
        <Styled.LogoText>Fan-Tion</Styled.LogoText>
      </Link>
    </Styled.OuterWrapper>
  );
}
