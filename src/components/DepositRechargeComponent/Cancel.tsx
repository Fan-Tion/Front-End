import { rechargeApi } from '@api/recharge';
import { useState } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
interface CancelComponentProps {
  balance: number;
  createTime: string;
}

const Cancel = styled(GlobalButton)``;

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
      <input
        type="text"
        value={cancelReason}
        onChange={e => setCancelReason(e.target.value)}
        placeholder="취소 사유를 입력하세요"
      />
      <Cancel onClick={cancelPayment} disabled={!cancelReason}>
        결제취소
      </Cancel>
    </>
  );
}
