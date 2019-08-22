import styled from 'styled-components';
import { inputStyle } from '../theme/mixins';

const Textarea = styled.textarea`
  height: 180px;
  width: 100%;
  ${({ theme }) => inputStyle(theme)};
  resize: none;
`;

export default Textarea;
