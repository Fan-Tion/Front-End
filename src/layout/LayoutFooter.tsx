import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  min-width: 1800px;
  height: 150px;
  background-color: white;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterBox = styled.div`
  width: 1400px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  color: #ffffff;
  white-space: nowrap;
  cursor: pointer;
`;

const FooterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4fd66e; /* 메인 색상 강조 */
  font-weight: bold;
  font-size: 32px;
  text-transform: uppercase; /* 모든 글자를 대문자로 변환 */
  letter-spacing: 2px; /* 글자 사이 간격 */
  padding: 15px;
  transition:
    transform 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #3fa959; /* 더 어두운 녹색으로 변환 */
  }
`;

const FooterLink = styled.a`
  color: #aaaaaa;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #3fa959;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 40px;
`;

export default function LayoutFooter() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <FooterBox>
        <FooterName onClick={() => navigate('/')}>Fan-Tion</FooterName>
        <FooterLinks>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </FooterLinks>
      </FooterBox>
    </Wrapper>
  );
}
