import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 98%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const Description = styled.p`
  margin: 30px;
  text-align: start;
`

export default function ItemDescription({ description }: { description: string }) {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <Wrapper>
      <Divider />
      <h3>Description</h3>
      <Description dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </Wrapper>
  )
}
