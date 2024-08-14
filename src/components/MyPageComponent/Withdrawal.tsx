import { membersApi } from '@api/member';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const WithdrawalButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 16px;
  background-color: ##e8e9ec;
  border: none;
  color: #222;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  background-color: none;
  &:hover {
    color: white;
    background-color: #ffb3b3;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
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
