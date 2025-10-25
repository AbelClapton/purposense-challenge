'use client'

// #region Imports
import { Column, TableContextType, TableProps } from '@/app/types/table'
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { Button } from './button'
import { Input } from './input'
import { Select } from './select'
import { Tooltip } from './tooltip'
// #endregion

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<TableContextType<any> | undefined>(undefined)

function useTable<T>() {
  const context = useContext(TableContext) as TableContextType<T> | undefined
  if (!context) {
    throw new Error('useTable must be used within a Table component')
  }
  return context
}

// #region Main Table Component
function Table<T>({
  columns,
  data,
  onEdit,
  onRemove,
  onAdd,
  getRowId = (_, index) => index,
}: TableProps<T>) {
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const startEditing = useCallback((rowIndex: number) => {
    setEditingRow(rowIndex)
  }, [])

  const cancelEditing = useCallback(() => {
    setEditingRow(null)
  }, [])

  const saveEditing = useCallback(
    (rowIndex: number, newData: T) => {
      onEdit(rowIndex, newData)
      setEditingRow(null)
    },
    [onEdit],
  )

  const removeRow = useCallback(
    (rowIndex: number) => {
      onRemove(rowIndex)
    },
    [onRemove],
  )

  const addRow = useCallback(
    (newData: T) => {
      onAdd(newData)
      setEditingRow(null)
    },
    [onAdd],
  )

  const contextValue: TableContextType<T> = {
    columns,
    data,
    editingRow,
    startEditing,
    cancelEditing,
    saveEditing,
    removeRow,
    addRow,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  }

  return (
    <TableContext.Provider value={contextValue}>
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table.Header />
        <Table.Body getRowId={getRowId} />
        <Table.Pagination />
      </div>
    </TableContext.Provider>
  )
}
// #endregion

