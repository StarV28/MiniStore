import * as yup from 'yup'

export const emailSchema = yup.object({
  emailSab: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^(?!.*<script|.*<\/script|.*javascript:).*$/),
})
