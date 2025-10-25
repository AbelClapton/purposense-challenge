import { useState } from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
  position?: 'top' | 'bottom'
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 rounded-lg border bg-white px-3 py-2 text-sm whitespace-nowrap ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } left-1/2 -translate-x-1/2 transform`}
        >
          {text}
          {/* Simple arrow */}
          <div
            className={`transform0 absolute h-2 w-2 rotate-45 border-r border-b bg-white ${
              position === 'top'
                ? 'top-full -mt-1 -translate-x-1/2'
                : 'bottom-full -mb-1 -translate-x-1/2'
            } left-1/2`}
          />
        </div>
      )}
    </div>
  )
}
