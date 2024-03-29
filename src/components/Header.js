import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
`;

const Bar = styled.div`
  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.blue};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    height: 70px;
  }
  ${({ top }) =>
    top &&
    css`
      height: 20px;
      background-color: ${({ theme }) => theme.darkBlue};
      @media (max-width: 480px) {
        height: 10px;
      }
    `}
`;

const Heading = styled.h1`
  color: white;
  width: 100%;
  max-width: 1000px;
  margin: 0 20px;
  padding: 0 40px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.light};
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const Header = ({ children }) => (
  <StyledWrapper>
    <Bar top />
    <Bar>
      <Heading>{children}</Heading>
    </Bar>
  </StyledWrapper>
);

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

Header.defaultProps = {
  children: '',
};

export default Header;
