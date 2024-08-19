import styled from 'styled-components';
import ModifyPost from './Modify';
const Wrap = styled.div`
  margin: 10px auto;
  width: 1200px;
  min-height: 70vh;
  background-color: #fff;
  padding-top: 20px;
`;
export default function ModifyPostComponents() {
  return (
    <Wrap>
      <ModifyPost />
    </Wrap>
  );
}
