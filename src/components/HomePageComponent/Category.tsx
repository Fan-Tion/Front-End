import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
 
`;
const Image = styled.img`

  margin-top: 70px;
  width: 200px;
  height: 250px;
  border: 2px solid #cde990;
  border-radius: 20px;
  transition:
    transform 0.3s,
    border-color 0.3s;

  &:hover {
    transform: scale(1.1);
    border-color: #aacb73;
  }
`;
const CategoryName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  categoryUrl: string;
}

export default function CategoryCard({
  title,
  imageSrc,
  categoryUrl,
}: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(categoryUrl);
  };
  return (
    <Div onClick={handleClick}>
      <Image src={imageSrc} alt={title} />
      <CategoryName>{title}</CategoryName>
    </Div>
  );
}
