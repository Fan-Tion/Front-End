import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
  margin-top: 30px;
  
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  border-radius: 20px;
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