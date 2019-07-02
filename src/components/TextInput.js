import React from 'react'
import { ValidationErrorMessages } from './ValidationErrorMessages'

export const TextInput = ({
  schema,
  onChange,
  validationError,
  value = '',
  className
}) => {
  const {
    label,
    required = false,
    hidden = false,
    disabled = false,
  } = schema

  return <div
    className={className}
    hidden={hidden}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <input
      type='text'
      value={value}
      required={required}
      hidden={hidden}
      disabled={disabled}
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
