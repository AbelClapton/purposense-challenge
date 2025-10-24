'use client'

import { useState, type KeyboardEvent } from 'react'
import { useFormContext } from '@/app/contexts'
import { Card, CardTitle, CardContent, Input, Tag } from '../ui'

export const PeopleSection: React.FC = () => {
  const [value, setValue] = useState('')
  const { formState, setFormState } = useFormContext()
  const people = formState.people ?? []

  const addPeople = (value: string) => {
    if (people.some((p) => p.toLowerCase() === value.toLowerCase())) {
      return alert('This participant type has already been added.')
    }

    setFormState({ ...formState, people: [...people, value] })
    setValue('')
  }

  const popPeople = () => {
    setFormState({ ...formState, people: people.slice(0, -1) })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const cleanValue = value.trim()
      if (cleanValue !== '') addPeople(cleanValue)
    } else if (e.key === 'Backspace' && value === '') {
      e.preventDefault()
      popPeople()
    }
  }

  const handleRemovePeople = (value: string) => {
    setFormState({ ...formState, people: people.filter((p) => p !== value) })
  }

  return (
    <Card>
      <CardTitle>The people we serve</CardTitle>

      <CardContent>
        <div className="mb-2 flex flex-wrap gap-1">
          {people?.map((p) => (
            <Tag key={p} onRemove={() => handleRemovePeople(p)}>
              {p}
            </Tag>
          ))}
        </div>

        <Input
          id="assumptions"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type and press Enter to add..."
          helperText="Add each participant type and press Enter."
          maxLength={250}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
    </Card>
  )
}
