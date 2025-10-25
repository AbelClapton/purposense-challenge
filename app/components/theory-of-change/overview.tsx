'use client'

import { AssumptionsSection } from './assumptions-section'
import { Cards } from './cards'
import { PeopleSection } from './people-section'
import { ReasonSection } from './reason-section'
import { SubmitButton } from '../ui/submit'
import { FormState } from '@/app/types'
import { Form } from '../ui/form'

export const TheoryOfChange = () => {
  const handleSubmit = async (data: FormState) => {
    console.log('Form data:', JSON.stringify(data))
    alert('Saved!')
  }

  return (
    <Form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold">Theory of change</h1>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <ReasonSection />
        <PeopleSection />
      </div>

      <AssumptionsSection />
      <Cards />

      <div className="flex w-full justify-end">
        <SubmitButton>Save</SubmitButton>
      </div>
    </Form>
  )
}
