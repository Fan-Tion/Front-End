import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  height: auto;
  border: 2px solid #e8e9ec;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e8e9ec;
  padding: 30px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin: 0;
`;

export const EditButton = styled.button`
  font-size: 16px;
  color: #222;
  font-weight: bold;
  border: 2px solid #e8e9ec;
  background-color: #e8e9ec;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    border: 1px solid #4fd66e;
    background-color: #4fd66e;
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const Info = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color: #333;
  background-color: white;
  border-bottom: 1px solid #e8e9ec;
  justify-content: space-between;
`;

export const InfoName = styled.p`
  font-size: 20px;
  font-weight: lighter;
  margin-left: 10px;
`;

export const HistoryButton = styled.button`
  width: 90px;
  height: 40px;
  font-weight: bold;
  background-color: #e8e9ec;
  color: #222;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #4fd66e;
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const EditInput = styled.input`
  padding: 15px 20px;
  border-radius: 5px;
  border: 2px solid #e8e9ec;
  font-size: 16px;
  width: 650px;
  &:hover {
    border: 2px solid #4fd66e;
  }
  &:focus {
    border: 2px solid #4fd66e;
    outline: none;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #222;
  font-weight: bold;
  background-color: #e8e9ec;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: auto;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4fd66e;
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;
