import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 0 0;
  padding: 10px 16px;
  background-color: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default function SameKeywordAuctions() {
  return (
    <Container>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>328,000 원</p>
      </Row>
    </Container>
  )
}
