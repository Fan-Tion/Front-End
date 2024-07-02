import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 0 0;
  padding: 10px 16px;
  background-color: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default function SameKeywordAuctions() {
  return (
    <Container>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. eius architecto?</p>
    </Container>
  )
}
