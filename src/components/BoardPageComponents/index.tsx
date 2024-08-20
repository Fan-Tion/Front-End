import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../../icons/SearchIcon';
import {
  BoardListContainer,
  BoardListHeader,
  BoardListItem,
  BoarderCell,
  BottomWrap,
  ChannelDescription,
  ChannelImage,
  ChannelItemContainer,
  ChannelTitle,
  ChannelWrap,
  ComSearchButton,
  ComSearchInput,
  PageContainer,
  Wrap,
  CategorySelect,
  CustomSelectWrapper,
} from '../../styled-components/CommunityStyle';

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const Button = styled.button`
  margin: 0 5px;
  width: 40px;
  padding: 10px;
  background-color: #e8e9ec;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:disabled {
    border: 1px solid #4fd66e;
    background-color: #4fd66e;
    color: #eee;
  }
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px;
  background-color: #e8e9ec;
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

interface Board {
  postId: number;
  title: string;
  nickname: string;
  createDate: string | null;
  viewCnt: number | null;
  likeCnt: number | null;
  channelImage: string | null;
  channelName: string;
  channelDescription: string;
}

export default function BoardPage() {
  const { channelId } = useParams<{ channelId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [totalPages, setTotalPages] = useState(0);
  const [searchOption, setSearchOption] = useState(searchParams.get('searchOption') || 'TITLE');
  const [boards, setBoards] = useState<Board[]>([]);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const PAGE_GROUP_SIZE = 5;

  const BoardMapping : Record<string, string> = {
    게시글제목: 'TITLE',
    게시글내용: 'CONTENT',
    닉네임: 'NICKNAME',
  }
  const selectBoards = Object.keys(BoardMapping);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await communityApi.getBoards(Number(channelId), {
          page: currentPage - 1,
        });
        const data = response.data;
        console.log(data);
        setBoards(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('게시글 목록을 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchBoards();
  }, [channelId, currentPage]);

  const renderPageButtons = () => {
    const startPage =
      Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    const buttons = [];
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </Button>,
      );
    }
    return buttons;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page), keyword });
  };

  const handlePrevGroup = () => {
    const prevPage = Math.max(1, currentPage - PAGE_GROUP_SIZE);
    handlePageChange(prevPage);
  };

  const handleNextGroup = () => {
    const nextPage = Math.min(totalPages, currentPage + PAGE_GROUP_SIZE);
    handlePageChange(nextPage);
  };

  const handleSearchOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(BoardMapping[e.target.value]);
  };


  const handleSearch = async () => {
    try {
      
      const response = await communityApi.searchBoard(
        Number(channelId),
        searchOption,
        keyword,
        currentPage - 1,
      );
      const data = response.data;
      setBoards(data.content);
      setTotalPages(data.totalPages);
      setSearchParams({ page: '1', searchOption, keyword });
      setCurrentPage(1);
      setKeyword('');
    } catch (error) {
      console.error('게시글 검색 중 오류가 발생했습니다.', error);
    }
  };



  return (
    <Wrap>
      <PageContainer>
        <ChannelWrap>
          {boards[0]?.channelImage && (
            <ChannelImage
              src={boards[0].channelImage}
              alt={boards[0].channelName}
            />
          )}
          <ChannelItemContainer>
            <ChannelTitle>{boards[0]?.channelName}</ChannelTitle>
            <ChannelDescription>
              {boards[0]?.channelDescription}
            </ChannelDescription>
          </ChannelItemContainer>
        </ChannelWrap>
        <BoardListContainer>
          <BoardListHeader>
            <BoarderCell>번호</BoarderCell>
            <BoarderCell>제목</BoarderCell>
            <BoarderCell>작성자</BoarderCell>
            <BoarderCell>작성일</BoarderCell>
            <BoarderCell>조회수</BoarderCell>
            <BoarderCell>추천</BoarderCell>
          </BoardListHeader>
          {boards.map(board => (
            <BoardListItem key={board.postId}>
              <BoarderCell>{board.postId}</BoarderCell>
              <BoarderCell>{board.title}</BoarderCell>
              <BoarderCell>{board.nickname}</BoarderCell>
              <BoarderCell>{board.createDate}</BoarderCell>
              <BoarderCell>{board.viewCnt}</BoarderCell>
              <BoarderCell>{board.likeCnt}</BoarderCell>
            </BoardListItem>
          ))}
        </BoardListContainer>
        <Pagination>
          <ArrowButton onClick={handlePrevGroup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </ArrowButton>
          {renderPageButtons()}
          <ArrowButton
            onClick={handleNextGroup}
            disabled={currentPage >= totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </ArrowButton>
        </Pagination>
      </PageContainer>
      <BottomWrap>
      <CustomSelectWrapper>
          <CategorySelect value={selectBoards.find(key => BoardMapping[key] === searchOption)} onChange={handleSearchOptionChange}>
            {selectBoards.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CategorySelect>
      </CustomSelectWrapper>
        <ComSearchInput
          type="text"
          placeholder="게시판 검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <ComSearchButton onClick={handleSearch}>
          <SearchIcon />
        </ComSearchButton>
      </BottomWrap>
    </Wrap>
  );
}
