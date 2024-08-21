import styled from 'styled-components';
import CommunityList from './CommunityList';
const Wrap = styled.div`
  margin: 10px auto;
  width: 1200px;
  min-height: 70vh;
  background-color: #fff;
`;
export default function CommunityListComponents() {
  return (
    <Wrap>
      {/* <Navigation /> */}
      <CommunityList />
    </Wrap>
  );
}
