export enum Certainty {
  Uncertain = 1,
  ModeratelyCertain = 2,
  VeryCertain = 3,
}

export const certaintyLevels = [
  { value: Certainty.Uncertain, label: 'Uncertain', color: 'red' },
  {
    value: Certainty.ModeratelyCertain,
    label: 'Moderately Certain',
    color: 'yellow',
  },
  { value: Certainty.VeryCertain, label: 'Very Certain', color: 'green' },
]
