import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { historyApi } from '../../api/history';

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
  border: 2px solid #cde990;
  border-radius: 15px;
  scrollbar-color: #cde990 transparent;
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
const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;
export default function WishList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await historyApi.likesHistory();

        setData(response.data.content);
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
        {loading ? (
          <Loading>로딩 중...</Loading>
        ) : error ? (
          <div>{error}</div>
        ) : data.length === 0 ? (
          <div>거래 내역이 없습니다.</div>
        ) : (
          <List>
            {data.map(item => (
              <ListItem
                key={item.auctionId}
                onClick={() => navigate(`auction/${item.auctionId}`)}
              >
                {item.title}
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
}
