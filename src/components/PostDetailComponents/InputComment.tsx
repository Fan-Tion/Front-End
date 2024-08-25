import { communityApi } from '@api/community';
import { useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid #4fd66e;
  border-radius: 3px;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 2px solid #4fd66e;
  }
`;

const CommentSubmit = styled.button<{ disabled: boolean }>`
  width: 100px;
  height: 30px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? '#e8e9ec' : '#4fd66e')};
  color: ${({ disabled }) => (disabled ? '#222' : '#fff')};
  &:focus {
    outline: none;
    border: 2px solid #4fd66e;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 3px;
`;

interface CommentProps {
  channelId: string;
  postId: string;
  onCommentSubmit: (newComment: any) => void; // 새로운 댓글을 전달할 콜백 함수 추가
}

export default function InputComment({
  channelId,
  postId,
  onCommentSubmit,
}: CommentProps) {
  const [data, setData] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    const commentData = {
      content: data,
    };

    try {
      const payload = JSON.stringify(commentData);
      const response = await communityApi.commentPost(
        payload,
        parseInt(channelId!, 10),
        parseInt(postId!, 10),
      );

      setData(''); // 전송 후 입력 필드를 비웁니다.
      onCommentSubmit(response.data); // 새로운 댓글을 부모 컴포넌트로 전달
    } catch (error) {
      alert('댓글 작성에는 로그인이 필요합니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea value={data} onChange={handleTextChange}></TextArea>
      <ButtonArea>
        <CommentSubmit type="submit" disabled={!data.trim()}>
          등록하기
        </CommentSubmit>
      </ButtonArea>
    </form>
  );
}
