import * as yup from 'yup'

const noHtml = /^(?!.*<[^>]+>).*/

export const checkoutSchema = yup.object({
  name: yup
    .string()
    .matches(noHtml, 'HTML tags are not allowed')
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(noHtml, 'HTML tags are not allowed')
    .required('Last name is required'),
  company: yup.string().matches(noHtml, 'HTML tags are not allowed').notRequired(),
  country: yup
    .string()
    .matches(noHtml, 'HTML tags are not allowed')
    .required('Country is required'),
  city: yup.string().matches(noHtml, 'HTML tags are not allowed').required('City is required'),
  address: yup
    .string()
    .matches(noHtml, 'HTML tags are not allowed')
    .required('Street address is required'),
  zip: yup
    .string()
    .matches(/^\d{4,10}$/, 'Enter a valid ZIP code')
    .matches(noHtml, 'HTML tags are not allowed')
    .required('ZIP code is required'),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number')
    .matches(noHtml, 'HTML tags are not allowed')
    .required('Phone number is required'),
  notes: yup.string().matches(noHtml, 'HTML tags are not allowed').notRequired(),
})
