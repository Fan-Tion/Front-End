import styled from "styled-components";
import ImageUploader from "./ImageUploader";
import TextEditor from "../../utils/TextEditor";
import InputArea from "./InputArea";


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
  background-color: ${props => props.type === 'submit' ? 'rgb(52, 58, 64)' : 'white'};
  color: ${props => props.type === 'submit' ? 'white' : 'black'};
  width: 150px;
`

export default function AuctionCreatePageComponents() {

  return (
    <Wrapper>
      <form>
        <Col>
          <InputArea />
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
