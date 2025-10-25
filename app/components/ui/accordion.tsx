'use client'

import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './button'
import { Tooltip } from './tooltip'

type AccordionProps = {
  content: React.ReactNode
  children: React.ReactNode
  editable?: boolean
}

const Accordion = ({ content, children, editable }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="hover:bg-accent/30 transition-color border-b border-gray-200 duration-100 ease-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">{content}</div>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="text"
          aria-label={isOpen ? 'Collapse' : 'Expand'}
          icon={
            isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )
          }
        />
      </div>

      {editable ? (
        <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
          <Tooltip text="Edit">
            <Button
              variant="text"
              icon={<Edit2 className="h-4 w-4" />}
              aria-label="Edit"
            />
          </Tooltip>

          <Tooltip text="Remove">
            <Button
              variant="text"
              icon={<Trash2 className="h-4 w-4" />}
              aria-label="Remove"
            />
          </Tooltip>
        </div>
      ) : null}

      {isOpen && <div className="px-4 pb-4 text-gray-600">{children}</div>}
    </div>
  )
}

export { Accordion }
