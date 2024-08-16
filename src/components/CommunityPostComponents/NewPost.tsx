import { communityApi } from '@api/community';
import { Editor as ToastEditor } from '@toast-ui/react-editor'; // Toast UI Editor의 타입 가져오기
import CommunityTextEditor from '@utils/CommunityTextEditor';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  min-height: 800px;
  margin: 0 auto;
  padding: 50px;
  border: 2px solid #e8e9ec;
  // border-top: none;
  box-shadow: 0px 3px 14px rgba(127, 138, 140, 0.09);
`;
const ListCategory = styled.h1`
  margin-bottom: 50px;
`;
const Title = styled.input`
  border: 2px solid #e8e9ec;
`;
// const ImageUpload = styled.button``;
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

export default function NewPost() {
  // ToastEditor 타입의 ref 생성
  const editorRef = useRef<ToastEditor>(null);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Editor instance에서 작성된 내용을 가져옴
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown();

      if (!title.trim() || !content.trim()) {
        setErrorMessage('제목과 내용을 모두 입력해주세요.');
        return;
      }

      try {
        // communityApi.post 메서드 사용
        const payload = { title, content };
        const communityId = 'your-community-id'; // 실제 커뮤니티 ID로 변경

        const response = await communityApi.post(payload, communityId);

        if (response.status === 200) {
          // 성공 시 게시판 리스트 페이지로 이동
          navigate('/posts');
        } else {
          setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <ListCategory>낚시 게시판</ListCategory>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="title"
            style={{ display: 'block', fontWeight: 'bold' }}
          ></label>
          <Title
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          <CommunityTextEditor ref={editorRef} />
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '20px' }}>
            {errorMessage}
          </div>
        )}
        {/* <ImageUpload>이미지 업로드</ImageUpload> */}
        <PostBox>
          <Post onClick={handleCancel}>취소</Post>
          <Post type="submit">등록하기</Post>
        </PostBox>
      </form>
    </Container>
  );
}
