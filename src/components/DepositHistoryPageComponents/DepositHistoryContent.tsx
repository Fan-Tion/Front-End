import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type Tab = '1months' | '3months' | '1year';

const Content = styled.div`
  width: 100%;
  height: 400px;
  background-color: white;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #ddd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #007bff;
  }
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #ddd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface DepositHistoryContentProps {
  selectedTab: Tab;
}

const ITEMS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 5;

export default function DepositHistoryContent({
  selectedTab,
}: DepositHistoryContentProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `/members/my-blance`;
        console.log('Fetching data from:', url);
        const response = await axios.get(url);
        // const response = await depositApi.getHistory(); // depositApi 를 사용할 경우
        const filteredData = response.data[selectedTab]; // selectedTab과 일치하는 데이터만 사용
        setData(filteredData);
        setCurrentPage(1); // 탭 변경 시 페이지를 초기화
        setCurrentGroup(0); // 탭 변경 시 페이지 그룹을 초기화
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const totalGroups = Math.ceil(totalPages / PAGE_GROUP_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevGroup = () => {
    const newGroup = Math.max(currentGroup - 1, 0);
    setCurrentGroup(newGroup);
    setCurrentPage(newGroup * PAGE_GROUP_SIZE + 1);
  };

  const handleNextGroup = () => {
    const newGroup = Math.min(currentGroup + 1, totalGroups - 1);
    setCurrentGroup(newGroup);
    setCurrentPage(newGroup * PAGE_GROUP_SIZE + 1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = data.slice(startIndex, endIndex);

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>
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
          <div>예치금 입·출금 내역이 없습니다.</div>
        ) : (
          <>
            <List>
              {currentPageData.map(item => (
                <ListItem key={item.id}>{item.description}</ListItem>
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
