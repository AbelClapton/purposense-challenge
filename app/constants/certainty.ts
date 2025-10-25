export enum Certainty {
  Uncertain = 1,
  ModeratelyCertain = 2,
  VeryCertain = 3,
}

export const certaintyLevels = [
  {
    value: Certainty.Uncertain,
    label: 'Uncertain',
    classes: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    value: Certainty.ModeratelyCertain,
    label: 'Moderately Certain',
    classes: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    value: Certainty.VeryCertain,
    label: 'Very Certain',
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
]
