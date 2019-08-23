import styled from 'styled-components';
import { inputStyle } from '../theme/mixins';

const Textarea = styled.textarea`
  height: 150px;
  width: 100%;
  ${({ theme, error }) => inputStyle(theme, error)};
  resize: none;
`;

export default Textarea;
