import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const AllChannelWrap = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 100%;
  min-width : 1400px;
`

const AllChannelButton = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 200px;
  height : 40px;
  font-weight : bold;
  margin-top : 20px;
  border : 2px solid #e8e9ec ;
  cursor: pointer;
  &:hover {
    border : 2px solid #4fd66e;
  }
`

export default function AllChannelList() {
  const navigate = useNavigate();

  const handleAllChannel = () => {
    navigate('/community/all')
  }

  return(
    <AllChannelWrap>
      <AllChannelButton onClick={handleAllChannel}>전체 채널 보기
      </AllChannelButton>
    </AllChannelWrap>
  )

}