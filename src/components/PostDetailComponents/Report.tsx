import styled from 'styled-components';
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const ReportButton = styled.div`
  display: flex;
  margin: 10px 0;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  svg {
    width: 18px;
    height: 18px;
  }
  &:hover {
    color: red;
  }
`;
export default function Report() {
  return (
    <ButtonContainer>
      <ReportButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
          />
        </svg>
        신고하기
      </ReportButton>
    </ButtonContainer>
  );
}
