import styled from 'styled-components';

interface ProductBoxProps {
  $bgColor: string;
}
interface TextProps {
  $fontSize: string;
  $fontColor: string;
}

export const Wrap = styled.div``;
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
  width: 1800px;
  min-height: 500px;
  margin: auto;
  margin-top: 50px;
  border-radius: 15px;
  border: 2px solid #cde990;
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
`;
