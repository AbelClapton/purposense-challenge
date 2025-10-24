import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual variant: 'default' has a primary background, 'text' is transparent with primary-colored text */
  variant?: 'default' | 'text'
  /** Optional icon node (SVG, icon component, etc.) */
  icon?: React.ReactNode
  /** Position of the icon when there is both icon and text */
  iconPosition?: 'start' | 'end'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  icon,
  iconPosition = 'start',
  className = '',
  children,
  ...props
}) => {
  const isIconOnly =
    !!icon &&
    (children == null ||
      (typeof children === 'string' && children.trim() === ''))

  // Base sizing and focus
  const base =
    'inline-flex items-center justify-center gap-2 transition-colors duration-150 font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

  // Variant styles (hover styles applied only when not disabled)
  const variantClasses =
    variant === 'text'
      ? 'bg-transparent text-accent px-2 py-1'
      : 'bg-accent text-white px-3 py-2'

  // When the button is icon-only we want a fully rounded square and tighter padding
  const iconOnlyClasses = isIconOnly ? 'rounded-full p-2' : 'rounded-md'

  // If icon + text, align spacing — when icon is start, give right margin, else left margin
  const iconWrapperClass = isIconOnly ? '' : 'inline-flex items-center'

  // Disabled state styles: lower opacity, no pointer events and no hover
  const disabledClasses = props.disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : variant === 'text'
      ? 'hover:underline'
      : 'hover:bg-accent/90'

  // For text variant we prefer a lighter hover background when not disabled
  const textHover =
    !props.disabled && variant === 'text' ? 'hover:bg-accent/10' : ''

  const classes =
    `${base} ${variantClasses} ${iconOnlyClasses} ${disabledClasses} ${textHover} ${className}`.trim()

  // If icon-only and there's no accessible label, encourage adding aria-label via props
  if (isIconOnly && !props['aria-label']) {
    // Do not throw — but helpful to mention in code comments. Consumers should pass aria-label for icon-only buttons.
  }

  return (
    <button
      className={classes}
      {...props}
      aria-disabled={props.disabled ? true : undefined}
    >
      {icon && iconPosition === 'start' && (
        <span
          className={iconWrapperClass}
          aria-hidden={isIconOnly ? 'false' : 'true'}
        >
          {icon}
        </span>
      )}

      {children}

      {icon && iconPosition === 'end' && (
        <span
          className={iconWrapperClass}
          aria-hidden={isIconOnly ? 'false' : 'true'}
        >
          {icon}
        </span>
      )}
    </button>
  )
}

Button.displayName = 'Button'
