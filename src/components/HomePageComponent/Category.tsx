import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
`;
const Image = styled.img<{ selected: boolean }>`
  width: 100px;
  height: 100px;
  border: 2px solid ${props => (props.selected ? '#4fd66e' : '#c4c4c4')};
  border-radius: 40px;
  transition:
    transform 0.3s,
    border-color 0.3s;

  &:hover {
    transform: scale(1.1);
    border-color: #4fd66e;
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
  const queryParams = new URLSearchParams(location.search);

  const categoryOption = queryParams.get('categoryOption');

  const isSelected = categoryOption === title;

  return (
    <Div onClick={onClick}>
      <Image src={imageSrc} alt={title} selected={isSelected} />
      <CategoryName>{title}</CategoryName>
    </Div>
  );
}
