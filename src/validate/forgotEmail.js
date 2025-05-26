import * as yup from 'yup'

export const forgotSchema = yup.object({
  forgotEmail: yup
    .string()
    .email('Invalid email format')
    .matches(/^(?!.*<script|.*<\/script|.*javascript:).*$/),
})
