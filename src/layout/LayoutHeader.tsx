import { membersApi } from '@api/member';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../icons/SearchIcon';

const Wrapper = styled.header`
  width: 100%;
  height: 180px;
  min-width: 1800px;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 140px;
  height: auto;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 500px;
`;

const ActionLink = styled(Link)`
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #222;
  text-decoration: none;

  &:hover {
    // font-size: 24px;
    font-weight: bold;
    color: #4fd66e;
  }
`;
const LogInLink = styled(Link)`
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  text-decoration: none;

  &:hover {
    font-weight: bold;
    color: #4fd66e;
  }
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  width: 250px;
`;

const NavLink = styled(Link)`
  margin: 0 20px;
  font-size: 20px;
  color: #222;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    // font-size: 24px;
    // font-weight: 900;
    color: #4fd66e;
  }
`;

const LogOut = styled.button`
  margin: 0 20px;
  font-size: 16px;
  color: #222;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: red;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const CategorySelect = styled.select`
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

const SearchInput = styled.input`
  height: 45px;
  width: 348px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-left: none;
  border-right: none;
  padding: 0 15px;
  outline: none;
  background-color: white;
  cursor: pointer;
`;

const SearchButton = styled.button`
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

const MypageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 250px;
`;

export default function LayoutHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies, , removeCookie] = useCookies(['Authorization']);
  const [keyword, setKeyword] = useState('');
  const [categoryOption, setCategoryOption] = useState('전체');
  const navigate = useNavigate();
  const location = useLocation();

  const categoryMappings: Record<string, string> = {
    전체: 'ALL',
    액세서리: 'ACCESSORIES',
    앨범: 'ALBUM',
    의류: 'CLOTHES',
    피규어: 'FIGURE',
    게임: 'GAME',
    포토카드: 'PHOTO_CARD',
    포스터: 'POSTER',
    싸인: 'SIGN',
    기타: 'OTHER',
  };
  const categories = Object.keys(categoryMappings);

  useEffect(() => {
    setIsLoggedIn(!!cookies.Authorization);
  }, [cookies]);

  const handleLogout = async () => {
    try {
      await membersApi.signOut();
      removeCookie('Authorization', { path: '/' });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout 에러', error);
    }
  };

  const handleSearch = () => {
    const categoryInEnglish = categoryMappings[categoryOption];
    navigate(
      `/search?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(categoryInEnglish)}&page=0`,
    );
    setKeyword('');
  };

  const isCommunityPage = location.pathname.startsWith('/community');

  return (
    <Wrapper>
      <Container>
        <TopSection>
          <Logo>
            <Link to="/">
              <LogoImage src="/img/mainLogo2.png" />
            </Link>
          </Logo>
          <UserActions>
            {isLoggedIn ? (
              <>
                <LogOut onClick={handleLogout}>로그아웃</LogOut>
              </>
            ) : (
              <>
                <LogInLink to="/signin">로그인</LogInLink>
                <LogInLink to="/signup">회원가입</LogInLink>
              </>
            )}
          </UserActions>
        </TopSection>
        <BottomSection>
          <NavLinks>
            <NavLink to="/">경매</NavLink>
            <NavLink to="/community">커뮤니티</NavLink>
          </NavLinks>
          <SearchBar>
            <CustomSelectWrapper>
              <CategorySelect
                value={categoryOption}
                onChange={e => setCategoryOption(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
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
          <MypageWrap>
            {isLoggedIn ? (
              <>
                {isCommunityPage ? (
                  <ActionLink to="community/channel/create">
                    채널 생성
                  </ActionLink>
                ) : (
                  <ActionLink to="/auction/create">경매 등록</ActionLink>
                )}
                <ActionLink to="/mypage">마이페이지</ActionLink>
              </>
            ) : (
              <>
                <ActionLink to="/signin">마이페이지</ActionLink>
                {isCommunityPage ? (
                  <ActionLink to="community/channel/create">
                    채널 생성
                  </ActionLink>
                ) : (
                  <ActionLink to="/signin">경매 등록</ActionLink>
                )}
              </>
            )}
          </MypageWrap>
        </BottomSection>
      </Container>
    </Wrapper>
  );
}
