import { ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '../../ui'

export type ExpandControlProps = {
  expanded?: boolean
  onToggleExpand?: () => void
}

export const ExpandControl: React.FC<ExpandControlProps> = ({
  expanded,
  onToggleExpand,
}) => {
  return (
    <div className="w-full bg-white py-4">
      <Button
        variant="text"
        onClick={() => {
          onToggleExpand?.()
        }}
        className="hover:underline"
        iconPosition="end"
        icon={
          expanded ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )
        }
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </div>
  )
}
