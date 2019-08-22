import styled, { css } from 'styled-components';

const Label = styled.label`
  margin: 7px 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
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
