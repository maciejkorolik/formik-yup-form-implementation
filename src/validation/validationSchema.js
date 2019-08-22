import * as Yup from 'yup';

export const newEventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required'),
  category_id: Yup.number('Not valid'),
  paid_event: Yup.string().required('Required'),
  event_fee: Yup.number('Not valid'),
  reward: Yup.number('Not valid'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  ampm: Yup.string().required('ampm is required'),
  coordinator_id: Yup.number('Not valid').required('coordinator is required'),
  coordinator_email: Yup.string().email('add valid email'),
});
