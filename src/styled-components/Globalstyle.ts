import styled from "styled-components";


interface GlobalButtonProps {
  width: string;
  height: string;
  fontSize : string
  type?: 'button' | 'submit' | 'reset';
}


export const GlobalInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '40px'};
  font-size: 16px;
  border-radius: 10%;
  padding: 10px;
  border : none;
  box-sizing: border-box;
`;


export const GlobalButton = styled.button<GlobalButtonProps>`
  width: ${(props) => props.width || '100px%'};   
  height: ${(props) => props.height || '40px'}; 
  font-size: ${(props) => props.fontSize || '12px'};
  background-color: ${(props) => {
    switch (props.type) {
      case 'reset':
        return '#FFD4D4';
      case 'submit':
        return '#CDE990';
      default:
        return '#CDE990';
    }
  }};
  color: #222;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => {
      switch (props.type) {
        case 'reset':
          return '#FFB3B3';
        case 'submit':
          return '#AACB73';
        default:
          return '#AACB73';
      }
    }};
  }

  &:active {
    background-color: ${(props) => {
      switch (props.type) {
        case 'reset':
          return '#FFA1A1';
        case 'submit':
          return '#92C157';
        default:
          return '#92C157';
      }
    }};
  }
`;

