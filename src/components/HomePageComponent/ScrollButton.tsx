import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ $isVisible: boolean }>`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 110px;
  right: 500px;
  background-color: #e8e9ec;
  color: #222;
  border: none;
  cursor: pointer;
  svg {
    width: 28px;
    height: 28px;
  }
  border-radius: 12px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition:
    opacity 0.3s,
    background-color 0.3s;
  &:hover {
    color: white;
    background-color: #4fd66e;
  }
`;
export default function ScrollButton() {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Button onClick={scrollToTop} $isVisible={visible}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </Button>
  );
}
