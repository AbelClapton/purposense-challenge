'use client'

import { CircleCheck, CircleStop } from 'lucide-react'
import { useState } from 'react'
import { InlineInput } from '@/app/components/ui'
import { ListItem } from '../list-item'
import { useForm } from '@/app/contexts'
import { useHandlers } from './useHandlers'
import { BaseCard } from '../base-card'

export const UltimateImpact = () => {
  const { formState } = useForm()
  const [expanded, setExpanded] = useState(false)
  const { addItem, editItem, removeItem } = useHandlers()

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
      {formState.ultimateImpact?.map(({ id, description }) => (
        <ListItem
          className="hover:bg-accent/30"
          key={id}
          icon={<CircleCheck className="h-4 w-4 text-green-500" />}
          editable={expanded}
          onRemove={() => removeItem(id)}
          onEdit={(value) => editItem(id, value)}
        >
          {description}
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
