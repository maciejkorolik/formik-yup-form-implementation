import React from 'react';
import styled from 'styled-components';
import NewItemTemplate from '../templates/NewItemTemplate';
import FormPanel from '../components/FormPanel';
import Input from '../components/Input';
import Label from '../components/Label';
import ErrorMark from '../components/ErrorMark';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  grid-gap: 10px;
`;

const Form = () => (
  <NewItemTemplate>
    <FormPanel name="details">
      <FormRow>
        <Label required>awerawertwse</Label>
        <Input placeholder="zsasdfasdfasd" />
        <ErrorMark>This field is required</ErrorMark>
      </FormRow>
    </FormPanel>
  </NewItemTemplate>
);

export default Form;
