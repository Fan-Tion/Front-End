import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Tags = styled.div`
  display: flex;
`;
const Tag = styled.div`
  cursor: pointer;
`;
export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Tags>
      <Tag onClick={() => navigate('/community-list')}>전체게시판 &gt; </Tag>
    </Tags>
  );
}
