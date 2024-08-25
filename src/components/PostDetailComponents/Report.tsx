import { communityApi } from '@api/community';
import Modal from '@utils/Modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

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

const ReportInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  resize: none;
  outline: none;
  padding: 2px;
  border: 1px solid #e8e9ec;
  &:focus {
    outline: 1px solid #4fd66e;
  }
`;

// 흔들리는 애니메이션 정의
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

// 조건부로 애니메이션 적용
const ErrorText = styled.div<{ $shouldShake: boolean }>`
  color: red;
  font-size: 14px;
  ${({ $shouldShake }) =>
    $shouldShake &&
    css`
      animation: ${shake} 0.3s;
    `}
  margin-left:5px;
`;

const SubmitArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Submit = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  margin-top: 10px;
  background-color: #e8e9ec;
  border: none;
  &:hover {
    background-color: #4fd66e;
    color: #eee;
  }
`;

export default function Report() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false); // 애니메이션 트리거 상태
  const { postId } = useParams<{
    postId: string;
  }>();

  if (!postId) {
    return <div>Invalid parameters</div>;
  }

  const postReport = async () => {
    if (!description.trim()) {
      setError('신고 사유를 입력하지 않았습니다.');
      setShake(true); // 애니메이션 트리거
      setTimeout(() => setShake(false), 500); // 애니메이션 후 상태 초기화
      return;
    }

    try {
      await communityApi.report({
        postId: postId,
        description: description,
      });
      alert('신고가 접수되었습니다.');
      toggleModal();
      setDescription('');
      setError('');
    } catch (error) {
      alert('신고에 실패했습니다.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError('');
    setShake(false);
  };

  return (
    <ButtonContainer>
      <ReportButton onClick={toggleModal}>
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
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ReportInput
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="신고 사유를 입력해주세요."
        />
        <SubmitArea>
          {error && <ErrorText $shouldShake={shake}>{error}</ErrorText>}
          <Submit onClick={postReport}>제출</Submit>
        </SubmitArea>
      </Modal>
    </ButtonContainer>
  );
}
