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
      outcome: 'Students enhance their digital skills',
      suboutcomes: [
        'Students learn to use productivity tools effectively',
        'Students improve technical collaboration skills',
      ],
    },
    {
      outcome: 'Students incorporate resilience and wellbeing practices',
      suboutcomes: [
        'Students learn to use productivity tools effectively',
        'Students improve technical collaboration skills',
      ],
    },
  ],
}
