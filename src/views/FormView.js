/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';

import { newEventSchema } from '../validation';
import NewEventTemplate from '../templates/NewEventTemplate';
import FormPanel from '../components/FormPanel';
import Input, { RadioLabel } from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Label from '../components/Label';
import ErrorMark from '../components/ErrorMark';
import Button from '../components/Button';

// styled components for form layout:
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
  min-height: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
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
  color: ${({ theme, error }) => (error ? theme.error : theme.lightGray)};
`;

const StyledSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-family: 'Open sans', sans-serif;
  color: ${({ theme }) => theme.darkGray};
  line-height: 1.7;
  padding: 0 10px;
`;

const RadioGroup = styled.div`
  display: inline-flex;
  min-height: 50px;
  flex-direction: row;
  align-items: center;
`;

// ******** actual FormView component starts here:  *********

class FormView extends Component {
  state = {
    userID: 3,
    categories: [],
    currentUser: {},
    otherUsers: [],
    success: false,
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
    const { userID, categories, currentUser, otherUsers, success } = this.state;

    // function for formatting form values to the appropriate data structure:
    const formatValues = values => {
      const time = moment(`${values.time} ${values.ampm}`, 'hh:mm a').format('HH:mm');
      const date = moment(values.date).format('YYYY-MM-DD');
      // appropriate data structure
      const newValues = {
        title: values.title,
        description: values.description,
        category_id: Number(values.category_id) || null, // Formik and Yup return number values as strings (even after successfull validation of type "number")
        paid_event: values.paid_event === 'true',
        event_fee: Number(values.event_fee) || null,
        reward: Number(values.reward) || null,
        date: `${date}T${time}`,
        duration: values.duration * 360 || null,
        coordinator: {
          email: values.coordinator_email || null,
          id: String(values.coordinator_id), // According to specification in the task description, coordinator id on the output should be a string
        },
      };
      // function for removing properties with null value
      const removeNulls = obj =>
        Object.entries(obj).forEach(([key, val]) => {
          if (val && typeof val === 'object') removeNulls(val);
          // eslint-disable-next-line no-param-reassign
          else if (val == null) delete obj[key];
        });
      // remove nulls and return formatted data
      removeNulls(newValues);
      return newValues;
    };

    // show success view on successful submit of a form
    if (success) return <Redirect to="/success" />;
    // else: render form
    return (
      <NewEventTemplate>
        <Formik
          initialValues={{
            title: '',
            description: '',
            paid_event: 'false',
            event_fee: '',
            ampm: 'am',
            time: '',
            date: '',
            coordinator_id: userID,
          }}
          validationSchema={newEventSchema}
          onSubmit={(values, { resetForm }) => {
            const formattedValues = formatValues(values);
            console.log(formattedValues);
            resetForm({});
            this.setState({ success: true });
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
                  <Label
                    required
                    error={
                      (errors.description && values.description) ||
                      (errors.description && touched.description)
                    }
                  >
                    description
                  </Label>
                  <div>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (errors.description && values.description) ||
                        (errors.description && touched.description)
                      }
                      value={values.description || ''}
                      placeholder="Write about your event, be creative"
                    />
                    <SmallDescription error={String(values.description).length > 140}>
                      <span>Max length: 140 characters</span>
                      <span>{String(values.description).length}/140</span>
                    </SmallDescription>
                  </div>
                  {(errors.description && values.description) ||
                  (errors.description && touched.description) ? (
                    <ErrorMark>{errors.description}</ErrorMark>
                  ) : null}
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
                        Select category &#40;skills, interests, locations&#41;
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
                          width="70px"
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
                      width="90px"
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
                      min={moment().format('YYYY-MM-DD')}
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
                      width="90px"
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
      </NewEventTemplate>
    );
  }
}

export default FormView;
