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

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 24px;
  background-color: #eee;
  height: ${props => props.type === 'checkbox' && `
    width: 24px;
    height: 24px;
    transform: scale(1.8); /* 크기 조정 */
    margin: 5px;
  `};
`

export default function InputArea() {
  return (
    <div>
      <Row>
        <Label htmlFor='bid-title'>제목 : </Label>
        <Input id='bid-title' name='title' type='text' placeholder="경매 제목 입력" required />
      </Row>
      <Row>
        <Label htmlFor='bid-start-price'>경매 시작가 : </Label>
        <Input id='bid-start-price' name='currentBidPrice' type='number' placeholder="경매 시작가" required />
      </Row>
      <Row>
        <Label htmlFor='bid-buy-now'>즉시 구매가 : </Label>
        <Input id='bid-buy-now' name='buyNowPrice' type='number' placeholder="즉시 구매가" required />
      </Row>
      <Row>
        <Label htmlFor='bid-end-date'>경매 종료시간 : </Label>
        <Input id='bid-end-date' name='endDate' type='date' placeholder="경매 종료시간" required />
      </Row>
      <Row>
        <Label htmlFor='bid-type'>공개 입찰 여부 : </Label>
        <Input id='bid-type' name='auctionType' type='checkbox' />
      </Row>
    </div>
  )
}
