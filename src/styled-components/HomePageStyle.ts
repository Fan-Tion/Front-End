import styled from 'styled-components';

interface ProductBoxProps {
  $bgColor: string;
}
interface TextProps {
  $fontSize: string;
  $fontColor: string;
}

export const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
export const Category = styled.div`
  padding: 15px 15px 0;
  display: flex;
  justify-content: space-between;
`;
export const Text = styled.span<TextProps>`
  color: ${props => props.$fontColor};
  font-size: ${props => props.$fontSize};
  font-weight: bold;
  text-decoration: none;
  margin-left: 520px;
`;

export const AllButton = styled.button`
  width: 80px;
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  background-color: #cde990;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;

export const ProductBox = styled.div<ProductBoxProps>`
  background-color: ${props => props.$bgColor};
  min-height: 500px;
  margin: auto;
  margin-top: 50px;
  border-radius: 15px;
  // border: 2px solid #cde990;
`;
export const Div = styled.div`
  display: flex;
  padding: 0 30px;
  flex-wrap: wrap;
`;

export const PopBox = styled.div`
  display: flex;
  padding: 20px 20px;
  overflow: hidden;
  white-space: nowrap; // 한 줄로 정렬
  gap: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out; // 애니메이션 추가
`;
export const CategoryBox = styled.div<ProductBoxProps>`
  display: flex;
  width: 1050px;
  justify-content: center;
  background-color: ${props => props.$bgColor};
  margin: auto;
  margin-top: 30px;
  border-radius: 15px;
`;
export const ScrollButton = styled.button`
  // margin: 0 10px;
  background-color: white;
  border: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
  :hover {
    color: #4fd66e;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
