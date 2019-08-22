import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px 40px;
  margin: 0 auto 20px auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
  width: 100%;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  position: relative;
  font-weight: ${({ theme }) => theme.regular};
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.blue};
  text-transform: capitalize;

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.lightBlue};
  }
`;

const FormPanel = ({ children, name }) => (
  <StyledWrapper>
    <FormHeader>{name}</FormHeader>
    {children}
  </StyledWrapper>
);

FormPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
};

export default FormPanel;
