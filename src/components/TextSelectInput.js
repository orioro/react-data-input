import React from 'react'

const NULL_VALUE = 'NULL_VALUE'

export const TextSelectInput = ({
  schema: {
    label,
    options,
    required = false,
    nullValue = NULL_VALUE
  },
  value = '',
  onChange,
  className,
}) => {
  return <div className={className}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <select
      value={value}
      onChange={e => {
        const value = e.target.value
        if (value === nullValue) {
          onChange(null)
        } else {
          onChange(value)
        }
      }}>
      <option value={nullValue}>--{label}--</option>
      {options.map(option => {
        const value = typeof option === 'object' ? option.value : option
        const label = typeof option === 'object' ? option.label : option

        return <option
          key={value}
          value={value}>
          {label}
        </option>
      })}
    </select>
  </div>
}

export const textSelectInputRenderer = {
  criteria: {
    type: 'text',
    options: {
      $exists: true,
      $type: 'array'
    }
  },
  component: TextSelectInput,
}
