import CancelComponent from '@components/DepositRechargeComponent/Cancel';
import { useModalHandler } from '@hooks/useModalHandler';
import Modal from '@utils/Modal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { historyApi } from '../../api/history';

type Tab = '1months' | '3months' | '1year';

const Content = styled.div`
  width: 100%;
  height: 490px;
  // border-radius: 15px;
  background-color: white;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #e8e9ec;
  box-shadow: 0px 3px 14px rgba(127, 138, 140, 0.09);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 4fr 4fr 2fr 2fr;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  min-height: 45px;
  align-items: center;
  gap: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 5px;
  width: 40px;
  padding: 10px 15px;
  background-color: #e8e9ec;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #4fd66e;
    color: #eee;
  }
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px 10px;
  background-color: #ddd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 12px;
    stroke: currentColor;
  }
`;

const Balance = styled.span`
  display: inline-block;
  width: 200px; /* 고정된 너비 */
  text-align: right;
`;
const CancelButton = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 600;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  background-color: #e8e9ec;
  border: none;
  border-radius: 6px;
  &:hover {
    background-color: #4fd66e;
    color: #eee;
  }
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
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { isModalOpen, toggleModal } = useModalHandler();
  // selectedTab이 변경될 때 currentPage를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await historyApi.depositHistory(selectedTab, {
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

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    toggleModal();
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
  const formatDate = (isoString: string) => {
    const datePart = isoString.slice(0, 10);
    const timePart = isoString.slice(11, 19);
    return `${datePart} ${timePart}`;
  };
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
              {data.map((item, index) => (
                <ListItem key={index}>
                  <p>
                    {item.type === 'USE'
                      ? '구매'
                      : item.type === 'SALES'
                        ? '판매'
                        : item.type === 'CHARGING'
                          ? '충전'
                          : item.type === 'PAYMENTS_CANCEL'
                            ? '결제 취소'
                            : item.type === 'CANCEL'
                              ? '구매 철회'
                              : '출금'}
                  </p>

                  <Balance>
                    {item.type === 'USE' ||
                    item.type === 'WITHDRAWAL' ||
                    item.type === 'PAYMENTS_CANCEL'
                      ? `- ${item.balance.toLocaleString('ko-KR')} 원`
                      : `+ ${item.balance.toLocaleString('ko-KR')} 원`}
                  </Balance>
                  {item.type === 'CHARGING' ? (
                    <CancelButton onClick={() => handleOpenModal(item)}>
                      취소
                    </CancelButton>
                  ) : (
                    <div></div>
                  )}
                  <p>{formatDate(item.createTime)}</p>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Content>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {selectedItem && (
          <CancelComponent
            balance={selectedItem.balance}
            createTime={selectedItem.createTime}
          />
        )}
      </Modal>
      <Pagination>
        <ArrowButton onClick={handlePrevGroup} disabled={currentGroup === 0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </ArrowButton>
        {renderPageButtons()}
        <ArrowButton
          onClick={handleNextGroup}
          disabled={currentGroup === totalGroups - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </ArrowButton>
      </Pagination>
    </>
  );
}
