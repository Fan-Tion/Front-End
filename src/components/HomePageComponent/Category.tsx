import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border: 2px solid #c4c4c4;
  border-radius: 40px;
  transition:
    transform 0.3s,
    border-color 0.3s;

  &:hover {
    transform: scale(1.1);
    border-color: #c4c4c4;
  }
`;
const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #59636f;
`;

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  onClick: () => void;
}

export default function CategoryCard({
  title,
  imageSrc,
  onClick,
}: CategoryCardProps) {
  return (
    <Div onClick={onClick}>
      <Image src={imageSrc} alt={title} />
      <CategoryName>{title}</CategoryName>
    </Div>
  );
}
