import styled from "styled-components";
import QuillEditor from "../../utils/QuillEditor";
import ImageUploader from "./ImageUploader";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`

export default function AuctionCreatePageComponents() {

  return (
    <Wrapper>
      <ImageUploader />
      <QuillEditor />
    </Wrapper>
  )
}
