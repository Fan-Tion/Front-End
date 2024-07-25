import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { membersApi } from '../../api/member';
import { Styled } from '../../styled-components/AuthStyle';
import AddressInput from './AddressInput';
import PhoneInput from './PhoneInput';

interface SignUpInterface {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  address: string;
  profileImage: Blob | null;
}
const errorMessages = {
  emptyFields: '필수 입력 항목입니다.',
  passwordLength: '비밀번호는 6자 이상 15자 이하로 입력해주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  nicknameLength:
    '닉네임은 1자에서 12자 사이어야 하며, 특수문자를 포함할 수 없습니다.',
  phoneNumberInvalid: '전화번호는 11자리 숫자여야 합니다.',
  serverError: '서버에서 에러가 발생했습니다.',
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpInterface>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    address: '',
    profileImage: null,
  });
  // 유효성 검사 오류를 담는 상태와 해당 상태를 업데이트 하는 함수 선언
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage' && files) {
      const file = files[0];
      setFormData({
        ...formData,
        profileImage: file,
      });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handlePhoneChange = (phoneNumber: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      phoneNumber,
    }));
  };

  const handleAddressChange = (address: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); //오류 초기화

    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'nickname',
      'phoneNumber',
      'address',
    ];
    const emptyFields = requiredFields.filter(
      field => !formData[field as keyof SignUpInterface],
    ); //filter 함수를 사용해서 formData 키 확인
    if (emptyFields.length > 0) {
      //
      emptyFields.forEach(field => {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: errorMessages.emptyFields,
        }));
      });
      return;
    }
    //비밀번호 길이 검사
    if (formData.password.length < 6 || formData.password.length > 15) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: errorMessages.passwordLength,
      }));
      return;
    }

    // 비밀번호, 비밀번호 확인 값이 일치하지않으면 오류
    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: errorMessages.passwordMismatch,
      }));
      return;
    }

    //닉네임 길이 검사
    if (!/^[a-zA-Z0-9가-힣]{1,12}$/.test(formData.nickname)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nickname: errorMessages.nicknameLength,
      }));
      return;
    }
    // 전화번호가 11자리 숫자인지 확인
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        phoneNumber: errorMessages.phoneNumberInvalid,
      }));
      return;
    }

    if (!formData.address.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        address: errorMessages.emptyFields,
      }));
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataToSend.append(
            key,
            formData[key as keyof SignUpInterface] as string | Blob,
          );
        }
      });
      const jsonSignUpData = JSON.stringify(formData);
      const request = new Blob([jsonSignUpData], { type: 'application/json' });
      const data = {
        request: request,
        file: formData.profileImage,
      };
      console.log(data);
        await membersApi.signUp(data);
      navigate('/signin'); //회원가입 성공후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      // 에러 처리
      setErrors(prevErrors => ({
        ...prevErrors,
        serverError: errorMessages.serverError,
      }));
    }
  };

  return (
    <Styled.OuterWrapper>
      <Styled.Wrapper>
        <Styled.Title>회원가입</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            name="email"
            placeholder="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>
          )}
          <Styled.Input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>
          )}
          <Styled.Input
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <Styled.ErrorMessage>{errors.confirmPassword}</Styled.ErrorMessage>
          )}
          <Styled.Input
            name="nickname"
            placeholder="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && (
            <Styled.ErrorMessage>{errors.nickname}</Styled.ErrorMessage>
          )}
          <PhoneInput
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
          />
          {errors.phoneNumber && (
            <Styled.ErrorMessage>{errors.phoneNumber}</Styled.ErrorMessage>
          )}
          <AddressInput
            value={formData.address}
            onChange={handleAddressChange}
          />
          {errors.address && (
            <Styled.ErrorMessage>{errors.address}</Styled.ErrorMessage>
          )}
          <Styled.FileInputWrap>
            <Styled.FileInputLabel htmlFor="profileImage">
              프로필 이미지 설정하기
            </Styled.FileInputLabel>
            <Styled.FileInput
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            {previewUrl && (
              <Styled.ImagePreview src={previewUrl} alt="Profile Preview" />
            )}
          </Styled.FileInputWrap>
          <Styled.Input type="submit" value="Sign up" />
          {errors.serverError && (
            <Styled.ErrorMessage>{errors.serverError}</Styled.ErrorMessage>
          )}
        </Styled.Form>
        <Styled.Switcher>
          이미 계정이 있으신가요? <Link to="/signin">로그인 페이지</Link>
        </Styled.Switcher>
      </Styled.Wrapper>
            <Styled.LogoLink to="/">
        <Styled.LogoText>Fan-Tion</Styled.LogoText>
      </Styled.LogoLink>
    </Styled.OuterWrapper>
  );
}
