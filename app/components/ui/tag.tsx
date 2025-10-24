import React from 'react'

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
        <button
          type="button"
          onClick={onRemove}
          className="hover:bg-accent/70 focus:ring-accent ml-1.5 inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus:ring-1 focus:outline-none"
        >
          ×
        </button>
      )}
    </span>
  )
}

export { Tag }
