import React from 'react'
import { Button } from './button'

type TagProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  onRemove?: () => void
  removable?: boolean
}

const Tag: React.FC<TagProps> = ({
  onRemove,
  removable = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={`bg-accent/10 text-accent inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
      {removable && (
        <Button variant="text" onClick={onRemove} aria-label="Remove">
          ×
        </Button>
      )}
    </span>
  )
}

export { Tag }
