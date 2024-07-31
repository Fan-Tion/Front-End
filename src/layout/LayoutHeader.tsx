import { membersApi } from '@api/member';
import { Withdrawal } from '@components/MyPageComponent/Withdrawal';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';

const Wrapper = styled.header`
  width: 100%;
  min-width: 1800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffd4d4;
  border-bottom: 1px solid #ffd4d4;
  a {
    text-decoration: none;
  }
`;

const MenuItem = styled.div`
  margin-right: 60px;
  &:hover {
    border-radius: 25px;
    background-color: #ffb3b3;
    transform: scale(1.05);
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 20px;
`;

const SearchInput = styled.input`
  width: 350px;
  height: 48px;
  font-size: 16px;
  border: 2px solid #cde990;
  padding: 10px;

  box-sizing: border-box;
  &:hover {
    border: 2px solid #aacb73;
  }
  &:focus {
    outline: none;
  }
`;
const SearchButton = styled.button`
  display: flex;
  width: 50px;
  height: 48px;
  background-color: #cde990;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const MenuButton = styled.button`
  width: 90px;
  height: 40px;
  font-weight: bold;
  background-color: #cde990;
  color: #222;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #aacb73;
    color: white;
  }
`;

const LogOutBtn = styled.button`
  width: 90px;
  height: 40px;
  font-weight: bold;
  background-color: #fc8b8b;
  color: #222;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #eb4646;
    color: white;
  }
`;

const LogoImage = styled.img`
  width: 110px;
  height: 70px;
  border-radius: 15px;
  object-fit: cover;
  object-position: center;
`;

const CategorySelect = styled.select`
  height: 48px;
  font-size: 16px;
  border: 2px solid #cde990;
  border-radius: 25px 0 0 25px;
  padding: 0 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  box-sizing: border-box;

  &:hover,
  &:focus {
    border-color: #aacb73;
    outline: none;
  }
  &::-ms-expand {
    display: none;
  }
`;

const OptionItem = styled.option`
  background-color: #fff;
  color: #222;
  font-size: 16px;
`;
const CustomSelectWrapper = styled.div`
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

export default function LayoutHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies, , removeCookie] = useCookies(['Authorization']);
  const [keyword, setKeyword] = useState('');
  const [categoryOption, setCategoryOption] = useState('ALL');

  const navigate = useNavigate();

  const categories = [
    'ALL',
    'ACCESSORIES',
    'ALBUM',
    'CLOTHES',
    'FIGURE',
    'GAME',
    'PHOTO_CARD',
    'POSTER',
    'SIGN',
    'OTHER',
  ];

  useEffect(() => {
    setIsLoggedIn(!!cookies.Authorization);
  }, [cookies]);

  const handleLogout = async () => {
    try {
      const response = await membersApi.signOut();
      console.log(response);
      removeCookie('Authorization', { path: '/' });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout에러', error);
    }
  };

  const handleSearch = () => {
    navigate(
      `/search?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(categoryOption)}&page=0`,
    );
    setKeyword('');
  };

  return (
    <Wrapper>
      <Link to="/">
        <MenuItem>
          <LogoImage src="/img/mainLogo.png" />
        </MenuItem>
      </Link>
      {/* <Link to='/'>
        <MenuItem>
          <MenuName>Auction</MenuName>
        </MenuItem>
      </Link>
      <Link to='/'>
        <MenuItem>
          <MenuName>Community</MenuName>
        </MenuItem>
      </Link> */}
      <SearchBar>
        <CustomSelectWrapper>
          <CategorySelect
            value={categoryOption}
            onChange={e => setCategoryOption(e.target.value)}
          >
            {categories.map(category => (
              <OptionItem key={category} value={category}>
                {category}
              </OptionItem>
            ))}
          </CategorySelect>
        </CustomSelectWrapper>
        <SearchInput
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
          <SearchIcon size={22} color="#222" strokeWidth={1.5} />
        </SearchButton>
      </SearchBar>
      <ButtonGroup>
        <Link to="auction/create">
          <MenuButton>경매등록</MenuButton>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/mypage">
              <MenuButton>MyPage</MenuButton>
            </Link>
            <LogOutBtn onClick={handleLogout}>Logout</LogOutBtn>
            <Withdrawal />
          </>
        ) : (
          <Link to="/signin">
            <MenuButton>Login</MenuButton>
          </Link>
        )}
      </ButtonGroup>
    </Wrapper>
  );
}
