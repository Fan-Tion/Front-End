import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding : 10px 20px;
  background-color : rgb(52, 58, 64);
  border-bottom : 1px solid rgb(52,58,64);
  a{
    text-decoration : none;
  }
`


const MenuItem = styled.div`
  margin-right: 60px;
  padding : 15px;
  &:hover {
    background-color: #495057;
    transform: scale(1.05); 
  }

`


const MenuName = styled.div`
   font-weight: bold;
   color : white;
`


const SearchBar = styled.div`
  display: flex;
  margin-left : auto;
  margin-right : 20px;
  
`;

const SearchInput = styled.input`
  padding: 5px;
  
`;
const SearchButton = styled.button`
  
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const MenuButton = styled.button`
  width : 90px;
  height : 40px;
  background-color: gray;
  color: #fff;
  padding: 8px 12px;
  border : none;
  border-radius: 6px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05); 
  }
`



export default function LayoutHeader() {

  return (
    <Wrapper>
        <Link to='/'>
        <MenuItem>
        <MenuName>Logo</MenuName>
        </MenuItem>
        </Link>
        <Link to='/auction'>
        <MenuItem>
        <MenuName>Auction</MenuName>
        </MenuItem>
        </Link>
        <Link to='/community'>
        <MenuItem>
        <MenuName>Community</MenuName>
        </MenuItem>
        </Link>
        <SearchBar>
          <SearchInput type="text" placeholder="검색"/>
          <SearchButton >I</SearchButton>
        </SearchBar>
        <ButtonGroup>
        <Link to=''>
        <MenuButton>경매등록</MenuButton>
        </Link>
        <Link to='/members/my-info'>
        <MenuButton>MyPage</MenuButton>
        </Link>
        </ButtonGroup>
    </Wrapper>
  )
}