import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const Content = styled.div`
  margin-top: 20px;
  height: 190px;
  background-color: white;
  overflow-y: scroll;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
export default function WishList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = '/members/my-favorite-auction-list';
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
  return (
    <Container>
      <Title>찜 목록</Title>
      <Content>
        {error ? (
          <div>{error}</div>
        ) : data.length === 0 ? (
          <div>거래 내역이 없습니다.</div>
        ) : (
          <>
            <List>
              {data.map(item => (
                <ListItem key={item.id}>{item.description}</ListItem>
              ))}
            </List>
          </>
        )}
      </Content>
    </Container>
  );
}
