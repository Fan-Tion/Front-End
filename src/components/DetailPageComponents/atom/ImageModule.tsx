import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const MainImage = styled.img`
  width: 850px;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: zoom-in;
`;

const SubImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
  flex-wrap: wrap;
`;

const SubImage = styled.img`
  width: 200px;
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: zoom-in;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정

interface ImageModulePropsType {
  imageUrls: string[];
}

export default function ImageModule({ imageUrls }: ImageModulePropsType) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const defaultImage = "https://via.placeholder.com/850x500"; // 기본 이미지 URL 임시.

  const openModal = (url: string) => {
    setCurrentImage(url);

  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <MainImage src={imageUrls[0] || defaultImage} alt="Main Image" onClick={() => openModal(imageUrls[0] || defaultImage)} />
      <SubImageContainer>
        {imageUrls.slice(1, 5).map((url, index) => (
          <SubImage key={index} src={url || defaultImage} alt={`Sub Image ${index + 1}`} onClick={() => openModal(url || defaultImage)} />
        ))}
      </SubImageContainer>
      <Modal isOpen={!!currentImage} onRequestClose={closeModal} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
          border: 'none',
          background: 'none'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
      }}>
        <ModalImage src={currentImage || ''} alt="Modal Image" />
      </Modal>
    </>

  )
}
