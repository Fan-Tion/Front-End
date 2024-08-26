import { naverLoginApi } from '@api/naverLogin';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 500px;
  font-size: 48px;
`;

export default function NaverLinkConfirmPage() {
  const { search } = useLocation();
  const [statusMessage, setStatusMessage] = useState('연동 확인 중입니다...');

  const queryParams = new URLSearchParams(search);
  const linkEmail = queryParams.get('linkEmail');
  const uuid = queryParams.get('uuid');

  useEffect(() => {
    const confirmLink = async () => {
      if (linkEmail && uuid) {
        try {
          const response = await naverLoginApi.linkNaverAccount({
            linkEmail,
            uuid,
          });
          console.log(response.data);
          if (response.data.success) {
            setStatusMessage('연동이 성공적으로 완료되었습니다.');
          } else {
            setStatusMessage('연동에 실패했습니다. 다시 시도해 주세요.');
          }
        } catch (error) {
          setStatusMessage(
            '연동 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          );
          console.error('연동 중 오류 발생:', error);
        }
      }
    };

    confirmLink();
  }, [linkEmail, uuid]);

  return (
    <Wrap>
      <Message>{statusMessage}</Message>
    </Wrap>
  );
}
