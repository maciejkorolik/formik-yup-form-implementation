import styled, { css } from 'styled-components';

const Label = styled.label`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Roboto', sans-serif;
  font-weight: ${({ theme }) => theme.regular};
  text-transform: uppercase;
  color: ${({ theme, error }) => (error ? theme.error : theme.lightBlue)};

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: ' *';
        color: ${({ theme }) => theme.error};
      }
    `}
`;

export default Label;
