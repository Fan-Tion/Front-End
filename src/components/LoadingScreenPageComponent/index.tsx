import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #222; 
`
const LoadingMessage = styled.h1`
   font-size: 48px;
  color: #222; 
  margin-top: 20px; 
`



export default function LoadingScreen() {
  return (
    <Wrap>
    <SyncLoader color="#FFD4D4" /> 
    <LoadingMessage>로딩 중입니다...</LoadingMessage>
  </Wrap>
  )
}