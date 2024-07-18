import { useNavigate } from 'react-router-dom';
import {
  Container,
  Info,
  Section,
  Title,
} from '../../styled-components/MyPageStyle';

export default function HistoryView() {
  const navigate = useNavigate();
  return (
    <Container>
      <Section>
        <Title>내역보기</Title>
      </Section>
      <Info onClick={() => navigate('/mypage/deposit-history')}>
        예치금 입출금 내역보기
      </Info>
      <Info onClick={() => navigate('/mypage/auction-history')}>
        경매 내역 보기
      </Info>
    </Container>
  );
}
