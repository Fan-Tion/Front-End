import styled from 'styled-components';
import NewPost from './NewPost';

export default function CommunityPostComponents() {
  const Wrap = styled.div`
    margin: 10px auto;
    width: 1200px;
    min-height: 70vh;
    background-color: #fff;
    padding-top: 20px;
  `;
  return (
    <Wrap>
      <NewPost />
    </Wrap>
  );
}
