import React from 'react'
import { DataInput } from '../data-input'
import { ValidationErrorMessages } from './ValidationErrorMessages'
import { testCriteria } from '@orioro/cascade'

const MapInput = ({
  spec,
  className,
  value,
  onChange,
  validationError,
  ...remainingProps,
}) => {

  const {
    label,
    attributes
  } = spec

  return <fieldset className={className}>
    {label ? <legend>{label}</legend> : null}
    <div>
      {Object.keys(attributes).map(propertyId => {
        const propertySpec = attributes[propertyId]

        return (!propertySpec.condition ||
                (propertySpec.condition && testCriteria(propertySpec.condition, value))) ?
          <DataInput
            {...remainingProps}
            key={propertyId}
            spec={attributes[propertyId]}
            value={value[propertyId]}
            onChange={(newPropertyValue, changeData = {}) => {
              onChange({
                ...value,
                [propertyId]: newPropertyValue
              }, {
                ...changeData,
                path: changeData.path ?
                  `${propertyId}.${changeData.path}` : propertyId
              })
            }}
          /> : null
      })}
    </div>
    {validationError ? <ValidationErrorMessages validationError={validationError} /> : null}
  </fieldset>
}

const mapInputRenderer = {
  criteria: {
    type: 'map'
  },
  component: MapInput,
}

export {
  MapInput,
  mapInputRenderer
}
