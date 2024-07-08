import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { OuterWrapper, Wrapper, Title , Form , Input, Switcher, ErrorMessage,} from '../../styled-components/AuthStyle';
import { api } from '../../api/axios';



export default function SignInForm() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');



  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const response = await api.signIn({ email, password });
      console.log(response.data);
      // 로그인 성공 처리
      navigate('/')
    } catch (error) {
      console.error(error);
      // 로그인 실패 처리 (예: 에러 메시지 표시)
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <OuterWrapper>
      <Wrapper>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="email"
            type="email"
            value={email } 
            onChange={handleChangeEmail}
          />
          <Input
            name="password"
            placeholder="password"
            type="password"
            value={password } 
            onChange={handleChangePassword}
          />
           {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input type="submit" value="Sign In" />
        </Form>
        <Switcher>
          비밀번호를 잊어버리셨나요?{' '}
          <Link to="/findpassword">비밀번호 찾기</Link>
        </Switcher>
        <Switcher>
          회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </Switcher>
      </Wrapper>
    </OuterWrapper>
  );
  
}