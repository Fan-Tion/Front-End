import { auctionApi } from '@api/auction';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

interface RatingModalProps {
  auctionId: number;
  onClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 50%; /* 수직 중앙 정렬 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙으로 이동 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  width: 100%; /* 화면 전체 너비 */
  height: 100%; /* 화면 전체 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 표시 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
`;
const Select = styled.select`
  display: block;
  cursor: pointer;
  width: 120px; /* 부모의 너비에 맞춤 */
  height: 30px;
  padding-left: 15px; /* 내부 여백 추가 */
  margin: 20px auto; /* 위쪽 마진 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  border: 1px solid #ddd; /* 테두리 스타일 */
`;
const Button = styled.button`
  width: 50px;
  height: 30px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background-color: #e8e9ec;
  &:nth-child(1) {
    background-color: #4fd66e;
    margin-right: 20px;
  }
`;
export default function RatingModal({ onClose, auctionId }: RatingModalProps) {
  const [rating, setRating] = useState<number>(1); // 기본값을 1로 설정

  const handleRatingSubmit = async () => {
    try {
      await auctionApi.rating({ auctionId, rating });
      onClose();
    } catch (error) {
      alert('평점 남기기에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const ratingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseInt(e.target.value, 10);
    setRating(newRating);
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>평점 남기기</h2>
        <Select value={rating} onChange={ratingChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <div>
          <Button onClick={handleRatingSubmit}>확인</Button>
          <Button onClick={onClose}>취소</Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}
