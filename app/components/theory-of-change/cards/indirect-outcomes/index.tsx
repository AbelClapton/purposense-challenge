'use client'

import { CircleCheck, FileCheck2 } from 'lucide-react'
import { useState } from 'react'
import { BaseCard } from '../base-card'
import { useForm } from '@/app/contexts'
import { InlineInput } from '@/app/components/ui'
import { ListItem } from '../list-item'
import { useHandlers } from './useHandlers'

export const IndirectOutcomes = () => {
  const { formState } = useForm()
  const [expanded, setExpanded] = useState(false)
  const { addItem, editItem, removeItem } = useHandlers()

  return (
    <BaseCard
      icon={FileCheck2}
      title="Indirect Outcomes"
      subtitle="What we contribute over time"
      footer="Zone of indirect influence"
      className="border-accent! border-3 border-dotted"
      expandable
      expanded={expanded}
      onToggleExpand={() => setExpanded((prev) => !prev)}
    >
      {formState.indirectOutcomes?.map(({ id, outcome }) => (
        <ListItem
          className="hover:bg-accent/30"
          key={id}
          icon={<CircleCheck className="h-4 w-4 text-green-500" />}
          editable={expanded}
          onRemove={() => removeItem(id)}
          onEdit={(value) => editItem(id, value)}
        >
          {outcome}
        </ListItem>
      ))}

      {expanded && (
        <div className="mt-4">
          <InlineInput
            placeholder="Type and press Enter to add"
            onEnter={(value) => addItem(value)}
          />
        </div>
      )}
    </BaseCard>
  )
}
