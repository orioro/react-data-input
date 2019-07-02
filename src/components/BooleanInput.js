import React from 'react'
import { ValidationErrorMessages } from './ValidationErrorMessages'

export const BooleanInput = ({
  schema: {
    label
  },
  value = false,
  className,
  onChange,
  validationError,
}) => {
  return <div className={className}>
    <label>
      {label}
      <input
        type='checkbox'
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
    </label>
    {validationError ? <ValidationErrorMessages validationError={validationError} /> : null}
  </div>
}

export const booleanInputRenderer = {
  criteria: {
    type: 'boolean'
  },
  component: BooleanInput,
}
