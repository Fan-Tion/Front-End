import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { historyApi } from '../../api/history';

type Tab = 'join' | 'buy' | 'sell';

const Content = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 15px;
  background-color: white;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #cde990;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #ddd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #cde990;
    color: #222;
  }
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #ddd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface AuctionHistoryContentProps {
  selectedTab: Tab;
}

const ITEMS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 5;

export default function AuctionHistoryComponents({
  selectedTab,
}: AuctionHistoryContentProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  //탭을 옮기면 페이지가 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await historyApi.auctionHistory(selectedTab, {
          page: currentPage - 1,
        });

        setData(response.data.content);
        setTotalCount(response.data.totalElements);
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const totalGroups = Math.ceil(totalPages / PAGE_GROUP_SIZE);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevGroup = () => {
    const newGroup = Math.max(currentGroup - 1, 0);
    const newPage = newGroup * PAGE_GROUP_SIZE + 1;
    setCurrentPage(newPage);
  };

  const handleNextGroup = () => {
    const newGroup = Math.min(currentGroup + 1, totalGroups - 1);
    const newPage = newGroup * PAGE_GROUP_SIZE + 1;
    setCurrentPage(newPage);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>,
      );
    }

    return buttons;
  };

  if (loading) {
    return <Content>Loading...</Content>;
  }

  return (
    <>
      <Content>
        {error ? (
          <div>{error}</div>
        ) : data.length === 0 ? (
          <div>거래 내역이 없습니다.</div>
        ) : (
          <>
            <List>
              {data.map(item => (
                <ListItem
                  key={item.auctionId}
                  onClick={() => navigate(`/auction/${item.auctionId}`)}
                >
                  <p>{item.title}</p>
                  <p>{item.createDate}</p>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Content>
      <Pagination>
        <ArrowButton onClick={handlePrevGroup} disabled={currentGroup === 0}>
          &lt;
        </ArrowButton>
        {renderPageButtons()}
        <ArrowButton
          onClick={handleNextGroup}
          disabled={currentGroup === totalGroups - 1}
        >
          &gt;
        </ArrowButton>
      </Pagination>
    </>
  );
}
