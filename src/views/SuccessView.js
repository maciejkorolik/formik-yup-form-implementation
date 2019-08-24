import React from 'react';
import styled from 'styled-components';
import NewItemTemplate from '../templates/NewItemTemplate';

const SuccessPanel = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  margin: 0 auto 20px auto;
  background-color: ${({ theme }) => theme.successBackground};
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.15);
  h2 {
    margin: 0 0 20px 0;
    font-family: 'Open sans', sans-serif;
    font-weight: ${({ theme }) => theme.regular};
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.successText};
  }
  p {
    margin: 0;
    font-family: 'Open sans', sans-serif;
    font-weight: ${({ theme }) => theme.regular};
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ theme }) => theme.darkGray};
  }
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Success = () => (
  <NewItemTemplate>
    <SuccessPanel>
      <h2>Success</h2>
      <p>Event has been created</p>
    </SuccessPanel>
  </NewItemTemplate>
);

export default Success;
