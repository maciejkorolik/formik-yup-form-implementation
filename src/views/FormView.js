/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import { newEventSchema } from '../validation';
import NewItemTemplate from '../templates/NewItemTemplate';
import FormPanel from '../components/FormPanel';
import Input, { RadioLabel } from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Label from '../components/Label';
import ErrorMark from '../components/ErrorMark';
import Button from '../components/Button';

const StyledForm = styled(Form)`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const RadioGroup = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

class FormView extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    userID: 3,
    categories: [],
    currentUser: {},
    otherUsers: [],
  };

  componentDidMount() {
    // fetch data from mocked json files
    fetch('../data/categories.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ categories: data });
      });
    fetch('../data/employees.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const { userID } = this.state;
        this.setState({
          currentUser: data.find(item => item.id === userID),
          otherUsers: data.filter(item => item.id !== userID),
        });
      });
  }

  render() {
    const { userID, categories, currentUser, otherUsers } = this.state;
    const formatValues = values => {
      const newValues = JSON.parse(JSON.stringify(values));
      const time = moment(`${values.time} ${values.ampm}`, 'hh:mm a').format('HH:mm');

      newValues.paid_event = values.paid_event === 'true';
      newValues.date = `${values.date}T${time}`;
      if (values.duration) {
        newValues.duration = values.duration * 60;
      }
      if (values.coordinator_email) {
        newValues.coordinator = {
          id: values.coordinator_id,
          email: values.coordinator_email,
        };
      } else {
        newValues.coordinator = {
          id: values.coordinator_id,
        };
      }
      delete newValues.coordinator_id;
      delete newValues.coordinator_email;
      delete newValues.time;
      delete newValues.ampm;
      return newValues;
    };
    return (
      <NewItemTemplate>
        <Formik
          initialValues={{
            title: '',
            description: '',
            paid_event: 'false',
            ampm: 'am',
            coordinator_id: userID,
          }}
          validationSchema={newEventSchema}
          onSubmit={(values, { resetForm }) => {
            const formattedValues = formatValues(values);
            console.log(formattedValues);
            resetForm({});
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <StyledForm>
              <FormPanel name="About">
                <FormRow>
                  <Label required error={errors.title && touched.title}>
                    title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title}
                    value={values.title || ''}
                    placeholder="Make it short and clear"
                  />
                  <ErrorMessage component={ErrorMark} name="title" />
                </FormRow>
                <FormRow>
                  <Label required error={errors.description && touched.description}>
                    description
                  </Label>
                  <div>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.description && touched.description}
                      value={values.description || ''}
                      placeholder="Write about your event, be creative"
                    />
                    <SmallDescription>
                      <span>Max length: 140 characters</span>
                      <span>{String(values.description).length}/140</span>
                    </SmallDescription>
                  </div>
                  <ErrorMessage component={ErrorMark} name="description" />
                </FormRow>
                <FormRow>
                  <Label>category</Label>
                  <div>
                    <Select
                      name="category_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category_id || ''}
                    >
                      <option value="" disabled hidden>
                        Select category skills, interests, locations
                      </option>
                      {categories.map(item => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                    <SmallDescription>
                      Describes topic and people who should be interested in this event
                    </SmallDescription>
                  </div>
                  <ErrorMessage component={ErrorMark} name="category" />
                </FormRow>
                <FormRow>
                  <Label error={errors.event_fee && touched.event_fee}>payment</Label>
                  <div>
                    <Field
                      component={RadioGroup}
                      name="paid_event"
                      value={values.paid_event || 'false'}
                    >
                      <Input
                        type="radio"
                        name="paid_event"
                        id="payment-free"
                        value="false"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultChecked
                      />
                      <RadioLabel htmlFor="payment-free">Free event</RadioLabel>
                      <Input
                        type="radio"
                        name="paid_event"
                        id="payment-paid"
                        value="true"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <RadioLabel htmlFor="payment-paid">Paid Event</RadioLabel>
                    </Field>
                    {values.paid_event === 'true' ? (
                      <>
                        <Input
                          type="text"
                          width="100px"
                          placeholder="Fee"
                          name="event_fee"
                          error={errors.event_fee && touched.event_fee}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.event_fee || ''}
                        />
                        <StyledSpan>$</StyledSpan>
                      </>
                    ) : null}
                  </div>
                  <ErrorMessage component={ErrorMark} name="event_fee" />
                </FormRow>
                <FormRow>
                  <Label error={errors.reward && touched.reward}>reward</Label>
                  <div>
                    <Input
                      type="text"
                      width="100px"
                      placeholder="Number"
                      name="reward"
                      error={errors.reward && touched.reward}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reward || ''}
                    />
                    <StyledSpan>reward points for attendance</StyledSpan>
                  </div>
                  <ErrorMessage component={ErrorMark} name="reward" />
                </FormRow>
              </FormPanel>

              <FormPanel name="Coordinator">
                <FormRow>
                  <Label required error={errors.coordinator_id && touched.coordinator_id}>
                    responsible
                  </Label>
                  <Select
                    name="coordinator_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.coordinator_id || userID}
                    error={errors.coordinator_id && touched.coordinator_id}
                  >
                    <optgroup label="Me">
                      <option
                        value={userID}
                        key={userID}
                      >{`${currentUser.name} ${currentUser.lastname}`}</option>
                    </optgroup>
                    <optgroup label="Others">
                      {otherUsers.map(user => (
                        <option
                          value={user.id}
                          key={user.id}
                        >{`${user.name} ${user.lastname}`}</option>
                      ))}
                    </optgroup>
                  </Select>
                  <ErrorMessage component={ErrorMark} name="coordinator_id" />
                </FormRow>
                <FormRow>
                  <Label error={errors.coordinator_email && touched.coordinator_email}>email</Label>
                  <Input
                    type="text"
                    placeholder="Email"
                    name="coordinator_email"
                    error={errors.coordinator_email && touched.coordinator_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.coordinator_email || ''}
                  />
                  <ErrorMessage component={ErrorMark} name="coordinator_email" />
                </FormRow>
              </FormPanel>

              <FormPanel name="When">
                <FormRow>
                  <Label
                    required
                    error={(errors.date && touched.date) || (errors.time && touched.time)}
                  >
                    starts on
                  </Label>
                  <div>
                    <Input
                      type="date"
                      name="date"
                      error={errors.date && touched.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date || ''}
                    />
                    <StyledSpan>at</StyledSpan>
                    <Input
                      type="time"
                      name="time"
                      max="12:59"
                      error={errors.time && touched.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.time || ''}
                    />
                    <Field component={RadioGroup} name="ampm" value={values.ampm || 'am'}>
                      <Input
                        type="radio"
                        name="ampm"
                        id="ampm-am"
                        value="am"
                        defaultChecked
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <RadioLabel htmlFor="ampm-am">AM</RadioLabel>
                      <Input
                        type="radio"
                        name="ampm"
                        value="pm"
                        id="ampm-pm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <RadioLabel htmlFor="ampm-pm">PM</RadioLabel>
                    </Field>
                  </div>
                  <div>
                    <ErrorMessage component={ErrorMark} name="date" />
                    <ErrorMessage component={ErrorMark} name="time" />
                  </div>
                </FormRow>
                <FormRow>
                  <Label error={errors.duration && touched.duration}>duration</Label>
                  <div>
                    <Input
                      type="text"
                      width="100px"
                      placeholder="Number"
                      name="duration"
                      error={errors.duration && touched.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.duration || ''}
                    />
                    <StyledSpan>hour</StyledSpan>
                  </div>
                  <ErrorMessage component={ErrorMark} name="duration" />
                </FormRow>
              </FormPanel>
              <Button type="submit">publish event</Button>
            </StyledForm>
          )}
        </Formik>
      </NewItemTemplate>
    );
  }
}

export default FormView;
