export const inputStyle = theme => {
  return `
   padding: 10px;
  margin: 0;
  font-size: ${theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${theme.lightGray};
  outline: none;
  color: ${theme.darkGray};

  &:focus {
    outline: none;
    border: 1px solid ${theme.lightBlue};
  }
  &:invalid {
    outline: none;
    border: 1px solid ${theme.error};
  }
  &::placeholder {
    color: ${theme.lightGray};
  }
`;
};
