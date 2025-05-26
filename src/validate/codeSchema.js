import * as yup from 'yup'

export const codeSchema = yup.object({
  code: yup.string().length(6, 'Code must be 6 digits').matches(/^\d+$/, 'Only digits allowed'),
})
