import { useForm } from '@/app/contexts'
import { generateId } from '@/app/utils/id'

export const useHandlers = () => {
  const { formState, updateField } = useForm()

  const addItem = (value: string) => {
    updateField('indirectOutcomes', [
      ...(formState.indirectOutcomes ?? []),
      { id: generateId(), outcome: value },
    ])
  }

  const editItem = (itemId: number, value: string) => {
    updateField(
      'indirectOutcomes',
      formState.indirectOutcomes?.map((outcome) =>
        outcome.id !== itemId ? outcome : { ...outcome, outcome: value },
      ),
    )
  }

  const removeItem = (id: number) => {
    updateField(
      'indirectOutcomes',
      formState.indirectOutcomes?.filter((outcome) => outcome.id !== id),
    )
  }

  return {
    addItem,
    editItem,
    removeItem,
  }
}
