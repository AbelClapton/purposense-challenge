'use client'

import { FormProvider } from '@/app/contexts'
import { FormState } from '@/app/types'
import { DetailedHTMLProps, FormHTMLAttributes } from 'react'

export type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  onSubmit: (data: FormState) => void
}

export const Form: React.FC<FormProps> = ({ onSubmit, ...props }) => {
  return (
    <FormProvider onSubmit={onSubmit}>
      <form onSubmit={(e) => e.preventDefault()} {...props} />
    </FormProvider>
  )
}
