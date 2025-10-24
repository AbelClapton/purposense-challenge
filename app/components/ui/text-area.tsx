import React from 'react'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          id={id}
          ref={ref}
          className="focus:ring-accent focus:border-accent resize-vertical border-border min-h-20 w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:outline-none"
          {...props}
        />

        <div className="flex justify-between gap-4">
          {helperText && (
            <p className="mt-1 text-sm text-gray-500">{helperText}</p>
          )}

          {props.maxLength ? (
            <span className="mt-1 text-sm text-nowrap text-gray-500">{`${props.value?.toString().length ?? 0} / ${props.maxLength}`}</span>
          ) : null}
        </div>
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

export { TextArea }
