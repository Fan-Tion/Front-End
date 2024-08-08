import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const OuterWrapper = styled.div`
  width : 100%;
  min-width : 1800px;
  height: 1000px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  background-color: #f5f5f5;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content : center;
  width: 500px; 
  padding: 20px; 
  background-color: white; 
  border: 1px solid #e8e9ec; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const Title = styled.h1`
  font-size: 32px;
  align-self: center;
  font-weight: bold;
  color: #222;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Input = styled.input`
  height : 40px;
  padding: 10px 15px;
  border-radius: 5px;
  font-size : 16px;
  border: 1px solid #ddd;
  width: 100%;
  &:hover {
    border: 2px solid #bbb;
  }
  &:focus {
    outline: none;
  }

  &[type='submit'] {
    cursor: pointer;
    font-size: 16px;
    background-color: #cde990;
    color : #222;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #aacb73;
      color: white;
      border: none;
    }

    &:focus {
      outline: none;
    }
  }
`;
export const Switcher = styled.span`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size : 16px;
  font-weight : bold;
  a {
    color: #cde990;
    text-decoration-line: none;
  }
`;
export const SocialButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #cde990;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height : 43px;
  
  
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;
export const NaverImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  text-align: center;
`;
export const PhoneWrap = styled.div`
  display: flex;
  width: 458px;
`;
export const ButtonWrap = styled.div`
  display: flex;
  width: 500px;
`;
export const CheckInput = styled.input`
  width: 360px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 5px 0 0 5px;
  &:hover {
    border: 2px solid #bbb;
  }
  &:focus {
    outline: none;
  }
`;

export const CheckButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #cde990;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;
export const FileInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileInputLabel = styled.label`
  display : flex;
  align-items : center;
  justify-content : center;
  width : 100%;
  font-size : 16px;
  font-weight : bold;
  color : #222;
  cursor: pointer;
  background-color: #cde990;
  padding: 10px 25px;
  border-radius: 5px;
  height : 40px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #cde990;
  margin-top: 10px;
`;

export const LogoText = styled.div`
  font-size: 52px;
  align-self: center;
  font-weight: bold;
  color: #cde990;
  padding: 30px;
`;
export const LogoLink = styled(Link)`
  margin-top: 40px;
  text-decoration: none;
`;

export const LogoImage = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;

export const Styled = {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  ErrorMessage,
  ButtonWrap,
  CheckInput,
  CheckButton,
  FileInputWrap,
  FileInputLabel,
  FileInput,
  ImagePreview,
  SocialButtonWrap,
  NaverImg,
  LogoText,
  LogoLink,
  LogoImage,
};
