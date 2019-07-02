import React from 'react'
import {
  DataInput as _DataInput,
  withRenderers,
} from './data-input'

// export * from './components/withValidation'
export * from './components/ValidationErrorMessages'

import { textSelectInputRenderer } from './components/TextSelectInput'
import { textSelectRadioInputRenderer } from './components/TextSelectRadioInput'

import { textInputRenderer } from './components/TextInput'
import { booleanInputRenderer } from './components/BooleanInput'
import { dateInputRenderer } from './components/DateInput'
import { numberInputRenderer } from './components/NumberInput'

import { mapInputRenderer } from './components/MapInput'
import { listInputRenderer } from './components/ListInput'

export const DEFAULT_RENDERERS = [
  textSelectRadioInputRenderer,
  textSelectInputRenderer,
  textInputRenderer,
  booleanInputRenderer,
  dateInputRenderer,
  numberInputRenderer,
  mapInputRenderer,
  listInputRenderer
]

const UNSUPPORTED_RENDERER = {
  criteria: true,
  render: schema => {
    console.warn(`schema ${schema.type} is not supported`, schema)

    return null
  }
}

const DataInput = withRenderers(_DataInput, [UNSUPPORTED_RENDERER])

export {
  withRenderers,
  DataInput,
}
