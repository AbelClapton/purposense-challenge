import { LucideProps } from 'lucide-react'
import { FormEvent, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Certainty } from '../constants'

export type Assumption = {
  description: string
  certainty: Certainty
}

// export type FormState = {
//   [key: string]: unknown
// }

export type FormState = {
  reason?: string
  people?: string[]
  assumptions?: Assumption[]
  directOutcomes?: {
    outcome: string
    suboutcomes: string[]
  }[]
  indirectOutcomes?: {
    outcome: string
    suboutcomes: string[]
  }[]
  ultimateImpact?: string[]
}

export type FormContextValue = {
  formState: FormState
  updateField: (field: string, value: unknown) => void
  setFormState: (state: FormState) => void
  getFieldValue: (field: keyof FormState) => unknown
  resetForm: () => void
  handleSubmit: (e: FormEvent) => void
}

export type TypedFormContextValue<T extends FormState> = {
  formState: T
  updateField: <K extends keyof T>(field: K, value: T[K]) => void
  setFormState: (state: T) => void
  getFieldValue: <K extends keyof T>(field: K) => T[K]
  resetForm: () => void
}

// Icon type for Lucide icons
export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>
