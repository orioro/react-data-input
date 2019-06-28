import React from 'react'

export const TextSelectRadioInput = ({
  spec: {
    label,
    options
  },
  value = '',
  onChange,
  className,
}) => {
  return <div className={className}>
    {options.map(option => {
      const optionValue = typeof option === 'object' ? option.value : option
      const label = typeof option === 'object' ? option.label : option

      return <label key={optionValue}>
        {label}
        <input
          type='radio'
          value={optionValue}
          checked={optionValue === value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    })}
  </div>
}

export const textSelectRadioInputRenderer = {
  criteria: {
    type: 'text',
    options: {
      $exists: true,
      $type: 'array'
    },
    ui: {
      input: 'radio'
    }
  },
  component: TextSelectRadioInput,
}
