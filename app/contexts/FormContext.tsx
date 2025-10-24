'use client'

import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  FormEvent,
} from 'react'
import { FormContextValue, FormState } from '../types'
import { formInitialValues } from '../constants/mocks'

const FormContext = createContext<FormContextValue | undefined>(undefined)

interface FormProviderProps {
  children: ReactNode
  initialValues?: FormState
  onSubmit?: (data: FormState) => void
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues = formInitialValues,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<FormState>(initialValues)

  const updateField = (field: string, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const setFormStateWrapper = (state: FormState) => {
    setFormState(state)
  }

  const getFieldValue = (field: keyof FormState) => {
    return formState[field]
  }

  const resetForm = () => {
    setFormState(initialValues)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit?.(formState)
  }

  const value: FormContextValue = {
    formState,
    updateField,
    setFormState: setFormStateWrapper,
    getFieldValue,
    resetForm,
    handleSubmit,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext)

  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }

  return context
}
