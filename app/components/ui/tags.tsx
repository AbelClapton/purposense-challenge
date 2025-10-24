'use client'

import React, { useState, KeyboardEvent } from 'react'
import { Tag } from '.'

interface TagsProps {
  label?: string
  helperText?: string
  placeholder?: string
  tags: string[]
  onTagsChange: (tags: string[]) => void
  maxTags?: number
  id?: string
}

const Tags: React.FC<TagsProps> = ({
  label,
  helperText,
  placeholder = 'Add a tag...',
  tags,
  onTagsChange,
  maxTags,
  id,
}) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      (!maxTags || tags.length < maxTags)
    ) {
      onTagsChange([...tags, trimmedTag])
      setInputValue('')
    }
  }

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none">
        {tags.map((tag, index) => (
          <Tag key={index} onRemove={() => removeTag(index)}>
            {tag}
          </Tag>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 border-0 p-0 focus:ring-0 focus:outline-none"
          disabled={maxTags ? tags.length >= maxTags : false}
        />
      </div>

      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}

      {maxTags && (
        <p className="mt-1 text-sm text-gray-400">
          {tags.length} / {maxTags} tags
        </p>
      )}
    </div>
  )
}

export default Tags
