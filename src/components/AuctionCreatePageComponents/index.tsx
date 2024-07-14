import styled from "styled-components";
import ImageUploader from "./ImageUploader";
import TextEditor from "../../utils/TextEditor";
import InputArea from "./InputArea";
import { useState } from "react";

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 1100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const Col = styled.div`
  display: flex;
  flex-direction: row;
`

const ButtonArea = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border: 1px solid rgb(52, 58, 64);
  border-radius: 10px;
  background-color: ${props =>
    props.type === 'submit' ? 'rgb(52, 58, 64)' : 'white'};
  color: ${props =>
    props.type === 'submit' ? 'white' : 'black'};
  width: 150px;
`

interface formDataType {
  title: string
  currentBidPrice: string | number,
  buyNowPrice: string | number,
  endDate: string,
  auctionType: boolean,
}

interface ValidityType {
  title: boolean;
  currentBidPrice: boolean;
  buyNowPrice: boolean;
  endDate: boolean;
}

// 경매 종료 날짜의 입력 가능 범위를 동적으로 제한하기 위해 범위를 계산하는 함수
const getDateRange = () => {
  const today = new Date();
  const sixDaysLater = new Date();
  sixDaysLater.setDate(today.getDate() + 6);

  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  const toISOStringWithLocalOffset = (date: Date) =>
    date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate());

  return {
    minDate: toISOStringWithLocalOffset(today),
    maxDate: toISOStringWithLocalOffset(sixDaysLater)
  };
};

export default function AuctionCreatePageComponents() {

  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
  })

  const [validity, setValidity] = useState<ValidityType>({
    title: false,
    currentBidPrice: false,
    buyNowPrice: false,
    endDate: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // 가격 입력에 대한 음수 값 방지 및 숫자만 입력되도록 유효성 검사
    // 가격 입력에 대한 음수 값 방지 및 숫자만 입력되도록 유효성 검사
    if ((name === "currentBidPrice"
      || name === "buyNowPrice")
      && (isNaN(Number(value.replace(/,/g, '')))
        || Number(value.replace(/,/g, '')) < 0)) {
      return;
    }

    const newValue = type === 'checkbox' ? checked : value.replace(/,/g, '');

    const newFormData = {
      ...formData,
      [name]: type === 'checkbox'
        ? checked
        : newValue,
    };

    // 즉시 구매가가 경매 시작가보다 작거나 같을 수 없음
    // if (name === "buyNowPrice" && Number(value) <= Number(formData.currentBidPrice)) {
    //   setError('즉시 구매가는 경매 시작가보다 커야 합니다.');
    // } else {
    //   setError('');
    // }

    setFormData(newFormData);

    setValidity({
      ...validity,
      [name]: value.trim() !== '',
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = Number(formData.buyNowPrice) <= Number(formData.currentBidPrice);

    if (error) {
      alert("즉시 구매가는 경매 시작가보다 작거나 같을 수 없습니다.");
      return;
    }

    console.log(formData);

  }

  const numberFormat = new Intl.NumberFormat();

  const { minDate, maxDate } = getDateRange();

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Col>
          <InputArea
            onChange={handleChange}
            formData={{
              ...formData,
              currentBidPrice: numberFormat.format(Number(formData.currentBidPrice)),
              buyNowPrice: numberFormat.format(Number(formData.buyNowPrice)),
            }}
            validity={validity}
            minDate={minDate}
            maxDate={maxDate}
          />
          {/* 모달로 구현하는 것이 이쁠 것 같음 ... */}
          <ImageUploader />
        </Col>
        <TextEditor />
        <ButtonArea>
          <Button type="submit">등록하기</Button>
          <Button type="button">작성취소</Button>
        </ButtonArea>
      </form>
    </Wrapper>
  )
}
