import styled from 'styled-components';

const ErrorMark = styled.div`
  height: auto;
  min-height: 26px;
  width: auto;
  padding: 7px;
  margin: 7px 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.error};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1;
  justify-self: left;
  position: relative;

  &::before {
    position: absolute;
    content: '';
    width: 8px;
    height: 8px;
    top: 9px;
    left: -4px;
    transform-origin: center;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.error};
  }
`;

export default ErrorMark;
