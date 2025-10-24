'use client'

import { CircleCheck, ClipboardList } from 'lucide-react'
import { BaseCard } from './base-card'
import { useState } from 'react'
import { useFormContext } from '@/app/contexts'
import clsx from 'clsx'

export const DirectOutcomes = () => {
  const { formState } = useFormContext()
  const [expanded, setExpanded] = useState(false)

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
      <ul>
        {/* TODO: Componentize */}
        {formState.directOutcomes?.map((directOutcome, index) => (
          <li key={index} className="group mb-4">
            <div className="flex gap-1">
              <CircleCheck
                className={clsx(
                  'h-4 w-4',
                  index % 2 ? 'text-yellow-500' : 'text-green-500',
                )}
              />
              <p>{directOutcome.outcome}</p>
            </div>

            <ul className="mt-2 ml-4">
              {directOutcome.suboutcomes.map((suboutcome, subIndex) => (
                <li key={subIndex}>
                  <div className="flex gap-1">
                    <CircleCheck
                      className={clsx(
                        'h-4 w-4',
                        index % 2 ? 'text-yellow-500' : 'text-green-500',
                      )}
                    />
                    <p>{suboutcome}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </BaseCard>
  )
}
