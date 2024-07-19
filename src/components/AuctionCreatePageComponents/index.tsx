import { Editor } from "@toast-ui/react-editor";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auctionApi } from "../../api/auction";
import { GlobalButton } from "../../styled-components/Globalstyle";
import Modal from "../../utils/Modal";
import TextEditor from "../../utils/TextEditor";
import ImageUploader from "./ImageUploader";
import InputArea from "./InputArea";

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
  font-size: 16px;
  border-radius: 15px;
  background-color: ${(props) => (props.disabled ? '#c3c3c3' : '')};
  cursor: ${(props) => (props.disabled ? 'default' : '')};
  &:hover {
    background-color: ${(props) =>
    (props.disabled ? '#c3c3c3' : '')
  }};
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
  auctionImage?: File[],
  description?: string,
  [key: string]: string | number | boolean | File[] | undefined;
}

export default function AuctionCreatePageComponents() {
  const [buttonDisable, setButtonDisable] = useState(false)
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
    auctionImages: [],
  })
  const [_files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, } = e.target;

    // 가격 입력에 대한 음수 값 방지 및 숫자만 입력되도록 유효성 검사
    if ((name === "currentBidPrice"
      || name === "buyNowPrice")
      && (isNaN(Number(value.replace(/,/g, '')))
        || Number(value.replace(/,/g, '')) < 0)) {
      return;
    }

    const newFormData = {
      ...formData,
      [name]: value.replace(/,/g, '')
    };

    setFormData(newFormData);

  }

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setFormData((prevData) => ({
      ...prevData,
      auctionImages: newFiles,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = Number(formData.buyNowPrice) <= Number(formData.currentBidPrice);

    if (error) {
      alert("즉시 구매가는 경매 시작가보다 작거나 같을 수 없습니다.");
      return;
    }

    const editorInstance = editorRef.current?.getInstance();
    const description = editorInstance ? editorInstance.getHTML() : '';
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key] as string | Blob);
    }
    data.append('description', description);

    // FormData의 값을 읽어 출력
    // for (const [key, value] of data.entries()) {
    //   console.log(`${key}: ${value} `);
    // }

    try {
      // 서버에 데이터 전달 
      setButtonDisable(true);
      const response = await auctionApi.create(data);

      console.log(response)
    } catch (error) {
      console.error(error);
      alert(error)
    } finally {
      setButtonDisable(false);
    }
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

  const toggleModal = () => {
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
          />
        </Col>
        <ImageUploadButton type="button" width="450px" onClick={toggleModal}>
          이미지 업로드
        </ImageUploadButton>
        <TextEditor ref={editorRef} />
        <ButtonArea>
          <Button type="submit" disabled={buttonDisable}>등록하기</Button>
          <Button type="reset" disabled={buttonDisable} onClick={cancelHandler}>작성취소</Button>
        </ButtonArea>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <ImageUploader onFilesChange={handleFilesChange} />
        </Modal>
      </Form>
    </Wrapper>
  )
}
