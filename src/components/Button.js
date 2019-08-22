import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 0 20px;
  width: auto;
  min-width: 180px;
  height: 50px;
  border: none;
  border-radius: 3px;
  outline: none;
  background-color: ${({ theme }) => theme.orange};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
  font-weight: ${({ theme }) => theme.regular};
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:focus {
    outline: none;
  }
  &:hover {
    transform: translateY(-2px);
  }
`;

export default Button;
