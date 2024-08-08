import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 1200px;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const Description = styled.div`
  margin: 30px;
  text-align: start;
`;
const Detail = styled.h3`
  font-weight: bold;
`;
export default function ItemDescription({
  description,
}: {
  description: string;
}) {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <Wrapper>
      <Divider />
      <Detail>상품 상세</Detail>
      <Description dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </Wrapper>
  );
}
