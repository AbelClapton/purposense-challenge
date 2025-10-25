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
  const [isDirty, setIsDirty] = useState(false)

  const checkIsDirty = (currentData: FormState) => {
    return JSON.stringify(currentData) !== JSON.stringify(initialValues)
  }

  const updateField = (field: string, value: unknown) => {
    const newFormData = {
      ...formState,
      [field]: value,
    }

    setFormState(newFormData)

    // Update dirty state
    setIsDirty(checkIsDirty(newFormData))
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
    setIsDirty(false)
  }

  const value: FormContextValue = {
    formState,
    isDirty,
    updateField,
    setFormState: setFormStateWrapper,
    getFieldValue,
    resetForm,
    handleSubmit,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useForm = (): FormContextValue => {
  const context = useContext(FormContext)

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }

  return context
}
