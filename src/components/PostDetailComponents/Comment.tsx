import { communityApi } from '@api/community';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteComment from './DeleteComment';
import InputComment from './InputComment';
import ModifyComment from './ModifyComment';

const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Head = styled.div`
  border: 2px solid white;
  border-bottom: none;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;
  height: 30px;
  line-height: 26px;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 10px;
  border-bottom: 2px solid #e8e9ec;
  border-left: 2px solid #e8e9ec;
  background-color: #e8e9ec;
  font-size: 14px;
  height: 24px;
  line-height: 20px;
`;
const NickName = styled.div`
  width: 100px;
`;

const Time = styled.div`
  margin-left: 5px;
  line-height: 25px;
`;
const Content = styled.div`
  width: 100%;
  padding: 10px 0;
  border: 1px solid #e8e9ec;
  min-height: 30px;
  padding-left: 10px;
`;
const Com = styled.div`
  margin-top: 10px;
`;
const Control = styled.div`
  display: flex;
`;
const Button = styled.button`
  border: none;
  background-color: #e8e9ec;
  position: relative; /* 가상 요소의 위치를 기준으로 사용 */
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: #4fd66e;
  }
  &:nth-child(2) {
    margin-right: 5px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 57%;
      transform: translateY(-50%);
      height: 66%;
      border-left: 1px solid #222;
    }
  }
`;

interface CommentProps {
  channelId: string;
  postId: string;
  nickname: string;
}

interface CommentData {
  commentId: number;
  nickname: string;
  content: string;
  createDate: string;
}

export default function Comment({ channelId, postId, nickname }: CommentProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);

  // 댓글을 가져오는 함수
  const getComments = async () => {
    try {
      const response = await communityApi.getComments(
        parseInt(channelId, 10),
        parseInt(postId, 10),
      );
      setComments(response.data.content);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleEditClick = (commentId: number) => {
    setEditCommentId(commentId);
  };

  const handleSaveComment = (newContent: string, commentId: number) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.commentId === commentId
          ? { ...comment, content: newContent }
          : comment,
      ),
    );
    setEditCommentId(null); // 수정 모드 종료
  };

  const handleCancelEdit = () => {
    setEditCommentId(null); // 수정 모드 취소
  };

  const handleCommentSubmit = (newComment: CommentData) => {
    setComments(prevComments => [...prevComments, newComment]); // 새로운 댓글을 목록에 추가
  };
  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.commentId !== commentId),
    );
  };

  return (
    <Wrap>
      <Head>댓글({comments.length})</Head>
      {comments.map(comment => (
        <Com key={comment.commentId}>
          <Info>
            <NickName>{comment.nickname}</NickName>
            <Control>
              {comment.nickname === nickname && (
                <>
                  <Button onClick={() => handleEditClick(comment.commentId)}>
                    수정
                  </Button>
                  <DeleteComment
                    commentId={comment.commentId}
                    onDelete={handleDeleteComment}
                  />
                </>
              )}
              <Time>{new Date(comment.createDate).toLocaleString()}</Time>
            </Control>
          </Info>
          {editCommentId === comment.commentId ? (
            <ModifyComment
              channelId={channelId}
              postId={postId}
              commentId={comment.commentId}
              initialContent={comment.content}
              onSave={newContent =>
                handleSaveComment(newContent, comment.commentId)
              }
              onCancel={handleCancelEdit}
            />
          ) : (
            <Content>{comment.content}</Content>
          )}
        </Com>
      ))}
      <InputComment
        channelId={channelId}
        postId={postId}
        onCommentSubmit={handleCommentSubmit}
      />
    </Wrap>
  );
}
