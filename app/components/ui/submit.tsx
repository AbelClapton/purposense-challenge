'use client'

import { useForm } from '@/app/contexts'
import { Button } from './button'

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDirty, handleSubmit } = useForm()

  return (
    <Button onClick={handleSubmit} disabled={!isDirty}>
      {children}
    </Button>
  )
}
