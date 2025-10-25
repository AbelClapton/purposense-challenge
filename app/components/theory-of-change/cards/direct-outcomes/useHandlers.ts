import { useForm } from '@/app/contexts'
import { generateId } from '@/app/utils/id'

export const useHandlers = () => {
  const { formState, updateField } = useForm()

  // TODO: Optimize form update
  const addItem = (value: string) => {
    updateField('directOutcomes', [
      ...(formState.directOutcomes ?? []),
      { id: generateId(), outcome: value, suboutcomes: [] },
    ])
  }

  const addSubItem = (itemId: number, value: string) => {
    updateField(
      'directOutcomes',
      formState.directOutcomes?.map((outcome) =>
        outcome.id !== itemId
          ? outcome
          : {
              ...outcome,
              suboutcomes: [
                ...outcome.suboutcomes,
                { id: generateId(), value },
              ],
            },
      ),
    )
  }

  const editItem = (itemId: number, value: string) => {
    updateField(
      'directOutcomes',
      formState.directOutcomes?.map((outcome) =>
        outcome.id !== itemId ? outcome : { ...outcome, outcome: value },
      ),
    )
  }

  const editSubItem = (itemId: number, subItemId: number, value: string) => {
    updateField(
      'directOutcomes',
      formState.directOutcomes?.map((outcome) =>
        outcome.id !== itemId
          ? outcome
          : {
              ...outcome,
              suboutcomes: outcome.suboutcomes.map((sub) =>
                sub.id !== subItemId ? sub : { ...sub, value },
              ),
            },
      ),
    )
  }

  const removeItem = (id: number) => {
    updateField(
      'directOutcomes',
      formState.directOutcomes?.filter((outcome) => outcome.id !== id),
    )
  }

  const removeSubItem = (itemId: number, subItemId: number) => {
    const newDirectOutcomes = formState.directOutcomes?.map((outcome) => {
      if (outcome.id !== itemId) return outcome

      return {
        ...outcome,
        suboutcomes: outcome.suboutcomes.filter((sub) => sub.id !== subItemId),
      }
    })

    updateField('directOutcomes', newDirectOutcomes)
  }

  return {
    addItem,
    addSubItem,
    editItem,
    editSubItem,
    removeItem,
    removeSubItem,
  }
}
