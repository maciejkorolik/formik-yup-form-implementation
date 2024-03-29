/* eslint-disable func-names */
import * as Yup from 'yup';
import moment from 'moment';

export const newEventSchema = Yup.object().shape({
  title: Yup.string().required('Title cannot be empty'),
  description: Yup.string()
    .max(140, 'Too long! (max 140 characters)')
    .required('Description cannot be empty'),
  category_id: Yup.number(),
  paid_event: Yup.string().default('false'),
  event_fee: Yup.number().when('paid_event', {
    is: 'true',
    then: Yup.number()
      .required('Fee is required for paid events')
      .typeError('Fee must be a number (dot separated)')
      .positive('Fee must be a positive number'),
  }),
  reward: Yup.number()
    .typeError('Reward must be a number')
    .positive('Reward must be a positive number')
    .integer('Reward must be an integer'),
  ampm: Yup.string()
    .oneOf(['am', 'pm'])
    .default('am'),
  date: Yup.date()
    .required('Date is required')
    .min(moment().format('YYYY-MM-DD'), 'Date cannot be before today'),
  time: Yup.mixed()
    .required('Time is required')
    .test('maxTime', 'Time should be in 12h format', function(value) {
      return moment(value, 'HH:mm').isSameOrBefore(moment('12:59', 'HH:mm'));
    })
    .when('date', {
      is: date => date && moment(date).isSame(moment(), 'day'),
      then: Yup.string().test('minTime', 'Time cannot be before now', function(value) {
        const { ampm } = this.options.parent;
        const submittedTime = moment(`${value} ${ampm}`, 'hh:mm a');
        const check = submittedTime.isAfter(moment());
        return check;
      }),
    }),
  duration: Yup.number()
    .typeError('Duration must be a number (dot separated)')
    .positive('Duration must be a positive number'),
  coordinator_id: Yup.number().required('Coordinator is required'),
  coordinator_email: Yup.string().email('Wrong email format'),
});
