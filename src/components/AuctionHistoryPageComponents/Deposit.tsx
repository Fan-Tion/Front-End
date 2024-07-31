import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../utils/Modal';

import { membersApi } from '@api/member';
import { useAvailableDeposit } from '@hooks/useAvailableDeposit';
import { AllButton } from '../../styled-components/HomePageStyle';
import ChangePrice from '../DepositRechargeComponent/Price';
const Container = styled.div`
  width: 300px;
  height: 200px;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const Content = styled.div`
  margin-top: 20px;
`;
const Price = styled.div`
  background-color: white;
  border: 2px solid #cde990;
  border-radius: 10px;
  text-align: right;
  line-height: 36px;
  width: 200px;
  height: 40px;
  font-size: 24px;
  float: right;
`;
const Charge = styled(AllButton)`
  margin-top: 5px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const DepositHistory = styled(AllButton)`
  margin-top: 20px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const BidPrice = styled.div`
  border-radius: 10px;
  margin-right: 5px;
  text-align: right;
  line-height: 36px;
  width: 200px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  float: right;
  color: #db4455;
  text-decoration: underline;
`;

export default function Deposit() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await membersApi.myInfo();

        setData(response.data.balance);
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { totalBidPrice } = useAvailableDeposit();
  return (
    <Container>
      <Title>예치금</Title>
      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : data ? (
          <>
            <Price>{data.toLocaleString()} 원</Price>
            <BidPrice>입찰 중: {totalBidPrice.toLocaleString()} 원</BidPrice>
          </>
        ) : (
          <div>데이터가 없습니다.</div>
        )}
        <Charge onClick={toggleModal}>충전하기</Charge>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <ChangePrice />
        </Modal>
        <DepositHistory onClick={() => navigate('/mypage/deposit-history')}>
          예치금 입출금 내역
        </DepositHistory>
      </Content>
    </Container>
  );
}
