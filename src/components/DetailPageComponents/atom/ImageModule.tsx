import { auctionDetailsType } from '@mocks/db';
import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const MainImageWrapper = styled.div`
  position: relative;
  width: 550px;
  height: 550px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  over-flow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: zoom-in;
  object-fit: cover;
`;

const SoldOutLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  z-index: 1;
`;

const SubImageContainer = styled.div`
  width: 550px;
  display: flex;
  margin-top: 10px;
  gap: 12px;
  flex-wrap: wrap;
`;

const SubImage = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: zoom-in;
  object-fit: cover;
`;

const ModalImage = styled.img`
  width: 100%;
  min-width: 500px;
  height: auto;
`;
const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const PrevButton = styled(Button)`
  left: 0px;
`;

const NextButton = styled(Button)`
  right: 0px;
`;
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정

interface ImageModulePropsType {
  imageUrls: string[];
  details: auctionDetailsType;
}

export default function ImageModule({
  imageUrls,
  details,
}: ImageModulePropsType) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );
  const auctionStatus = details.status;
  const defaultImage = 'https://via.placeholder.com/500x500'; // 기본 이미지 URL 임시.

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  const prevImage = () => {
    if (currentImageIndex !== null) {
      const newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : imageUrls.length - 1;
      setCurrentImageIndex(newIndex);
    }
  };

  const nextImage = () => {
    if (currentImageIndex !== null) {
      const newIndex =
        currentImageIndex < imageUrls.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
    }
  };

  const currentImage =
    currentImageIndex !== null ? imageUrls[currentImageIndex] : null;

  return (
    <>
      <MainImageWrapper>
        {!auctionStatus && <SoldOutLabel>SOLD OUT</SoldOutLabel>}
        <MainImage
          src={imageUrls[0] || defaultImage}
          alt="Main Image"
          onClick={() => openModal(0)}
        />
      </MainImageWrapper>
      <SubImageContainer>
        {imageUrls.slice(0, 5).map((url, index) => (
          <SubImage
            key={index}
            src={url || defaultImage}
            alt={`Sub Image ${index + 1}`}
            onClick={() => openModal(index)}
          />
        ))}
      </SubImageContainer>
      <Modal
        isOpen={currentImage !== null}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <ModalContent>
          <PrevButton onClick={prevImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </PrevButton>
          <ModalImage src={currentImage || ''} alt="Modal Image" />
          <NextButton onClick={nextImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </NextButton>
        </ModalContent>
      </Modal>
    </>
  );
}
