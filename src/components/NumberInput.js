import React from 'react'

export const NumberInput = ({
  schema,
  onChange,
  value = 0,
  className
}) => {
  const {
    label,
    required = false,
  } = schema

  return <div className={className}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <input
      type='number'
      value={value}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  </div>
}

export const numberInputRenderer = {
  criteria: {
    type: 'number',
  },
  component: NumberInput,
}
