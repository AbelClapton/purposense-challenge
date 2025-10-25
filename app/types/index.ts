import { LucideProps } from 'lucide-react'
import {
  DetailedHTMLProps,
  FormEvent,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'
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
    id: number
    outcome: string
    suboutcomes: { id: number; value: string }[]
  }[]
  indirectOutcomes?: {
    id: number
    outcome: string
  }[]
  ultimateImpact?: { id: number; description: string }[]
}

export type FormContextValue = {
  formState: FormState
  isDirty: boolean
  updateField: (field: keyof FormState, value: unknown) => void
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

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
