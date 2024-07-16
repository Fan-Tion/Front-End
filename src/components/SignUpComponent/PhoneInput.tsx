import React, { useState , useEffect} from 'react';
import { GlobalInput } from '../../styled-components/Globalstyle';
import { PhoneWrap } from '../../styled-components/AuthStyle';


interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');

  useEffect(() => {
    onChange(`${phonePart1}${phonePart2}${phonePart3}`);
  }, [phonePart1, phonePart2, phonePart3]);


  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>, part: number) {

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
      <GlobalInput
        width='160px'
        height='50px'
        placeholder=" 전화번호 (3자리)"
        value={phonePart1}
        onChange={(e) => handlePhoneChange(e, 1)}
        maxLength={3}
      />
      <GlobalInput
        width='160px'
        height='50px'
        placeholder=" 전화번호 (4자리)"
        value={phonePart2}
        onChange={(e) => handlePhoneChange(e, 2)}
        maxLength={4}
      />
      <GlobalInput
        width='160px'
        height='50px'
        placeholder=" 전화번호 (4자리)"
        value={phonePart3}
        onChange={(e) => handlePhoneChange(e, 3)}
        maxLength={4}
      />
    </PhoneWrap>
  );
}

