import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
import Modal from '../../utils/Modal';
import CheckoutPage from './CheckOut';

const Wrapper = styled.div`
  margin-top: 40px;

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 96%;
  margin: 0 auto;
`;
const Input = styled.input`
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '40px'};
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #4fd66e;
  padding: 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
const Nums = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: #e8e9ec;
  border: 1px #e8e9ec;
  border-radius: 50%;
  font-size: 1.2em;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #ccc;
  }
`;
const Button = styled(GlobalButton)`
  font-size: 16px;
  border-radius: 15px;
  background-color: #e8e9ec;
  &:hover {
    color: #eee;
    background-color: #4fd66e;
  }
  &:last-of-type {
    background-color: ${props => (props.disabled ? '#e8e9ec' : '')};
    cursor: ${props => (props.disabled ? 'default' : '')};

    &:hover {
      background-color: ${props => (props.disabled ? '#e8e9ec' : '')};
      color: ${props => (props.disabled ? '#222' : '')};
    }
  }
`;
const Recharge = styled.div`
  margin-top: 50px;
  padding: 0 10px;
`;

export default function ChangePrice() {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatNumber = (value: number) => {
    return value.toLocaleString('ko-KR');
  };
  const [inputValue, setInputValue] = useState(formatNumber(1000) + ' 원'); //BELOW_ZERO_AMOUNT 에러 해결

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const rawValue = input.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자 제거

    if (rawValue) {
      const numberValue = parseInt(rawValue, 10);
      const formattedValue = `${formatNumber(numberValue)} 원`;

      setInputValue(formattedValue);

      // 커서 위치를 숫자 끝으로
      setTimeout(() => {
        const position = formattedValue.length - 2;
        input.setSelectionRange(position, position);
      }, 0);
    } else {
      setInputValue('');
    }
  };

  const handleInputFocus = () => {
    const input = inputRef.current;
    if (input) {
      const position = input.value.length - 2; // 커서 위치를 숫자 끝으로
      setTimeout(() => {
        input.setSelectionRange(position, position);
      }, 0);
    }
  };

  const handleInputClick = () => {
    const input = inputRef.current;
    if (input) {
      const position = input.value.length - 2; // 커서 위치를 숫자 끝으로
      setTimeout(() => {
        input.setSelectionRange(position, position);
      }, 0);
    }
  };

  const handleInputPlus = (amount: number) => {
    const currentValue = parseInt(inputValue.replace(/[^0-9]/g, ''), 10) || 0;
    const newValue = currentValue === 1000 ? amount : currentValue + amount; //기본값 1000원일 때는 초기화 그 외에는 더하기
    const formattedValue = `${formatNumber(newValue)} 원`;

    setInputValue(formattedValue);

    if (inputRef.current) {
      const newPosition = formattedValue.length - 2; // 커서 위치를 숫자 끝으로
      setTimeout(() => {
        inputRef.current!.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          ref={inputRef}
          type="text"
          width="100%"
          placeholder="충전할 금액을 입력해 주세요."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          required
        />
        {inputValue && <ClearButton onClick={handleClearInput}>×</ClearButton>}
      </InputWrapper>
      <Nums>
        <Button width="140px" onClick={() => handleInputPlus(10000)}>
          + 1만
        </Button>
        <Button width="140px" onClick={() => handleInputPlus(50000)}>
          + 5만
        </Button>
        <Button width="140px" onClick={() => handleInputPlus(100000)}>
          + 10만
        </Button>
      </Nums>
      <Recharge>
        <Button
          width="100%"
          onClick={toggleModal}
          disabled={!inputValue.trim()}
        >
          충전하기
        </Button>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <CheckoutPage
            inputValue={parseInt(inputValue.replace(/[^0-9]/g, '')) || 0}
          />
        </Modal>
      </Recharge>
    </Wrapper>
  );
}
