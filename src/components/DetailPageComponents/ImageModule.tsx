import styled from 'styled-components';

const MainImage = styled.img`
  width: 850px;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const SubImage = styled.img`
  width: 200px;
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function ImageModule() {

  // 테스트용 더미 이미지
  const imageSrc = 'https://via.placeholder.com/500'

  return (
    <>
      <MainImage src={imageSrc} />
      <SubImageContainer>
        <SubImage src={imageSrc} />
        <SubImage src={imageSrc} />
        <SubImage src={imageSrc} />
        <SubImage src={imageSrc} />
      </SubImageContainer>
    </>

  )
}
