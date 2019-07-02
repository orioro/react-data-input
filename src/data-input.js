import React from 'react'
import PropTypes from 'prop-types'
import { executeMatching } from '@orioro/cascade'

const defaultClassName = ({ type }) => {
  switch (type) {
    case 'list':
    case 'map':
      return `fieldset fieldset--${type}`
    default:
      return `field field--${type}`
  }
}

const DataInput = ({ schema, ...props}) => {
  const parsedSchema = props.schemaParse(schema, props.value)

  const renderers = props.renderers.map(_r => ({
    criteria: _r.criteria,
    value: (_r.component instanceof React.Component ||
            typeof _r.component === 'function') ?
      () => {
        const Component = _r.component
        return <Component
          {...props}
          schema={parsedSchema}
        />
      } :
      () => {
        return _r.render(parsedSchema, props)
      }
  }))

  return executeMatching(renderers, parsedSchema, props)
}

DataInput.propTypes = {
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  renderers: PropTypes.array.isRequired,
  schemaParse: PropTypes.func.isRequired,
  schemaParseValue: PropTypes.func.isRequired,
}

const withRenderers = (WrappedComponent, addRenderers) => ({
  renderers = [],
  ...props
}) => {
  return <WrappedComponent
    renderers={[...renderers, ...addRenderers]}
    {...props}
  />
}

export {
  DataInput,
  withRenderers,
}
