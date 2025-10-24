import { Certainty, certaintyLevels } from '@/app/constants'
import { Tag } from '../../ui'

export type CertaintyLabelProps = {
  value?: Certainty
}

export const CertaintyLabel: React.FC<CertaintyLabelProps> = ({ value }) => {
  const level = certaintyLevels.find((level) => level.value === value)

  return (
    <Tag style={{ color: level ? level.color : 'gray' }}>
      {level?.label || 'Unknown'}
    </Tag>
  )
}
