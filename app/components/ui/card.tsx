import clsx from 'clsx'
import React from 'react'

export type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  // TODO: fix border color class name
  return (
    <div
      className={clsx(
        'border-border flex w-full flex-col overflow-hidden rounded-xl border shadow',
        className,
      )}
      {...props}
    />
  )
}

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return <div className={`border pb-4 ${className}`}>{children}</div>
}

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  as: Tag = 'h3',
}) => {
  return (
    <Tag className={clsx('px-4 pt-4 pb-1 text-sm font-semibold', className)}>
      {children}
    </Tag>
  )
}

// Card Content Component
interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex-1 px-4 pb-4 text-sm ${className}`}>{children}</div>
  )
}

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return <div className={`border-border border-t ${className}`}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
