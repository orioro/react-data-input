import React from 'react'

export const TextSelectInput = ({
  spec: {
    label,
    options,
    required = false,
  },
  value = '',
  onChange,
  className,
}) => {
  return <div className={className}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}>
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
