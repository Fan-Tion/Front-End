import { membersApi } from '@api/member';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const WithdrawalButton = styled.button`
  width: 90px;
  height: 40px;
  font-weight: bold;
  background-color: #fc8b8b;
  color: #222;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #eb4646;
    color: white;
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
