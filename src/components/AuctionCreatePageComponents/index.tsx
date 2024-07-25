import { useFormHandler } from "@hooks/useFormHandler";
import { useModalHandler } from "@hooks/useModalHandler";
import Modal from "@utils/Modal";
import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalButton } from "../../styled-components/Globalstyle";

const InputArea = lazy(() => import('./InputArea'));
const ImageUploader = lazy(() => import('./ImageUploader'));
const TextEditor = lazy(() => import('@utils/TextEditor'));

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

export default function AuctionCreatePageComponents() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleFilesChange,
    buttonDisable,
    editorRef
  } = useFormHandler();

  const { isModalOpen, toggleModal } = useModalHandler();
  const navigate = useNavigate();

  const cancelHandler = () => {
    const ok = confirm('경매 작성을 취소하고 홈 화면으로 돌아갈까요?');
    if (ok) navigate('/');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Col>
          <InputArea
            onChange={handleChange}
            formData={formData}
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
