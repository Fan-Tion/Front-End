import { communityApi } from '@api/community';
import { useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 2px solid #e8e9ec;
  border-radius: 3px;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 2px solid #e8e9ec;
  }
`;

const CommentSubmit = styled.button`
  margin-left: 5px;
  width: 100px;
  height: 30px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  outline: none;
  &:focus {
    outline: none;
    border: 2px solid #4fd66e;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 3px;
`;

interface ModifyCommentProps {
  channelId: string;
  postId: string;
  commentId: number;
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

export default function ModifyComment({
  channelId,
  postId,
  commentId,
  initialContent,
  onSave,
  onCancel,
}: ModifyCommentProps) {
  const [data, setData] = useState(initialContent);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      content: data,
    };

    try {
      await communityApi.modifyComment(
        commentData,
        parseInt(channelId, 10),
        parseInt(postId, 10),
        commentId,
      );

      onSave(data); // 수정된 내용 저장 후 콜백 호출
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea value={data} onChange={handleTextChange} />
      <ButtonArea>
        <CommentSubmit type="submit">저장</CommentSubmit>
        <CommentSubmit type="button" onClick={onCancel}>
          취소
        </CommentSubmit>
      </ButtonArea>
    </form>
  );
}
