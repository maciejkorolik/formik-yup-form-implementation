import styled from 'styled-components';
import { inputStyle } from '../theme/mixins';

const Input = styled.input`
  height: 40px;
  width: ${({ width }) => width || '100%'};
  ${({ theme, error }) => inputStyle(theme, error)};

  &[type='date'] {
    width: 140px;
    color: ${({ theme, value }) => (value ? theme.darkGray : theme.lightGray)};
    &::-webkit-clear-button {
      display: none;
    }
    &::-webkit-inner-spin-button {
      display: none;
    }
    &::-webkit-calendar-picker-indicator {
      color: ${({ theme }) => theme.darkGray};
      &:hover {
        background: transparent;
      }
    }
  }
  &[type='time'] {
    width: 100px;
    margin-right: 10px;
    color: ${({ theme, value }) => (value ? theme.darkGray : theme.lightGray)};
    &::-webkit-clear-button {
      display: none;
    }
    &::-webkit-datetime-edit-ampm-field {
      display: none;
    }
  }

  &[type='radio'] {
    width: 18px;
    height: 18px;
    opacity: 0;
    &:checked + label::before {
      background: radial-gradient(
        ${({ theme }) => theme.lightBlue},
        ${({ theme }) => theme.lightBlue} 40%,
        white 40%,
        white 100%
      );
    }
  }
`;

export const RadioLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
  color: ${({ theme }) => theme.darkGray};
  padding: 0 10px 0 5px;
  position: relative;
  &::before {
    content: '';
    width: 18px;
    height: 18px;
    position: absolute;
    top: 3px;
    left: -18px;
    border-radius: 50%;
    background: white;
    border: 2px solid ${({ theme }) => theme.lightBlue};
  }
`;

export default Input;
