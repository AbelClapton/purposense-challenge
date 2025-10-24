import { Users } from 'lucide-react'
import { BaseCard } from './base-card'

export const Programmes = () => {
  return (
    <BaseCard
      icon={Users}
      title="Programmes"
      subtitle="Sets of activities we deliver"
      footer="Zone of Control"
    >
      Programmes displayed here are synced with your main Programmes list. To
      add or make changes, please visit the{' '}
      <span className="text-accent">Programmes</span> section.
    </BaseCard>
  )
}
