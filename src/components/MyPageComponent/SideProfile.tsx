import { membersApi } from '@api/member';
import ChangePrice from '@components/DepositRechargeComponent/Price';
import { useAvailableDeposit } from '@hooks/useAvailableDeposit';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../utils/Modal';
import TradeHistory from '../TradeComponent/TradeHistory';
import { Withdrawal } from './Withdrawal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-right: 2px solid #e8e9ec;
  width: 300px;
  min-width: 240px;
  gap: 20px;
  margin-left: 200px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-top: 70px;
`;

const AvatarUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;

  cursor: pointer;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const AvatarInput = styled.input`
  display: none;
`;
const NameTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const Money = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;
const ChargeButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  background-color: #e8e9ec;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4fd66e;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`;
const TradeButton = styled(ChargeButton)``;

const ProfileEditButton = styled(ChargeButton)``;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

const LogoName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Available = styled.div`
  border-radius: 10px;
  margin-right: 5px;
  font-weight: bold;
  line-height: 36px;
  width: 300px;
  height: 40px;
  font-size: 16px;
  color: #222;
`;
interface SideProfileProps {
  nickname: string;
  profileImage: string;
  balance: number;
}
export default function SideProfile({
  nickname,
  profileImage,
  balance,
}: SideProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); //파일저장
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage); //현재 프로필 저장
  const [isFileSelected, setIsFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    setCurrentProfileImage(profileImage);
  }, [profileImage]);

  const toggleModal = () => {
    if (!isModalOpen) {
      setModalKey(prevKey => prevKey + 1);
    }
    setIsModalOpen(!isModalOpen);
  };
  const toggleChargeModal = () => {
    setIsChargeModalOpen(!isChargeModalOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsFileSelected(true);
    }
  };

  const handleProfileImageSubmit = async () => {
    if (!selectedFile) {
      //선택된파일이없으면
      if (fileInputRef.current) {
        // ref가 참조하는 요소가있으면
        fileInputRef.current.value = ''; // 파일 입력 초기화후 이전 파일 지우기
        fileInputRef.current.click(); // 파일 선택 열기
      }
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await membersApi.ProfileImageEdit(formData);
      if (response.data.success) {
        const newProfileImageUrl = response.data.newProfileImageUrl;
        setCurrentProfileImage(newProfileImageUrl);
        setIsFileSelected(false);
      }
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  const { availableDeposit } = useAvailableDeposit();
  return (
    <Wrapper>
      <Title>마이 페이지</Title>
      <AvatarUpload onClick={() => fileInputRef.current?.click()}>
        <AvatarImg src={currentProfileImage} alt="프로필 이미지" />
      </AvatarUpload>
      <AvatarInput
        id="file"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <ProfileEditButton onClick={handleProfileImageSubmit}>
        {isFileSelected ? '변경 프로필 확인' : '프로필 변경하기'}
      </ProfileEditButton>
      <NameTitle>닉네임</NameTitle>
      <Name>{nickname || 'Anonymous'}</Name>
      <Money>예치금 : {balance.toLocaleString()} 원</Money>
      <Available>
        사용 가능 금액 : {availableDeposit.toLocaleString()} 원
      </Available>
      <ChargeButton onClick={toggleChargeModal}>충전하기</ChargeButton>
      <Modal isOpen={isChargeModalOpen} onClose={toggleChargeModal}>
        <ChangePrice />
      </Modal>
      <TradeButton onClick={toggleModal}>거래중</TradeButton>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <TradeHistory key={modalKey} />
      </Modal>
      <Footer>
        <Withdrawal />
        <LogoName>Fan-Tion</LogoName>
      </Footer>
    </Wrapper>
  );
}
