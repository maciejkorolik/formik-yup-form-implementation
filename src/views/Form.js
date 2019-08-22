import React from 'react';
import styled from 'styled-components';
import NewItemTemplate from '../templates/NewItemTemplate';
import FormPanel from '../components/FormPanel';
import Input, { RadioLabel } from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Label from '../components/Label';
import ErrorMark from '../components/ErrorMark';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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
          <Input type="radio" name="radio" id="payment" />
          <RadioLabel htmlFor="payment">payment</RadioLabel>
          <Input type="radio" name="radio" id="payment2" />
          <RadioLabel htmlFor="payment2">payment2</RadioLabel>
        </div>
      </FormRow>
      <FormRow>
        <Label>reward</Label>
        <Input type="text" width="100px" />
      </FormRow>
    </FormPanel>
  </NewItemTemplate>
);

export default Form;
