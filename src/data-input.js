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

const render = (renderers, spec, props) => {
  return executeMatching(renderers.map(renderer => ({
    criteria: renderer.criteria,
    value: (renderer.component instanceof React.Component || typeof renderer.component === 'function') ?
      () => <renderer.component spec={spec} {...props} /> :
      renderer.render.bind(null, spec, props)
  })), spec, props)
}

const DataInput = ({
  spec,
  renderers = [],
  className = defaultClassName,
  ...props,
}) => {
  return render(renderers, spec, {
    renderers,
    className: typeof className === 'function' ? className(spec) : className,
    ...props,
  })
}

DataInput.propTypes = {
  spec: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  renderers: PropTypes.array,
  onValidateValue: PropTypes.func.isRequired,
  onParseValue: PropTypes.func.isRequired,
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
