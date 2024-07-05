import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  height : auto;
  border: 4px solid #E2E2E2;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;
export const Section = styled.div`
  display: flex;
  height : 50px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(52, 58, 64);
  padding: 10px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
export const Title = styled.div`
  font-size: 24px;
  color: #fff;
  margin: 0;
`

export const EditButton = styled.button`
  font-size: 16px;
  color: #333;
  font-weight : bold;
  border: 1px solid rgb(52, 58, 64);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`

export const Info = styled.div`
  padding: 20px;
  font-size: 20px;
  color: #333;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
  
`