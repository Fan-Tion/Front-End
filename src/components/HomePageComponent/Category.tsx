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
  margin-top: 50px;
`;

interface CategoryCardProps {
  title: string;
  imageSrc: string;
}

export default function CategoryCard({ title, imageSrc }: CategoryCardProps) {
  return (
    <Div>
      <Image src={imageSrc} alt={title} />
      <CategoryName>{title}</CategoryName>
    </Div>
  );
}
