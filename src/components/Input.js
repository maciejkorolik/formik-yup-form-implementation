import styled from 'styled-components';
import { inputStyle } from '../theme/mixins';

const Input = styled.input`
  height: 40px;
  width: ${({ width }) => width || '100%'};
  ${({ theme }) => inputStyle(theme)};

  &[type='date'] {
    width: 160px;
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
    width: 80px;
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
    padding: 0;
    margin: 5px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.lightBlue};
    position: relative;
    &:checked {
      width: 18px;
      height: 18px;
      &::after {
        content: '';
        background-color: ${({ theme }) => theme.lightBlue};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        top: 4px;
        left: 4px;
      }
    }
  }
`;

export default Input;
