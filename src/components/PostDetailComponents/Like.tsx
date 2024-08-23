import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
interface ButtonProps {
  isLiked: boolean;
}
const Svg = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
const Button = styled.div<ButtonProps>`
  display: flex;
  background-color: #e8e9ec;
  align-items: center;
  height: 40px;
  width: 140px;
  justify-content: center;
  border-radius: 6px;
  transition: transform 0.3s ease;
  cursor: pointer;
  color: ${({ isLiked }) => (isLiked ? '#222' : 'inherit')};
  border: ${({ isLiked }) => (isLiked ? '2px solid #4fd66e' : 'inherit')};
  & > ${Svg} + p + p {
    color: ${({ isLiked }) => (isLiked ? '#4fd66e' : '#222')};
  }

  &:hover {
    transform: scale(1.1);
    background-color: #4fd66e;
    color: #eee;
    & > ${Svg} + p + p {
      color: ${({ isLiked }) => (isLiked ? '#003366' : '#003366')};
    }
  }
`;
const Text = styled.p`
  &:nth-child(2) {
    margin-right: 10px;
    font-size: 14px;
  }
  &:nth-child(3) {
    color: #4fd66e;
    font-weight: 600;
    &:hover {
      color: red;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
interface LikeProps {
  likeCnt: number;
}

export default function Like({ likeCnt }: LikeProps) {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();
  if (!channelId || !postId) {
    return <div>Invalid parameters</div>;
  }
  const [Count, setCount] = useState(likeCnt);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const response = await communityApi.getIsLiked(
          parseInt(channelId, 10),
          parseInt(postId, 10),
        );
        setIsLiked(response.data.postLikeChk);
      } catch (error) {
        console.error('Failed to fetch like status:', error);
      }
    };

    getIsLiked();
  }, [channelId, postId]);

  const fetchData = async () => {
    const response = await communityApi.toggleLike(
      parseInt(channelId, 10),
      parseInt(postId, 10),
    );
    if (response.data.postLikeChk) {
      setCount(c => c + 1);
      setIsLiked(true); // 좋아요 상태로 변경
    } else {
      setCount(c => c - 1);
      setIsLiked(false); // 좋아요 취소 상태로 변경
    }
  };
  return (
    <ButtonContainer>
      <Button onClick={fetchData} isLiked={isLiked}>
        <Svg>
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
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>{' '}
        </Svg>
        <Text>좋아요</Text>
        <Text>{Count}</Text>
      </Button>
    </ButtonContainer>
  );
}
