export type Column<T> = {
  key: keyof T
  label: string
  editable?: boolean
  width?: string
  renderCell?: (
    value: T[keyof T],
    row: T,
    isEditing: boolean,
  ) => React.ReactNode
  renderEdit?: (
    value: T[keyof T],
    onValueChange: (value: T[keyof T]) => void,
    onKeyDown: (e: React.KeyboardEvent) => void,
  ) => React.ReactNode
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  onEdit: (rowIndex: number, newData: T) => void
  onRemove: (rowIndex: number) => void
  onAdd: (newData: T) => void
  getRowId?: (row: T, index: number) => string | number
}

export type TableContextType<T> = {
  columns: Column<T>[]
  data: T[]
  editingRow: number | null
  startEditing: (rowIndex: number) => void
  cancelEditing: () => void
  saveEditing: (rowIndex: number, data: T) => void
  removeRow: (rowIndex: number) => void
  addRow: (data: T) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rows: number) => void
}
