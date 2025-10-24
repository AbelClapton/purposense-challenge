import { Certainty, certaintyLevels } from '@/app/constants'
import { Select } from '../../ui'

export type CertaintySelectProps = {
  value?: Certainty
  onChange: (value: number) => void
}

export const CertaintySelect: React.FC<CertaintySelectProps> = ({
  value,
  onChange,
}) => {
  const borderColor = {
    [Certainty.Uncertain]: 'border-red-500',
    [Certainty.ModeratelyCertain]: 'border-yellow-500',
    [Certainty.VeryCertain]: 'border-green-500',
  }

  return (
    <Select
      className={value ? borderColor[value] : ''}
      placeholder="Select certainty"
      options={certaintyLevels}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}
