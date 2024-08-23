import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  min-width: 1800px;
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
`;

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

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ChannelWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #4fd66e;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;
export const ChannelImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ChannelItemContainer = styled.div``;

export const ChannelTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
`;

export const ChannelDescription = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const BoardListContainer = styled.div`
  width: 100%;
`;

export const BoardListHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 150px 200px 80px 80px;
  padding: 10px 20px;

  background-color: #e8e9ec;
  border-bottom: 2px solid #e8e9ec;
  font-weight: bold;
  color: #222;
`;
export const BoarderCell = styled.div`
  min-width: 70px;
`;

export const BoardListItem = styled.div`
  display: grid;

  grid-template-columns: 50px 1fr 150px 200px 80px 80px;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e9ec;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    border-bottom: 1px solid #4fd66e;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const BottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1800px;
  height: 100px;
`;
export const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:after {
    content: '▼';
    font-size: 12px;
    color: #222;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const CategorySelect = styled.select`
  width: 150px;
  height: 45px;
  font-size: 14px;
  border: 1px solid #ced4da;
  padding: 0 15px;
  border-radius: 25px 0 0 25px;
  outline: none;
  appearance: none;
  background-color: white;
  cursor: pointer;
`;

export const ComSearchInput = styled.input`
  height: 45px;
  width: 348px;
  font-size: 14px;
  border: 1px solid #ced4da;
  padding: 0 15px;
  outline: none;
  background-color: white;
  cursor: pointer;
`;

export const ComSearchButton = styled.button`
  height: 45px;
  padding: 0 15px;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ced4da;
  }
`;
