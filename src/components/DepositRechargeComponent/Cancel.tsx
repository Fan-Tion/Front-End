import { rechargeApi } from '@api/recharge';
import { useState } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';

const Cancel = styled(GlobalButton)``;

interface CancelComponentProps {
  paymentKey: string | null;
}

export default function CancelComponent({ paymentKey }: CancelComponentProps) {
  const [cancelReason, setCancelReason] = useState('');

  async function cancelPayment() {
    if (!paymentKey) {
      console.error('No paymentKey provided');
      return;
    }

    try {
      await rechargeApi.cancel({
        paymentId: paymentKey,
        cancelReason: cancelReason,
      });
      alert('결제가 취소되었습니다.');
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
      <Cancel onClick={cancelPayment} disabled={!cancelReason || !paymentKey}>
        결제취소
      </Cancel>
    </>
  );
}
