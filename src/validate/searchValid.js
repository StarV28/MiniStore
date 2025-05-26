import * as yup from 'yup'

export const searchSchema = yup.object({
  search: yup
    .string()
    .required('Search is required')
    .matches(/^(?!.*<script|.*<\/script|.*javascript:).*$/),
})
