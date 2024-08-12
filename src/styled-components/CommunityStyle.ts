import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  justify-content: center;
  align-items: center;
  margin: 0 260px;
  background-color: white;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(400px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const ChannelSection = styled.div`
  width: 400px;
  height: 400px;
  padding: 15px;
  margin-right: 20px;
  background-color: white;
  border: 1px solid #e8e9ec;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
`;

export const BoardSection = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const SectionTitle = styled.span`
  font-size: 18px;

  color: #222;
  margin-bottom: 5px;
  font-weight: bold;
  border-bottom: 2px solid #4fd66e;
  padding-bottom: 10px;
  cursor: pointer;
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const ListItem = styled.li`
  padding: 10px 15px;
  border-bottom: 1px solid #e8e9ec;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    border-bottom: 1px solid #4fd66e;
  }

  &:last-child {
    border-bottom: none;
  }
`;
