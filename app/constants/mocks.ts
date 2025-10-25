import { FormState } from '../types'
import { Certainty } from './certainty'

export const formInitialValues: FormState = {
  people: ['Students'],
  assumptions: [
    {
      description: 'Students are interested in acquiring new digital skills',
      certainty: Certainty.VeryCertain,
    },
    {
      description: 'Assumption 1',
      certainty: Certainty.ModeratelyCertain,
    },
    {
      description: 'Assumption 2',
      certainty: Certainty.Uncertain,
    },
  ],
  directOutcomes: [
    {
      id: 1,
      outcome: 'Students enhance their digital skills',
      suboutcomes: [
        {
          id: 1,
          value: 'Students learn to use productivity tools effectively',
        },
        { id: 2, value: 'Students improve technical collaboration skills' },
      ],
    },
    {
      id: 2,
      outcome: 'Students incorporate resilience and wellbeing practices',
      suboutcomes: [
        {
          id: 1,
          value: 'Students learn to use productivity tools effectively',
        },
        { id: 2, value: 'Students improve technical collaboration skills' },
      ],
    },
  ],
  indirectOutcomes: [
    { id: 1, outcome: 'Parents adopt supportive study routines at home' },
    { id: 2, outcome: 'Local business offer more internships to youth' },
  ],
  ultimateImpact: [
    {
      id: 1,
      description:
        'All Northland youth finish school with qualifications, digital skills, and resilience to thrive in life.',
    },
    {
      id: 2,
      description: 'Communities benefit from higher youth engagement',
    },
  ],
}
