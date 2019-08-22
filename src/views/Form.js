import React from 'react';
import styled from 'styled-components';
import NewItemTemplate from '../templates/NewItemTemplate';
import FormPanel from '../components/FormPanel';
import Input, { RadioLabel } from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Label from '../components/Label';
import ErrorMark from '../components/ErrorMark';
import Button from '../components/Button';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: start;
  grid-gap: 10px;
  margin: 5px 0;
`;
const SmallDescription = styled.div`
  display: flex;
  width: 100%;
  padding: 3px 0;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: 'Open sans', sans-serif;
  font-weight: ${({ theme }) => theme.regular};
  font-style: italic;
  color: ${({ theme }) => theme.lightGray};
`;

const StyledSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
  color: ${({ theme }) => theme.darkGray};
  padding: 0 10px;
`;

const Form = () => (
  <NewItemTemplate>
    <FormPanel name="About">
      <FormRow>
        <Label required>title</Label>
        <Input type="text" placeholder="Make it short and clear" />
        <ErrorMark>This field is required</ErrorMark>
      </FormRow>
      <FormRow>
        <Label required>description</Label>
        <div>
          <Textarea placeholder="Write about your event, be creative" />
          <SmallDescription>
            <span>Max length: 140 characters</span>
            <span>10/140</span>
          </SmallDescription>
        </div>
        <ErrorMark>This field is required</ErrorMark>
      </FormRow>
      <FormRow>
        <Label>category</Label>
        <div>
          <Select>
            <option>asdf</option>
            <option>asdf</option>
            <option>asdf</option>
            <option>asdf</option>
          </Select>
          <SmallDescription>
            Describes topic and people who should be interested in this event
          </SmallDescription>
        </div>
      </FormRow>
      <FormRow>
        <Label>payment</Label>
        <div>
          <Input type="radio" name="payment" id="payment-free" />
          <RadioLabel htmlFor="payment-free">Free event</RadioLabel>
          <Input type="radio" name="payment" id="payment-paid" />
          <RadioLabel htmlFor="payment-paid">Paid Event</RadioLabel>
          <Input type="text" width="100px" placeholder="Fee" />
          <StyledSpan>$</StyledSpan>
        </div>
      </FormRow>
      <FormRow>
        <Label>reward</Label>
        <div>
          <Input type="text" width="100px" placeholder="Number" />
          <StyledSpan>reward points for attendance</StyledSpan>
        </div>
      </FormRow>
    </FormPanel>
    <FormPanel name="Coordinator">
      <FormRow>
        <Label required>responsible</Label>
        <Select>
          <option>asdf</option>
          <option>asdf</option>
          <option>asdf</option>
          <option>asdf</option>
        </Select>
      </FormRow>
      <FormRow>
        <Label>email</Label>
        <Input type="text" placeholder="Email" />
      </FormRow>
    </FormPanel>
    <FormPanel name="When">
      <FormRow>
        <Label required>starts on</Label>
        <div>
          <Input type="date" />
          <StyledSpan>at</StyledSpan>
          <Input type="time" />
          <Input type="radio" name="ampm" id="ampm-am" />
          <RadioLabel htmlFor="ampm-am">AM</RadioLabel>
          <Input type="radio" name="ampm" id="ampm-pm" />
          <RadioLabel htmlFor="ampm-pm">PM</RadioLabel>
        </div>
      </FormRow>
      <FormRow>
        <Label>duration</Label>
        <div>
          <Input type="text" width="100px" placeholder="Number" />
          <StyledSpan>hour</StyledSpan>
        </div>
      </FormRow>
    </FormPanel>
    <Button>publish event</Button>
  </NewItemTemplate>
);

export default Form;
