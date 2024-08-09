import React, { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';
import { Styled } from '../../styled-components/AuthStyle';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressInputs = styled.input`
  height: 40px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
  &:hover {
    border: 2px solid #bbb;
  }
  &:focus {
    outline: none;
  }
`;

export default function AddressInput({ onChange }: AddressInputProps) {
  const [addressPart1, setAddressPart1] = useState('');
  const [addressPart2, setAddressPart2] = useState('');

  const openPostcodePopup = useDaumPostcodePopup();

  // 주소입력이 바뀔때마다 값 변경
  useEffect(() => {
    onChange(`${addressPart1}${addressPart2}`);
  }, [addressPart1, addressPart2]);

  // 주소검색 완료시 실행되는 콜백함수
  const handleComplete = (data: any) => {
    setAddressPart1(data.address);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    part: number,
  ) => {
    const input = e.target.value;

    if (part === 1) {
      setAddressPart1(input);
    } else {
      setAddressPart2(input);
    }
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPostcodePopup({
      onComplete: handleComplete,
    });
  };

  return (
    <>
      <Styled.ButtonWrap>
        <Styled.CheckInput
          width="300px"
          height="50px"
          placeholder="주소를 검색해주세요."
          value={addressPart1}
          onChange={e => handleAddressChange(e, 1)}
          readOnly
        />
        <Styled.CheckButton onClick={handleSearchClick}>
          주소 검색
        </Styled.CheckButton>
      </Styled.ButtonWrap>
      <AddressInputs
        width="100%"
        height="40px"
        placeholder="상세주소 : 건물명, 동/호수 등의 상세주소를 입력해주세요 "
        value={addressPart2}
        onChange={e => handleAddressChange(e, 2)}
      />
    </>
  );
}
