import { communityApi } from '@api/community';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DeleteBtn = styled.button`
  border: none;
  background-color: #e8e9ec;
  position: relative; /* 가상 요소의 위치를 기준으로 사용 */
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: #4fd66e;
  }
  
    margin-right: 5px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 57%;
      transform: translateY(-50%);
      height: 66%;
      border-left: 1px solid #222;
`;

interface DeleteCommentProps {
  commentId: number;
  onDelete: (commentId: number) => void;
}

export default function DeleteComment({
  commentId,
  onDelete,
}: DeleteCommentProps) {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();

  const deleteComment = async () => {
    try {
      // 댓글 삭제 API 호출
      await communityApi.deleteComment(
        parseInt(channelId!, 10),
        parseInt(postId!, 10),
        commentId,
      );
      // 삭제가 성공적으로 완료된 후 페이지를 다시 로드하거나 댓글 목록을 갱신
      // 필요에 따라 페이지 이동이나 댓글 목록 갱신 로직 추가
      onDelete(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return <DeleteBtn onClick={deleteComment}>삭제</DeleteBtn>;
}
