import styled from "styled-components";
import ImageUploader from "./ImageUploader";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`

export default function AuctionCreatePageComponents() {

  return (
    <Wrapper>
      <ImageUploader />
    </Wrapper>
  )
}
