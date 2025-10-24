import React, { forwardRef, memo } from 'react'
import clsx from 'clsx'
import { Card, CardContent, CardFooter, CardProps, CardTitle } from '../../ui'
import { ExpandControl } from './expand-control'

export type BaseCardProps = CardProps & {
  /** Icon component used to render the card icon. Receives a `className` prop. */
  icon: React.ElementType<{ className?: string }>
  title: string
  subtitle?: string
  children?: React.ReactNode
  footer: React.ReactNode
  expandable?: boolean
  expanded?: boolean
  onToggleExpand?: () => void
}

const IconRender = ({
  Icon,
  title,
  large = false,
}: {
  Icon: React.ElementType<{ className?: string }>
  title: string
  large?: boolean
}) => (
  <div
    className={clsx(
      'border-accent grid place-content-center rounded-full border p-1',
      large
        ? 'hidden aspect-square p-3 lg:block'
        : 'mt-5 ml-4 aspect-square h-12 w-12 lg:hidden',
    )}
    aria-hidden
  >
    <Icon className="text-accent h-6 w-6" />
    <span className="sr-only">{title} icon</span>
  </div>
)

const BaseCardInner = (
  {
    icon: Icon,
    title,
    subtitle,
    children,
    footer,
    className,
    expandable,
    expanded,
    onToggleExpand,
    ...props
  }: BaseCardProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <IconRender Icon={Icon} title={title} large />

      <Card ref={ref} className={clsx('h-96', className)} {...props}>
        <div className="flex gap-0.5">
          <IconRender Icon={Icon} title={title} />

          <div>
            <CardTitle className="text-accent text-lg font-bold">
              {title}
            </CardTitle>
            {subtitle ? (
              <p className="mb-2 px-4 text-sm font-semibold">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <CardContent
          className={expanded ? 'overflow-y-auto' : 'overflow-y-hidden'}
        >
          <div className="pt-2 text-sm/relaxed">{children}</div>
        </CardContent>

        <CardFooter className="bg-accent flex flex-col items-center justify-center border-t-0 text-center">
          {expandable && (
            <ExpandControl
              expanded={expanded}
              onToggleExpand={onToggleExpand}
            />
          )}

          <div className="grid place-content-center px-4 py-3 text-white">
            {footer}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export const BaseCard = memo(forwardRef(BaseCardInner))
BaseCard.displayName = 'BaseCard'
