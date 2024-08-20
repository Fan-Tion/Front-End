import { communityApi } from '@api/community';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import CommunityTextEditor from '@utils/CommunityTextEditor';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  margin: 0 auto;
  padding: 50px;
  border: 2px solid #e8e9ec;
  box-shadow: 0px 3px 14px rgba(127, 138, 140, 0.09);
`;

const ListCategory = styled.h1`
  margin-bottom: 50px;
`;

const Title = styled.input`
  border: 2px solid #e8e9ec;
`;

const Post = styled.button`
  width: 100px;
  height: 35px;
  margin-left: 10px;
  font-weight: 600;
  border-radius: 6px;
  background-color: #e8e9ec;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4fd66e;
    color: #eee;
  }
`;

const PostBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function ModifyPost() {
  const { channelId, postId } = useParams<{
    channelId: string;
    postId: string;
  }>();
  const editorRef = useRef<ToastEditor>(null);
  const [data, setData] = useState({
    title: '',
    content: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data: initialData } = location.state;

  useEffect(() => {
    // 초기화
    if (initialData) {
      setData({
        title: initialData.title || '',
        content: initialData.content || '',
      });

      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(initialData.content || '');
      }
    }
  }, [initialData]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown();

      if (!data.title.trim() || !content.trim()) {
        setErrorMessage('제목과 내용을 모두 입력해주세요.');
        return;
      }

      try {
        const payload = { title: data.title, content };

        await communityApi.modifyPosts(
          payload,
          parseInt(channelId!, 10), // URL에서 가져온 channelId 사용
          parseInt(postId!, 10), // URL에서 가져온 postId 사용
        );

        navigate(`/community/${channelId}/${postId}`);
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('게시글 수정 중 오류가 발생했습니다.');
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  return (
    <Container>
      <ListCategory>{initialData.title}</ListCategory>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="title"
            style={{ display: 'block', fontWeight: 'bold' }}
          ></label>
          <Title
            id="title"
            type="text"
            value={data.title}
            onChange={handleTitleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              marginBottom: '10px',
            }}
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="content"
            style={{ display: 'block', fontWeight: 'bold' }}
          >
            내용
          </label>
          <CommunityTextEditor
            ref={editorRef}
            initialValue={data.content || ''}
            postId={parseInt(postId!, 10)}
          />
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '20px' }}>
            {errorMessage}
          </div>
        )}
        <PostBox>
          <Post onClick={handleCancel}>취소</Post>
          <Post type="submit">수정하기</Post>
        </PostBox>
      </form>
    </Container>
  );
}
