import styled from 'styled-components';
import { inputStyle } from '../theme/mixins';

const Select = styled.select`
  height: 40px;
  width: 100%;
  ${({ theme }) => inputStyle(theme)};
  color: ${({ theme, value }) => (value ? theme.darkGray : theme.lightGray)};
  > option {
    color: ${({ theme }) => theme.darkGray};
  }
`;

export default Select;
