import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ $isVisible: boolean }>`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 110px;
  right: 280px;
  background-color: #cde990;
  color: #222;
  border: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition:
    opacity 0.3s,
    background-color 0.3s;
  &:hover {
    color: white;
    background-color: #aacb73;
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
      ↑
    </Button>
  );
}
