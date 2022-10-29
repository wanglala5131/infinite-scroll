import styled from 'styled-components';

const GoTopBox = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  padding: 10px;
  background-color: #7b7b7b;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;

export default function GoTop() {
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return <GoTopBox onClick={ScrollToTop}>Go Top</GoTopBox>;
}
