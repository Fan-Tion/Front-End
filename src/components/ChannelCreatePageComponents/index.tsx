import { communityApi } from '@api/community';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImagePreviewWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #cccccc;
  border-radius: 6px;
  background-color: white;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const NoImageText = styled.div`
  width: 100%;
  text-align: center;
  color: #c4c4c4;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #e8e9ec;
  transition: border-color 0.3s ease;

  &:focus {
    border: 2px solid #4fd66e;
    outline: none;
  }
`;

const DescriptionInput = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  height: 300px;
  border-radius: 6px;
  border: 1px solid #e8e9ec;
  resize: vertical; //크기조정
  transition: border-color 0.3s ease;

  &:focus {
    border: 2px solid #4fd66e;
    outline: none;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  padding: 10px 20px;
  color: #222;
  background-color: #e8e9ec;
  cursor: pointer;
  border: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #4fd66e;
    color: #eee;
  }
`;
const ButtonArea = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;

export default function ChannelCreatePageComponents() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as Blob | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    if (!formData.title) {
      alert('채널 제목을 입력해주세요.');
      return false;
    }
    if (!formData.description) {
      alert('채널 설명을 입력해주세요.');
      return false;
    }
    if (!formData.image) {
      alert('채널 프로필 이미지를 설정해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (formData.image) {
        data.append('file', formData.image);
      }
       await communityApi.postChannel(data);
       
      navigate('/');
    } catch (error) {
      console.error('채널생성 오류', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const cancelHandler = () => {
    if (confirm('채널 작성을 취소하겠습니까?')) {
      navigate('/community');
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <ImagePreviewWrapper>
          {imagePreview ? (
            <ImagePreview src={imagePreview} alt="Image Preview" />
          ) : (
            <NoImageText>채널 이미지</NoImageText>
          )}
        </ImagePreviewWrapper>
        <Button type="button" onClick={handleFileButtonClick}>
          채널 프로필 이미지 설정하기
        </Button>
        <FileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="채널 제목을 입력하세요"
        />
        <DescriptionInput
          name="description"
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="채널 설명을 입력하세요"
        />
        <ButtonArea>
          <Button type="submit">채널 생성</Button>
          <Button type="button" onClick={cancelHandler}>
            작성취소
          </Button>
        </ButtonArea>
      </Form>
    </Wrapper>
  );
}
