'use client'

import { useState, type KeyboardEvent } from 'react'
import { Input, InputProps } from './input'

export type InlineInputProps = InputProps & {
  initialValue?: string
  onEnter?: (value: string) => void
  onBlur?: () => void
}

export const InlineInput: React.FC<InlineInputProps> = ({
  initialValue = '',
  onBlur,
  onEnter,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter?.(value)
      setValue(initialValue)
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setValue(initialValue)
      onBlur?.()
    }
  }

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}
