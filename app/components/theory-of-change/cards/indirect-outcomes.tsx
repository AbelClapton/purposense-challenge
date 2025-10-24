'use client'

import { FileCheck2 } from 'lucide-react'
import { BaseCard } from './base-card'
import { useState } from 'react'

export const IndirectOutcomes = () => {
  const [expaneded, setExpanded] = useState(false)

  return (
    <BaseCard
      icon={FileCheck2}
      title="Indirect Outcomes"
      subtitle="What we contribute over time"
      footer="Zone of indirect influence"
      className="border-accent! border-3 border-dotted"
      expandable
      expanded={expaneded}
      onToggleExpand={() => setExpanded((prev) => !prev)}
    >
      Programmes displayed here are synced with your main Programmes list. To
      add or make changes, please visit the{' '}
      <span className="text-accent">Programmes</span> section.
    </BaseCard>
  )
}
