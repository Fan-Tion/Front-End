import { membersApi } from '@api/member';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const WithdrawalButton = styled.button`
  margin: 0 20px;
  font-size: 20px;
  color: #222;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    font-size: 24px;
    color: red;
  }
`;

export function Withdrawal() {
  const [, , removeCookie] = useCookies(['Authorization']);

  const handleWithdrawal = async () => {
    const confirmOk = confirm('회원 탈퇴를 하시겠습니까?');

    if (confirmOk) {
      try {
        const response = await membersApi.withdrawal();
        if (response.success) {
          removeCookie('Authorization', { path: '/' });
          alert('회원 탈퇴가 완료되었습니다.');
        }
      } catch (error) {
        console.error('서버에러', error);
        alert('회원 탈퇴중 오류발생');
      }
    }
  };

  return (
    <WithdrawalButton onClick={handleWithdrawal}>회원 탈퇴</WithdrawalButton>
  );
}
