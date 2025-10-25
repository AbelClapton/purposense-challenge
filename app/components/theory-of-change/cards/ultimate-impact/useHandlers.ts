import { useForm } from '@/app/contexts'
import { generateId } from '@/app/utils/id'

export const useHandlers = () => {
  const { formState, updateField } = useForm()

  const addItem = (value: string) => {
    updateField('ultimateImpact', [
      ...(formState.ultimateImpact ?? []),
      { id: generateId(), description: value },
    ])
  }

  const editItem = (itemId: number, value: string) => {
    updateField(
      'ultimateImpact',
      formState.ultimateImpact?.map((impact) =>
        impact.id !== itemId ? impact : { ...impact, description: value },
      ),
    )
  }

  const removeItem = (id: number) => {
    updateField(
      'ultimateImpact',
      formState.ultimateImpact?.filter((impact) => impact.id !== id),
    )
  }

  return {
    addItem,
    editItem,
    removeItem,
  }
}
