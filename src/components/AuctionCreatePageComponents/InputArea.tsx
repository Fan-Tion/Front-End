import styled from "styled-components"

const Row = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  align-content: center;
`

const Label = styled.label`
  font-size: 24px;
  font-weight: 400;
  margin: 10px;
  align-items: center;
`

const Input = styled.input<{ $isValid?: boolean; type?: string }>`
  border: none;
  border-bottom: ${props => props.$isValid ? '3px solid rgb(54, 239, 70)' : '1px solid black'};
  font-size: 24px;
  background-color: #eee;
  ${(props) =>
    props.type === "checkbox" &&
    `
    width: 24px;
    height: 24px;
    transform: scale(1.8); /* 크기 조정 */
    margin: 5px;
  `}
`;

interface InputAreaProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    title: string;
    currentBidPrice: string | number;
    buyNowPrice: string | number;
    endDate: string;
    auctionType: boolean;
  };
  validity: {
    title: boolean;
    currentBidPrice: boolean;
    buyNowPrice: boolean;
    endDate: boolean;
  };
  minDate: string;
  maxDate: string;
}

export default function InputArea({ onChange, formData, validity, minDate, maxDate }: InputAreaProps) {
  return (
    <div>
      <Row>
        <Label htmlFor="bid-title">제목 :</Label>
        <Input
          id="bid-title"
          name="title"
          type="text"
          placeholder="경매 제목 입력"
          value={formData.title}
          onChange={onChange}
          $isValid={validity.title}
          required
        />
      </Row>
      <Row>
        <Label htmlFor="bid-start-price">경매 시작가 :</Label>
        <Input
          id="bid-start-price"
          name="currentBidPrice"
          type="text"
          placeholder="1,000"
          value={formData.currentBidPrice}
          onChange={onChange}
          $isValid={validity.currentBidPrice}
          required
        />
      </Row>
      <Row>
        <Label htmlFor="bid-buy-now">즉시 구매가 :</Label>
        <Input
          id="bid-buy-now"
          name="buyNowPrice"
          type="text"
          placeholder="10,000"
          value={formData.buyNowPrice}
          onChange={onChange}
          $isValid={validity.buyNowPrice}
          required
        />
      </Row>
      <Row>
        <Label htmlFor="bid-end-date">경매 종료일 :</Label>
        <Input
          id="bid-end-date"
          name="endDate"
          type="date"
          placeholder="경매 종료시간"
          value={formData.endDate}
          onChange={onChange}
          $isValid={validity.endDate}
          min={minDate}
          max={maxDate}
          required
        />
      </Row>
      <Row>
        <Label htmlFor="bid-type">공개 입찰 여부 :</Label>
        <Input
          id="bid-type"
          name="auctionType"
          type="checkbox"
          checked={formData.auctionType}
          onChange={onChange}
        />
      </Row>
    </div>
  )
}
