import styled from 'styled-components';

export const OuterWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;
export const Title = styled.h1`
  font-size: 48px;
  align-self: center;
  font-weight: bold;
  color : #CDE990;
`;

export const Form = styled.form`
  margin-top: 70px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 15px 20px;
  border-radius: 25px;
  border : 2px solid #CDE990;
  font-size: 16px;
  width : 100%;
  &:hover {
    border : 2px solid #AACB73;
  }
 &:focus{
  outline : none;
 }

  &[type='submit'] {
    cursor: pointer;
    background-color: #CDE990;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #AACB73;
      color: white;
    }

    &:focus {
      outline: none;
      
    }
  }
`;
export const Switcher = styled.span`
  margin-top: 20px;  
  margin-bottom : 10px;
  a {
    color: #AACB73;
    text-decoration-line: none;
  }
`;
export const SocialButtonWrap = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    padding:9px 20px;
    border-radius: 25px;
    border: 2px solid #CDE990;
    background-color : #CDE990;
    font-size: 16px;
    width: 100%;
    margin-top : 10px;
    cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #AACB73;
    color: white;
  }
`
export const NaverImg = styled.img`
  width : 30px;
  height : 30px;
  margin-right : 10px;
`


export const ErrorMessage = styled.div`
  color : red;
  font-size : 16px;
 text-align : center;
`
export const PhoneWrap = styled.div`
  display : flex;
  width : 500px;
  justify-content : space-between;

`
export const AddressWrap = styled.div`
  display : flex;
  width : 500px;
`
export const AddressInput = styled.input`
  width: 400px;
  height : 52px;
  font-size: 16px;
  border : 2px solid #CDE990;
  padding: 10px;
  border-radius: 25px 0 0 25px;
  &:hover {
    border : 2px solid #AACB73;
  }
  &:focus{
    outline : none;
  }

`

export const AddressButton = styled.button`
  width : 100px;
  height : 52px;
  background-color : #CDE990;
  border : none;
  border-radius : 0 25px 25px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #AACB73;
    color: white;
  }
`
export const FileInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  background-color: #CDE990;
  padding: 10px 20px;
  border-radius: 25px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #AACB73;
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
    border: 2px solid #CDE990;
    margin-top : 10px;
`;

export const Styled = {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  ErrorMessage,
  AddressWrap,
  AddressInput,
  AddressButton,
  FileInputWrap,
  FileInputLabel,
  FileInput,
  ImagePreview,
  SocialButtonWrap,
  NaverImg,

};

