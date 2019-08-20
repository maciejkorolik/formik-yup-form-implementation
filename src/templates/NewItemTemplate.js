import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 100px auto 0 auto;
`;

const Header = styled.header`
  font-size: 20px;
`;

const NewItemTemplate = ({ children }) => (
  <StyledWrapper>
    <Header>New item</Header>
    {children}
  </StyledWrapper>
);

NewItemTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default NewItemTemplate;
