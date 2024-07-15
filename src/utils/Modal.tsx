import styled from 'styled-components';
import { GlobalButton } from '../styled-components/Globalstyle';

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  justify-content: center; 
  align-items: center; 
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
`;

const CloseButton = styled(GlobalButton)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <CloseButton type='button' fontSize={"20px"} onClick={onClose}>닫기</CloseButton>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};
