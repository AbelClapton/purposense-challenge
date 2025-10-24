import { DirectOutcomes } from './direct-outcomes'
import { IndirectOutcomes } from './indirect-outcomes'
import { Programmes } from './programmes'
import { UltimateImpact } from './ultimate-impact'

export const Cards = () => {
  return (
    <div className="relative mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-accent absolute top-12 z-10 hidden h-2 w-full lg:block" />

      <Programmes />
      <DirectOutcomes />
      <IndirectOutcomes />
      <UltimateImpact />
    </div>
  )
}
