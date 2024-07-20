import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #ff0000;
  cursor: pointer;
  font-size: 16px;
  color: #ff0000;
  transition: transform 0.2s ease-in-out;

  &:hover {
    color: #ff6666;
    border: 1px solid #ff6666;
    transform: scale(1.1);
  }
`;

const bubbleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const Heart = styled.div<{ $isBubbling: boolean }>`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  ${({ $isBubbling }) => $isBubbling && css`
    animation: ${bubbleAnimation} 0.5s ease;
  `}
`;

const Label = styled.span`
  font-size: 16px;
`;

export default function SteamedButton() {
  const [isSteamed, setIsSteamed] = useState<boolean>(false);
  const [isBubbling, setIsBubbling] = useState<boolean>(false);

  const toggleSteamed = () => {
    setIsSteamed(!isSteamed);
    setIsBubbling(true); // 하트 애니메이션 시작

    // 일정 시간 후 애니메이션 종료
    setTimeout(() => {
      setIsBubbling(false);
    }, 500);
  };

  return (
    <Button type={'button'} onClick={toggleSteamed}>
      <Label>찜하기</Label>
      <Heart $isBubbling={isBubbling}>
        {isSteamed ? <HeartIconSolid /> : <HeartIconOutline />}
      </Heart>
    </Button>
  );
}
