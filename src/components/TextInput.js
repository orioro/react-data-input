import React from 'react'
import { ValidationErrorMessages } from './ValidationErrorMessages'

export const TextInput = ({
  spec,
  onChange,
  validationError,
  value = '',
  className
}) => {
  const {
    label,
    required = false,
  } = spec

  return <div className={className}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <input
      type='text'
      value={value}
      required={required}
      onChange={e => onChange(e.target.value)}
    />

    {validationError ? <ValidationErrorMessages validationError={validationError} /> : null}
  </div>
}

export const textInputRenderer = {
  criteria: {
    type: 'text',
  },
  component: TextInput,
}
