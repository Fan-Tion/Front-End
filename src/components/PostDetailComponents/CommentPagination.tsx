import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: ${({ active }) => (active ? '#4fd66e' : '#e8e9ec')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #4fd66e;
    color: #fff;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationContainer>
      {pages.map(page => (
        <PageButton
          key={page}
          active={page === currentPage + 1}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
