import React from 'react'
import PropTypes from 'prop-types'
import { executeMatching } from '@orioro/cascade'

const className = ({ type, className = '' }) => {
  switch (type) {
    case 'list':
    case 'map':
      return `fieldset fieldset--${type} ${className}`
    default:
      return `field field--${type} ${className}`
  }
}

const DataInput = ({ schema, ...props }) => {
  const renderers = props.renderers.map(_r => ({
    criteria: _r.criteria,
    value: (_r.component instanceof React.Component ||
            typeof _r.component === 'function') ?
      () => {
        const Component = _r.component
        return <Component
          {...props}
          className={className(schema)}
          schema={schema}
        />
      } :
      () => {
        return _r.render(schema, {...props, className: className(schema)})
      }
  }))

  return executeMatching(renderers, schema, props)
}

DataInput.propTypes = {
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  renderers: PropTypes.array.isRequired,
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
