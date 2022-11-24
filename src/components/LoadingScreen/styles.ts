import styled from '@emotion/styled'

export const LoadingView = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
  }
`
