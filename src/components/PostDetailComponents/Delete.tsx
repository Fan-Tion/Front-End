import { communityApi } from '@api/community';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const DeleteBtn = styled.button`
  margin-top: 50px;
  cursor: pointer;
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    border: 2px solid #ff0000;
    background-color: #eee;
  }
`;

export default function Delete() {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();
  const navigate = useNavigate();

  const deletePost = async () => {
    try {
      // API 호출을 통해 게시글 삭제
      await communityApi.deletePosts(
        parseInt(channelId!, 10),
        parseInt(postId!, 10),
      );
      // 삭제가 성공적으로 완료된 후 게시판 페이지로 이동
      navigate(`/community/${channelId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return <DeleteBtn onClick={deletePost}>삭제</DeleteBtn>;
}
