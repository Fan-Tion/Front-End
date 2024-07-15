// 경매 종료 날짜의 입력 가능 범위를 동적으로 제한하기 위해 범위를 계산하는 함수
export const getDateRange = () => {
  const today = new Date();
  const sixDaysLater = new Date();
  sixDaysLater.setDate(today.getDate() + 6);

  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  const toISOStringWithLocalOffset = (date: Date) =>
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate());

  return {
    minDate: toISOStringWithLocalOffset(today),
    maxDate: toISOStringWithLocalOffset(sixDaysLater),
  };
};
