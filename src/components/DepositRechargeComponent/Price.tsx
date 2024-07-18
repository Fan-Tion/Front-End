import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GlobalButton, GlobalInput } from '../../styled-components/Globalstyle';
import Modal from '../../utils/Modal';
import CheckoutPage from './Checkout';

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
  width: 100%;
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
  background: #ccc;
  border: 1px #ccc;
  border-radius: 50%;
  font-size: 1.2em;
  cursor: pointer;
  color: #fff;
`;
const Button = styled(GlobalButton)`
  font-size: 16px;
  border-radius: 15px;

  &:last-of-type {
    background-color: ${props => (props.disabled ? '#c3c3c3' : '')};
    cursor: ${props => (props.disabled ? 'default' : '')};
    &:hover {
      background-color: ${props => (props.disabled ? '#c3c3c3' : '')};
    }
  }
`;
const Recharge = styled.div`
  margin-top: 50px;
  padding: 0 10px;
`;

export default function ChangePrice() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const formatNumber = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

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
    const newValue = currentValue + amount;
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
        <GlobalInput
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
