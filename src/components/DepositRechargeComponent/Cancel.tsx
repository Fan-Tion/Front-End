import { rechargeApi } from '@api/recharge';
import { useState } from 'react';
import styled from 'styled-components';
import { GlobalButton, GlobalInput } from '../../styled-components/Globalstyle';
interface CancelComponentProps {
  balance: number;
  createTime: string;
}

const Cancel = styled(GlobalButton)`
  margin-top: 30px;
  border-radius: 15px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => (props.disabled ? '#c3c3c3' : '')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    background-color: ${props => (props.disabled ? '#c3c3c3' : '')};
  }
`;
const Input = styled(GlobalInput)`
  margin-top: 50px;
  border-radius: 6px;
  width: 100%;
  min-height: 50px;
`;
export default function CancelComponent({
  balance,
  createTime,
}: CancelComponentProps) {
  const [cancelReason, setCancelReason] = useState('');

  async function cancelPayment() {
    if (!cancelReason) {
      console.error('No cancelReason');
      return;
    }

    try {
      const formattedCreateTime = createTime.replace('T', ' ');

      await rechargeApi.cancel({
        balance: balance,
        createTime: formattedCreateTime,
        cancelReason: cancelReason,
      });
      alert('결제가 취소되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('ERROR', error);
      alert('결제 취소에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <>
      <Input
        type="text"
        value={cancelReason}
        onChange={e => setCancelReason(e.target.value)}
        placeholder="취소 사유를 입력하세요"
      />
      <Cancel onClick={cancelPayment} disabled={!cancelReason}>
        결제 취소
      </Cancel>
    </>
  );
}
