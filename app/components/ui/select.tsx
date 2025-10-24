import clsx from 'clsx'
import React from 'react'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  helperText?: string
  placeholder?: string
  options: { value: string | number; label: string }[]
}

const Select: React.FC<SelectProps> = ({
  helperText,
  options,
  className,
  id,
  ...props
}) => {
  return (
    <div className="w-full">
      <select
        id={id}
        className={clsx(
          'focus:border-accent focus:ring-accent border-border w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors duration-200 focus:ring-2 focus:outline-none',
          className,
        )}
        {...props}
      >
        {props.placeholder && (
          <option className="text-gray-400" value="">
            {props.placeholder || 'Select an option'}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  )
}

export { Select }
