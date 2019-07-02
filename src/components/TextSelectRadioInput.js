import React from 'react'

export const TextSelectRadioInput = ({
  schema: {
    label,
    options,
    hidden = false
  },
  value = '',
  onChange,
  className,
}) => {
  return <div
    className={className}
    hidden={hidden}>

    {label ? <label>{label}</label> : null}

    <div>
      {options.map((option, index) => {
        const optionValue = typeof option === 'object' ? option.value : option
        const label = typeof option === 'object' ? option.label : option

        return <label key={optionValue || index}>
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
