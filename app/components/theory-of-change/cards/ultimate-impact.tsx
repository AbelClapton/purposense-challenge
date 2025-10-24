'use client'

import { CircleStop } from 'lucide-react'
import { BaseCard } from './base-card'
import { useState } from 'react'

export const UltimateImpact = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <BaseCard
      icon={CircleStop}
      title="Ultimate Impact"
      subtitle="The lasting change we seek"
      footer="Zone of contribution"
      className="border-accent! border-3 border-dotted"
      expandable
      expanded={expanded}
      onToggleExpand={() => setExpanded((prev) => !prev)}
    >
      Programmes displayed here are synced with your main Programmes list. To
      add or make changes, please visit the{' '}
      <span className="text-accent">Programmes</span> section. Programmes
      displayed here are synced with your main Programmes list. To add or make
      changes, please visit the <span className="text-accent">Programmes</span>{' '}
      section. Programmes displayed here are synced with your main Programmes
      list. To add or make changes, please visit the{' '}
      <span className="text-accent">Programmes</span> section.
    </BaseCard>
  )
}
