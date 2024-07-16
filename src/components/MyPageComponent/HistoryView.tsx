import { useNavigate } from 'react-router-dom';
import {
  Container,
  Section,
  Title,
  Info,
  HistoryButton,
} from '../../styled-components/MyPageStyle';





export default function HistoryView() {
  const navigate = useNavigate();
  return (
    <Container>
      <Section>
        <Title>내역보기</Title>
      </Section>
      <Info >
        예치금 입출금 내역
        <HistoryButton onClick={() => navigate('/mypage/deposit-history')} >내역보기</HistoryButton>
      </Info>
      
      <Info >
        경매 내역 
        <HistoryButton onClick={() => navigate('/mypage/auction-history')} >내역보기</HistoryButton>
      </Info>
    </Container>
  );
}
