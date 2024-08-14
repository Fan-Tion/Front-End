import { useFormHandler } from '@hooks/useFormHandler';
import { useModalHandler } from '@hooks/useModalHandler';
import Modal from '@utils/Modal';
import { lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';

const InputArea = lazy(() => import('./InputArea'));
const ImageUploader = lazy(() => import('./ImageUploader'));
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
export default function AuctionModifyPageComponents() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const location = useLocation();
  const { auctionDetails } = location.state;
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit: handleSubmitModifiedData,
    handleFilesChange,
    buttonDisable,
    editorRef,
  } = useFormHandler(auctionId, auctionDetails.auctionImage);

  const { isModalOpen, toggleModal } = useModalHandler();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState<string | File | null>(null); // mainImage 상태 추가

  useEffect(() => {
    if (auctionDetails) {
      // auctionDetails를 사용하여 formData를 초기화
      setFormData({
        title: auctionDetails.title || '',
        currentBidPrice: auctionDetails.currentBidPrice || '',
        buyNowPrice: auctionDetails.buyNowPrice || '',
        endDate: auctionDetails.endDate || '',
        auctionType: auctionDetails.auctionType || false,
        category: auctionDetails.category || '',
      });

      if (auctionDetails.auctionImage.length > 0) {
        setMainImage(auctionDetails.auctionImage[0]);
      }
    }
  }, [auctionDetails, setFormData]);

  const cancelHandler = () => {
    if (confirm('경매 작성을 취소하고 홈 화면으로 돌아갈까요?')) navigate('/');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmitModifiedData}>
        <Row>
          <Col>
            <InputArea onChange={handleChange} formData={formData} />
          </Col>
          <Col>
            <MainImageWrapper>
              {mainImage ? (
                <MainImage
                  src={
                    typeof mainImage === 'string'
                      ? mainImage
                      : URL.createObjectURL(mainImage)
                  }
                  alt="Main"
                />
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
        <TextEditor
          ref={editorRef}
          initialValue={
            auctionDetails.description ||
            '부적절한 내용을 게시할 경우 불이익이 발생할 수 있습니다.'
          }
        />
        <ButtonArea>
          <Button type="submit" disabled={buttonDisable}>
            수정완료
          </Button>
          <Button type="reset" disabled={buttonDisable} onClick={cancelHandler}>
            작성취소
          </Button>
        </ButtonArea>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <ImageUploader
            onFilesChange={handleFilesChange}
            onMainImageChange={setMainImage}
            initialImages={auctionDetails.auctionImage}
          />
        </Modal>
      </Form>
    </Wrapper>
  );
}
