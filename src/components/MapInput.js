import React from 'react'
import { DataInput } from '../data-input'
import { testCriteria } from '@orioro/cascade'

const MapInput = ({
  schema,
  className,
  value,
  onChange,
  ...remainingProps,
}) => {

  const {
    label,
    attributes,
    disabled = false,
    hidden = false,
  } = schema

  return <fieldset
    className={className}
    disabled={disabled}
    hidden={hidden}>
    {label ? <legend>{label}</legend> : null}
    <div>
      {Object.keys(attributes).map(propertyId => {

        const propertySchema = {
          disabled,
          hidden,
          ...attributes[propertyId],
        }

        return <DataInput
          {...remainingProps}
          key={propertyId}
          schema={propertySchema}
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
        />
      })}
    </div>
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
