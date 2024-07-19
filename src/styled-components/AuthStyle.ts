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
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;

  &[type='submit'] {
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #007bff;
      color: white;
    }

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;
export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    text-decoration-line: none;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  text-align: center;
`;

export const PhoneNumberWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 15px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 150px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
export const SelectItem = styled.option`
  padding: 10px;
  color: black;
`;

export const SelectWrapper = styled.div`
  position: relative;
  max-width: 400px;
  margin: 10px 0;
`;

export const Styled = {
  OuterWrapper,
  Wrapper,
  Title,
  Form,
  Input,
  Switcher,
  ErrorMessage,
  Select,
  AddressWrapper,
  PhoneNumberWrapper,
  SelectItem,
  SelectWrapper,
};
