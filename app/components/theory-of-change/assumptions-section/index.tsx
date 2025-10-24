'use client'

import { Certainty } from '@/app/constants'
import { type Assumption } from '@/app/types'
import { Card, CardTitle, CardContent } from '../../ui'
import { CertaintyLabel } from './certainty-label'
import { CertaintySelect } from './certainty-select'
import { useFormContext } from '@/app/contexts'
import { Column } from '@/app/types/table'
import Table from '../../ui/table'

export const AssumptionsSection = () => {
  const { formState, setFormState } = useFormContext()
  const data = formState.assumptions ?? []

  const columns: Column<Assumption>[] = [
    {
      key: 'description',
      label: 'Description',
      editable: true,
      width: '30%',
    },
    {
      key: 'certainty',
      label: 'Certainty',
      editable: true,
      renderCell: (value) => <CertaintyLabel value={value as Certainty} />,
      renderEdit: (value, onValueChange) => (
        <CertaintySelect value={value as Certainty} onChange={onValueChange} />
      ),
    },
  ]

  const handleEdit = (rowIndex: number, newData: Assumption) => {
    const newDataArray = [...data]
    newDataArray[rowIndex] = newData
    setFormState({ ...formState, assumptions: newDataArray })
  }

  const handleRemove = (rowIndex: number) => {
    setFormState({
      ...formState,
      assumptions: data.filter((_, index) => index !== rowIndex),
    })
  }

  const handleAdd = (newData: Assumption) => {
    setFormState({ ...formState, assumptions: [...data, { ...newData }] })
  }

  return (
    <Card>
      <CardTitle>What we believe to be true</CardTitle>

      <CardContent>
        <Table<Assumption>
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onRemove={handleRemove}
          onAdd={handleAdd}
          getRowId={(row) => row.description}
        />
      </CardContent>
    </Card>
  )
}
