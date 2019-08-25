import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import NewEventTemplate from '../templates/NewEventTemplate';
import Button from '../components/Button';

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

class SuccessView extends Component {
  state = {
    goBack: false,
  };

  handleClick = () => {
    this.setState({ goBack: true });
  };

  render() {
    const { goBack } = this.state;

    return goBack ? (
      <Redirect to="/form" />
    ) : (
      <NewEventTemplate>
        <SuccessPanel>
          <h2>Success</h2>
          <p>Event has been created</p>
        </SuccessPanel>
        <Button secondary onClick={this.handleClick}>
          Create another event
        </Button>
      </NewEventTemplate>
    );
  }
}

export default SuccessView;
