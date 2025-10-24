import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          className="focus:ring-accent focus:border-accent border-border w-full rounded-md border bg-white px-3 py-2 text-sm placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:outline-none"
          {...props}
        />

        {helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
