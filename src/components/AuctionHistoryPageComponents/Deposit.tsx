import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  text-align: right;
  line-height: 30px;
  width: 200px;
  height: 30px;
  font-size: 24px;
  float: right;
`;
const Charge = styled.button`
  margin-top: 40px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  background-color: gray;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05);
  }
`;
const DepositHistory = styled.button`
  margin-top: 40px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  background-color: gray;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05);
  }
`;

export default function Deposit() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = '/members/my-info-deposit';
        console.log('Fetching data from:', url);
        const response = await axios.get(url);

        setData(response.data);
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

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
            <Price>{data.description} 원</Price>
            <Charge>충전하기</Charge>
            <DepositHistory onClick={() => navigate('/mypage/deposit-history')}>
              예치금 입출금 내역
            </DepositHistory>
          </>
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </Content>
    </Container>
  );
}
