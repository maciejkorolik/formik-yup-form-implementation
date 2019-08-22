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
  ${({ top }) =>
    top &&
    css`
      height: 20px;
      background-color: ${({ theme }) => theme.darkBlue};
    `}
`;

const Heading = styled.h1`
  color: white;
  width: 100%;
  max-width: 1000px;
  margin: 0;
  padding: 0 20px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.thin};
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
