import styled from "styled-components";
import ImageUploader from "./ImageUploader";
import TextEditor from "../../utils/TextEditor";
import InputArea from "./InputArea";
import { useState } from "react";
import { GlobalButton } from "../../styled-components/Globalstyle";
import { getDateRange } from "../../hooks/useDateRange";
import Modal from "../../utils/Modal";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 1100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ButtonArea = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`

const Button = styled(GlobalButton)`
  margin: 10px;
  color: #222;
  font-size: 16px;
  
`

const ImageUploadButton = styled(Button)`
  width: 100%;
`

interface formDataType {
  title: string
  currentBidPrice: string | number,
  buyNowPrice: string | number,
  endDate: string,
  auctionType: boolean,
}

export default function AuctionCreatePageComponents() {

  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

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

    setFormData(newFormData);

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

  const formattedFormData = {
    ...formData,
    currentBidPrice: formData.currentBidPrice === 0
      || formData.currentBidPrice === ''
      ? ''
      : numberFormat.format(Number(formData.currentBidPrice)),
    buyNowPrice: formData.buyNowPrice === 0
      || formData.buyNowPrice === ''
      ? ''
      : numberFormat.format(Number(formData.buyNowPrice)),
  };


  const { minDate, maxDate } = getDateRange();

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen)
  }

  const cancelHandler = () => {
    const ok = confirm('경매 작성을 취소하고 홈 화면으로 돌아갈까요?')
    if (ok) navigation('/')
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Col>
          <InputArea
            onChange={handleChange}
            formData={formattedFormData}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Col>
        <ImageUploadButton type="button" width="450px" onClick={modalHandler}>
          이미지 업로드
        </ImageUploadButton>
        <TextEditor />
        <ButtonArea>
          <Button type="submit">등록하기</Button>
          <Button type="reset" onClick={cancelHandler}>작성취소</Button>
        </ButtonArea>
        <Modal isOpen={isModalOpen} onClose={modalHandler}>
          <ImageUploader />
        </Modal>
      </Form>
    </Wrapper>
  )
}
