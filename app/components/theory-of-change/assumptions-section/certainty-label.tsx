import { Certainty, certaintyLevels } from '@/app/constants'
import { Tag } from '../../ui'

export type CertaintyLabelProps = {
  value?: Certainty
}

export const CertaintyLabel: React.FC<CertaintyLabelProps> = ({ value }) => {
  const level = certaintyLevels.find((level) => level.value === value)

  return (
    <Tag
      className={level?.classes ?? 'border-gray-200 bg-gray-50 text-gray-700'}
    >
      {level?.label || 'Unknown'}
    </Tag>
  )
}
