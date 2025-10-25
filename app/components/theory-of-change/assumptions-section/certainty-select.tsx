import { Certainty, certaintyLevels } from '@/app/constants'
import { Select } from '../../ui'
import clsx from 'clsx'

export type CertaintySelectProps = {
  value?: Certainty
  onChange: (value: number) => void
}

export const CertaintySelect: React.FC<CertaintySelectProps> = ({
  value,
  onChange,
}) => {
  const borderColor = {
    [Certainty.Uncertain]: 'border-red-700',
    [Certainty.ModeratelyCertain]: 'border-amber-700',
    [Certainty.VeryCertain]: 'border-emerald-700',
  }

  return (
    <Select
      className={clsx('border-2!', value ? borderColor[value] : '')}
      placeholder="Select certainty"
      options={certaintyLevels}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}
