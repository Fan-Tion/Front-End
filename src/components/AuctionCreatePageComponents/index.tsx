import { useFormHandler } from '@hooks/useFormHandler';
import { useModalHandler } from '@hooks/useModalHandler';
import Modal from '@utils/Modal';
import { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';

const InputArea = lazy(() => import('./InputArea'));
const ImageUploader = lazy(() => import('../DraggableFileUploader/ImageUploader'));
const TextEditor = lazy(() => import('@utils/TextEditor'));

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 1100px;
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
const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonArea = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;

const Button = styled(GlobalButton)`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  color: ${props => (props.disabled ? '#eee' : '#222')};
  background-color: ${props => (props.disabled ? '#4fd66e' : '#e8e9ec')};
  cursor: ${props => (props.disabled ? 'default' : '')};
  &:hover {
    background-color: #4fd66e;
    color: #eee;
  }
`;

const ImageUploadButton = styled(Button)`
  width: 100%;
`;

const MainImageWrapper = styled.div`
  width: 100%;
  max-height: 250px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #cccccc;
  border-radius: 6px;
  background-color: #f8f8f8;
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;
const NullImage = styled.div`
  width: 100%;
  min-height: 250px;
  text-align: center;
  line-height: 250px;
  color: #c4c4c4;
  cursor: pointer;
`;
export default function AuctionCreatePageComponents() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleFilesChange,
    buttonDisable,
    editorRef,
  } = useFormHandler();

  const { isModalOpen, toggleModal } = useModalHandler();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState<File | null>(null); // mainImage 상태 추가

  const cancelHandler = () => {
    if (confirm('경매 작성을 취소하고 홈 화면으로 돌아갈까요?')) navigate('/');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputArea onChange={handleChange} formData={formData} />
          </Col>
          <Col>
            <MainImageWrapper>
              {mainImage ? (
                <MainImage src={URL.createObjectURL(mainImage)} alt="Main" />
              ) : (
                <NullImage onClick={toggleModal}>
                  이미지를 업로드하세요.
                </NullImage>
              )}
            </MainImageWrapper>
            <ImageUploadButton
              type="button"
              width="450px"
              onClick={toggleModal}
            >
              {mainImage ? '이미지 변경' : '이미지 업로드'}
            </ImageUploadButton>
          </Col>
        </Row>
        <TextEditor ref={editorRef} />
        <ButtonArea>
          <Button type="submit" disabled={buttonDisable}>
            등록하기
          </Button>
          <Button type="reset" disabled={buttonDisable} onClick={cancelHandler}>
            작성취소
          </Button>
        </ButtonArea>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <ImageUploader
            onFilesChange={handleFilesChange}
            onMainImageChange={setMainImage}
          />
        </Modal>
      </Form>
    </Wrapper>
  );
}
