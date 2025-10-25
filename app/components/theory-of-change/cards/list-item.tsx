import { Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { InlineInput, Button } from '../../ui'
import { Tooltip } from '../../ui/tooltip'
import { DivProps } from '@/app/types'
import clsx from 'clsx'

type DirectOutcomeItemProps = DivProps & {
  icon?: React.ReactNode
  children: string
  editable?: boolean
  onEdit?: (value: string) => void
  onRemove?: () => void
}

const ListItem: React.FC<DirectOutcomeItemProps> = ({
  icon,
  children,
  editable,
  onEdit,
  onRemove,
  className,
  ...props
}) => {
  const [editing, setEditing] = useState(false)

  const handleEdit = (value: string) => {
    onEdit?.(value)
    setEditing(false)
  }

  return (
    <div className={clsx('group mb-4', className)} {...props}>
      {editing ? (
        <InlineInput
          initialValue={children}
          onBlur={() => setEditing(false)}
          onEnter={handleEdit}
        />
      ) : (
        <div className="flex gap-1">
          {icon ? <div className="mt-0.5">{icon}</div> : null}
          <p>{children}</p>
        </div>
      )}

      {editable && !editing ? (
        <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
          <Tooltip text="Edit">
            <Button
              variant="text"
              icon={<Edit2 className="h-4 w-4" />}
              onClick={() => setEditing(true)}
              aria-label="Edit"
            />
          </Tooltip>

          <Tooltip text="Remove">
            <Button
              variant="text"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => onRemove?.()}
              aria-label="Remove"
            />
          </Tooltip>
        </div>
      ) : null}
    </div>
  )
}

export { ListItem }
