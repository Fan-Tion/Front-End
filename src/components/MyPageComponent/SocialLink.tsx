import { naverLoginApi } from '@api/naverLogin';
import UnlinkNaverAccount from '@components/NaverComponent/UnlinkNaverAccount';
import Modal from '@utils/Modal';
import { useState } from 'react';
import {
  Container,
  Info,
  ModalBtn,
  ModalContent,
  ModalInput,
  ModalTitle,
  Section,
  SocialLinkBtn,
  Title,
} from '../../styled-components/MyPageStyle';

interface SocialLinkProps {
  auth: boolean;
  linkedEmail?: string;
}

export default function SocialLink({ auth, linkedEmail }: SocialLinkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkEmail, setLinkEmail] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLinkEmail(e.target.value);

  const handleSendEmail = async () => {
    setLinkEmail('');
    try {
      const queryString = `?linkEmail=${linkEmail}`;
      await naverLoginApi.linkNaverEmailAccount(queryString);
      alert('이메일로 로그인 연동 메세지가 전송되었습니다.');
      setIsModalOpen(false);
    } catch (error) {
      alert('메세지 전송에 실패했습니다.');
      console.error('이메일 전송 실패', error);
    }
  };

  return (
    <Container>
      <Section>
        <Title>연동정보</Title>
      </Section>
      {auth ? (
        <Info>
          네이버 로그인 연동 : {linkedEmail}
          <UnlinkNaverAccount />
        </Info>
      ) : (
        <Info>
          네이버 로그인 연동 : X
          <SocialLinkBtn onClick={handleOpenModal}>
            네이버로그인 연동하기
          </SocialLinkBtn>
        </Info>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalTitle>네이버 로그인 연동</ModalTitle>
          <ModalInput
            type="email"
            placeholder="네이버 연동할 이메일을 입력하세요"
            value={linkEmail}
            onChange={handleEmailChange}
          />
          <ModalBtn onClick={handleSendEmail}>
            네이버 연동 이메일 전송하기
          </ModalBtn>
        </ModalContent>
      </Modal>
    </Container>
  );
}
