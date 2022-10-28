import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const LoadingIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes loading {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #d0d0d0;

    &:nth-last-child(1) {
      animation: loading 1.5s 1s infinite;
    }

    &:nth-last-child(2) {
      animation: loading 1.5s 0.5s infinite;
    }

    &:nth-last-child(3) {
      animation: loading 1.5s 0s infinite;
    }

    &:not(:first-child) {
      margin-left: 5px;
    }
  }
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <LoadingIcon>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </LoadingIcon>
    </LoadingWrapper>
  );
}
