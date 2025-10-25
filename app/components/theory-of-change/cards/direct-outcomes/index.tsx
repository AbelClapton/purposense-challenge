'use client'

import { Accordion, InlineInput } from '@/app/components/ui'
import { useForm } from '@/app/contexts'
import { CircleCheck, ClipboardList } from 'lucide-react'
import { useState } from 'react'
import { BaseCard } from '../base-card'
import { useHandlers } from './useHandlers'
import { ListItem } from '../list-item'

export const DirectOutcomes = () => {
  const { formState } = useForm()
  const [expanded, setExpanded] = useState(false)
  const {
    addItem,
    addSubItem,
    editItem,
    editSubItem,
    removeItem,
    removeSubItem,
  } = useHandlers()

  return (
    <BaseCard
      icon={ClipboardList}
      title="Direct Outcomes"
      subtitle="Changes we influence directly"
      footer="Zone of direct influence"
      expandable
      expanded={expanded}
      onToggleExpand={() => setExpanded((prev) => !prev)}
    >
      {formState.directOutcomes?.map(({ id, outcome, suboutcomes }) => (
        <Accordion
          key={id}
          content={
            <ListItem
              icon={<CircleCheck className="h-4 w-4 text-green-500" />}
              editable={expanded}
              onRemove={() => removeItem(id)}
              onEdit={(value) => editItem(id, value)}
            >
              {outcome}
            </ListItem>
          }
        >
          {suboutcomes.map((suboutcome) => (
            <ListItem
              icon={<CircleCheck className="h-4 w-4 text-green-500" />}
              key={suboutcome.id}
              editable={expanded}
              onRemove={() => removeSubItem(id, suboutcome.id)}
              onEdit={(value) => editSubItem(id, suboutcome.id, value)}
            >
              {suboutcome.value}
            </ListItem>
          ))}

          {expanded && (
            <InlineInput
              placeholder="Type and press Enter to add"
              onEnter={(value) => addSubItem(id, value)}
            />
          )}
        </Accordion>
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