// #region Header Component
function Header<T>() {
  const { columns } = useTable<T>()

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
      <div className="flex flex-1 items-center">
        <div className="flex flex-1 items-center">
          {columns.map((column) => (
            <div
              key={String(column.key)}
              className={`text-sm font-semibold text-gray-900 ${
                column.width ? '' : 'flex-1 pl-4'
              }`}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className="w-24 text-right text-sm font-semibold text-gray-900">
          Actions
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region Body Component
type BodyProps<T> = {
  getRowId: (row: T, index: number) => string | number
}

function Body<T>({ getRowId }: BodyProps<T>) {
  const { data, currentPage, rowsPerPage, editingRow } = useTable<T>()

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = data.slice(startIndex, endIndex)

  return (
    <div className="divide-y divide-gray-200">
      {currentData.map((row, rowIndex) => {
        const absoluteIndex = startIndex + rowIndex
        const isEditing = editingRow === absoluteIndex

        return (
          <Table.Row
            key={getRowId(row, absoluteIndex)}
            row={row}
            rowIndex={absoluteIndex}
            isEditing={isEditing}
          />
        )
      })}
      <Table.AddRow />
    </div>
  )
}
// #endregion

// #region Row Component
type RowProps<T> = {
  row: T
  rowIndex: number
  isEditing: boolean
}

function Row<T>({ row, rowIndex, isEditing }: RowProps<T>) {
  const { columns, startEditing, removeRow, saveEditing, cancelEditing } =
    useTable<T>()
  const [tempData, setTempData] = useState<T>(row)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    const firstColumn = columns[0]
    const firstValue = tempData[firstColumn.key]

    if (!firstValue || String(firstValue).trim() === '') {
      alert('First field cannot be empty')
      return
    }

    saveEditing(rowIndex, tempData)
  }

  const handleCancel = () => {
    setTempData(row)
    cancelEditing()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    isFirstInput: boolean = false,
  ) => {
    if (e.key === 'Enter' && isFirstInput) {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const updateTempData = (key: keyof T, value: T[keyof T]) => {
    setTempData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const renderCellContent = (column: Column<T>, isFirst: boolean = false) => {
    const value = isEditing ? tempData[column.key] : row[column.key]

    if (isEditing && column.editable !== false) {
      if (column.renderEdit) {
        return column.renderEdit(
          value,
          (newValue) => updateTempData(column.key, newValue),
          (e) => handleKeyDown(e, isFirst),
        )
      }

      return (
        <input
          ref={isFirst ? firstInputRef : undefined}
          type="text"
          value={String(value)}
          onChange={(e) =>
            updateTempData(column.key, e.target.value as T[keyof T])
          }
          onKeyDown={(e) => handleKeyDown(e, isFirst)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )
    }

    if (column.renderCell) {
      return column.renderCell(value, row, isEditing)
    }

    return <span className="text-gray-900">{String(value)}</span>
  }

  return (
    <div className="hover:bg-accent/10 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {columns.map((column, colIndex) => (
            <div
              key={String(column.key)}
              className={column.width ? '' : 'flex-1'}
              style={column.width ? { width: column.width } : undefined}
            >
              {renderCellContent(column, colIndex === 0)}
            </div>
          ))}
        </div>

        <div className="flex w-24 justify-end space-x-2">
          {isEditing ? (
            <>
              <Tooltip text="Save">
                <Button
                  onClick={handleSave}
                  variant="text"
                  className="text-green-600 hover:text-green-800"
                  icon={<Save className="h-4 w-4" />}
                  aria-label="Save"
                />
              </Tooltip>

              <Tooltip text="Cancel">
                <Button
                  onClick={handleCancel}
                  variant="text"
                  aria-label="Cancel"
                  icon={<X className="h-4 w-4" />}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip text="Edit">
                <Button
                  variant="text"
                  onClick={() => {
                    setTempData(row)
                    startEditing(rowIndex)
                  }}
                  aria-label="Edit"
                  icon={<Edit2 className="h-4 w-4" />}
                />
              </Tooltip>

              <Tooltip text="Remove">
                <Button
                  onClick={() => removeRow(rowIndex)}
                  variant="text"
                  className="text-red-600 transition-colors hover:text-red-800"
                  aria-label="Remove"
                  icon={<Trash2 className="h-4 w-4" />}
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region AddRow Component
function AddRow<T>() {
  const { columns, addRow } = useTable<T>()
  const [isAdding, setIsAdding] = useState(false)
  const [newRowData, setNewRowData] = useState<Partial<T>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isAdding && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [isAdding])

  const handleStartAdd = () => {
    setIsAdding(true)
    setNewRowData({})
  }

  const handleCancel = () => {
    setIsAdding(false)
    setNewRowData({})
  }

  const handleSave = () => {
    const firstColumn = columns[0]
    const firstValue = newRowData[firstColumn.key]

    if (!firstValue || String(firstValue).trim() === '') {
      alert('First field cannot be empty')
      return
    }

    addRow(newRowData as T)
    setIsAdding(false)
    setNewRowData({})
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    isFirstInput: boolean = false,
  ) => {
    if (e.key === 'Enter' && isFirstInput) {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const updateNewRowData = (key: keyof T, value: T[keyof T]) => {
    setNewRowData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (!isAdding) {
    return (
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <Button
          variant="text"
          onClick={handleStartAdd}
          className="h-12 w-full border-2! border-dashed!"
          icon={<Plus className="h-4 w-4" />}
        >
          Add new row
        </Button>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center">
          {columns.map((column, colIndex) => (
            <div
              key={String(column.key)}
              className="flex-1 px-2"
              style={column.width ? { width: column.width } : undefined}
            >
              {column.editable !== false ? (
                column.renderEdit ? (
                  column.renderEdit(
                    (newRowData[column.key] as T[keyof T]) ||
                      ('' as T[keyof T]),
                    (value) => updateNewRowData(column.key, value),
                    (e) => handleKeyDown(e, colIndex === 0),
                  )
                ) : (
                  <Input
                    ref={colIndex === 0 ? firstInputRef : undefined}
                    value={String(newRowData[column.key] || '')}
                    onChange={(e) =>
                      updateNewRowData(column.key, e.target.value as T[keyof T])
                    }
                    onKeyDown={(e) => handleKeyDown(e, colIndex === 0)}
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                  />
                )
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex w-24 justify-end space-x-2">
          <Button
            onClick={handleSave}
            variant="text"
            aria-label="Save"
            icon={<Save className="h-4 w-4" />}
          />

          <Button
            variant="text"
            onClick={handleCancel}
            aria-label="Cancel"
            icon={<X className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region Pagination Component
function Pagination<T>() {
  const { data, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage } =
    useTable<T>()

  const totalPages = Math.ceil(data.length / rowsPerPage)

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex space-x-4 sm:flex-row">
          <span className="text-sm text-gray-700">
            Showing{' '}
            {data.length === 0
              ? 0
              : Math.min(data.length, (currentPage - 1) * rowsPerPage + 1)}
            -{Math.min(data.length, currentPage * rowsPerPage)} of {data.length}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 space-x-2 sm:flex-row">
          <div className="flex items-center justify-center gap-2">
            <label
              htmlFor="rowsPerPage"
              className="text-sm text-nowrap text-gray-700"
            >
              Rows per page
            </label>

            <Select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              options={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-100"
              icon={<ChevronLeft className="h-4 w-4 text-gray-700" />}
              aria-label="Previous page"
            />

            <span className="text-sm text-nowrap text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>

            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="bg-gray-200 hover:bg-gray-100"
              icon={<ChevronRight className="h-4 w-4 text-gray-700" />}
              aria-label="next-page"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// #endregion

// #region Exports
// Attach subcomponents to Table
Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.AddRow = AddRow
Table.Pagination = Pagination

export default Table
// #endregion
