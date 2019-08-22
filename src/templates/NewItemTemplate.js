import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const StyledWrapper = styled.div`
  width: 100%;
  margin: 120px auto 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewItemTemplate = ({ children }) => (
  <>
    <Header>New event</Header>
    <StyledWrapper>{children}</StyledWrapper>
  </>
);

NewItemTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default NewItemTemplate;
