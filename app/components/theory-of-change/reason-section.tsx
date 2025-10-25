'use client'

import { useForm } from '@/app/contexts'
import { Card, CardTitle, CardContent, TextArea } from '../ui'

export const ReasonSection = () => {
  const { formState, updateField } = useForm()

  const handleChange = (value: string) => {
    updateField('reason', value)
  }

  return (
    <Card>
      <CardTitle>The reason we exist</CardTitle>

      <CardContent>
        <TextArea
          id="reason"
          value={(formState.reason || '') as string}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="e.g. Strengthening local neighbourhoods through the power of food"
          helperText="Main challenge your organization addresses (up to 250 words)."
          maxLength={250}
        />
      </CardContent>
    </Card>
  )
}
