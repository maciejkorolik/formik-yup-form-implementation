import styled from 'styled-components';

const Input = styled.input`
  height: 40px;
  width: ${({ width }) => width || '100%'};
  padding: 10px;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Roboto', sans-serif;
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  outline: none;
  color: ${({ theme }) => theme.darkGray};

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.lightBlue};
  }

  &:invalid {
    outline: none;
    border: 1px solid ${({ theme }) => theme.error};
  }

  &::placeholder {
    color: ${({ theme }) => theme.lightGray};
  }
`;

export default Input;
