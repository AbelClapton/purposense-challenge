'use client'

import { useFormContext } from '@/app/contexts'
import { Button } from './button'

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handleSubmit } = useFormContext()

  return <Button onClick={handleSubmit}>{children}</Button>
}
