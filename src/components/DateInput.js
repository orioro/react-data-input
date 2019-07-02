import React from 'react'

export const DateInput = ({
  schema,
  onChange,
  value,
  onParseValue,
  className
}) => {
  const {
    label,
    required = false,
  } = schema

  return <div className={className}>
    {label ? <label>{label} {required ? '*' : null}</label> : null}
    <input
      type='date'
      value={value}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  </div>
}

export const dateInputRenderer = {
  criteria: {
    type: 'date',
  },
  component: DateInput,
}
