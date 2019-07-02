import React from 'react'
import { DataInput } from '../data-input'
import { ValidationErrorMessages } from './ValidationErrorMessages'

const ListInput = ({
  schema,
  onChange,
  value,
  className,
  validationError,
  ...remainingProps
}) => {
  const {
    label,
    item,
    hidden = false
  } = schema

  const {
    schemaParseValue
  } = remainingProps

  return hidden ? null : <fieldset className={className}>
    {label ? <legend>{label}</legend> : null}
    <ul>
      {value.map((itemValue, itemIndex) => {
        const itemPath = itemIndex.toString()

        return <li
          key={itemIndex}>
          <DataInput
            {...remainingProps}
            schema={item}
            value={itemValue}
            onChange={(newItemValue, changeData = {}) => {
              onChange([
                ...value.slice(0, itemIndex),
                newItemValue,
                ...value.slice(itemIndex + 1, value.length),
              ], {
                ...changeData,
                path: typeof changeData.path === 'string' ?
                  `${itemPath}.${changeData.path}` :
                  itemPath
              })
            }}
          />
          <button
            type='button'
            onClick={e => {
              onChange([
                ...value.slice(0, itemIndex),
                ...value.slice(itemIndex + 1, value.length)
              ], {
                path: itemPath,
              })
            }}>
            x
          </button>
        </li>
      })}
    </ul>
    <button
      type='button'
      onClick={e => {
        onChange([
          ...value,
          schemaParseValue(item, undefined)
        ], {
          path: `${value.length}`
        })
      }}>
      +
    </button>

    {validationError ? <ValidationErrorMessages validationError={validationError} /> : null}
  </fieldset>
}

const listInputRenderer = {
  criteria: {
    type: 'list'
  },
  component: ListInput,
}

export {
  ListInput,
  listInputRenderer
}
