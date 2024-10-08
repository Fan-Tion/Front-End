import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PhoneWrap } from '../../styled-components/AuthStyle';

const Hyphen = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const PhonInput = styled.input`
  width: 33%;
  height: 40px;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  &:hover {
    border: 2px solid #bbb;
  }
  &:focus {
    outline: none;
  }
`;

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ onChange }: PhoneInputProps) {
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');

  const part1Ref = useRef<HTMLInputElement>(null);
  const part2Ref = useRef<HTMLInputElement>(null);
  const part3Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(`${phonePart1}${phonePart2}${phonePart3}`);
  }, [phonePart1, phonePart2, phonePart3]);

  useEffect(() => {
    if (phonePart1.length === 3 && part2Ref.current) {
      part2Ref.current.focus();
    }
    if (phonePart2.length === 4 && part3Ref.current) {
      part3Ref.current.focus();
    }
  }, [phonePart1, phonePart2]);

  function handlePhoneChange(
    e: React.ChangeEvent<HTMLInputElement>,
    part: number,
  ) {
    const input = e.target.value.replace(/\D/g, ''); // 숫자만 입력받기
    if (part === 1 && input.length <= 3) {
      setPhonePart1(input);
    } else if (part === 2 && input.length <= 4) {
      setPhonePart2(input);
    } else if (part === 3 && input.length <= 4) {
      setPhonePart3(input);
    }
    onChange(`${phonePart1}${phonePart2}${phonePart3}`);
  }

  return (
    <PhoneWrap>
      <PhonInput
        width="33%"
        height="40px"
        placeholder="전화번호(3자리)"
        value={phonePart1}
        onChange={e => handlePhoneChange(e, 1)}
        maxLength={3}
        ref={part1Ref}
      />
      <Hyphen>-</Hyphen>
      <PhonInput
        width="33%"
        height="40px"
        placeholder="전화번호(4자리)"
        value={phonePart2}
        onChange={e => handlePhoneChange(e, 2)}
        maxLength={4}
        ref={part2Ref}
      />
      <Hyphen>-</Hyphen>
      <PhonInput
        width="33%"
        height="40px"
        placeholder="전화번호(4자리)"
        value={phonePart3}
        onChange={e => handlePhoneChange(e, 3)}
        maxLength={4}
        ref={part3Ref}
      />
    </PhoneWrap>
  );
}
