import React from 'react'
import { render } from 'react-dom'
import { dataSchema } from '@orioro/data-schema'

import cloneDeep from 'lodash.clonedeep'

import {
  DataInput,
  withRenderers,
  DEFAULT_RENDERERS,
} from '../../src'


const DATA_SCHEMA = dataSchema({
  STRING_TYPES: ['text'],
})

const CustomInput = withRenderers(DataInput, DEFAULT_RENDERERS)

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      schema: DATA_SCHEMA.parse(props.schema, props.value, { recursive: true }),
      // value: DATA_SCHEMA.parseValue(props.schema, props.value, { recursive: true }),
      value: DATA_SCHEMA.parseValue(props.schema, props.value, { recursive: true }),
      errors: []
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const {
      schema,
      value,
      errors,
    } = this.state

    if (errors && errors.length > 0) {
      console.warn('attempted to submit, but cancelling due to errors', errors)
    } else {
      console.log(value.homeAddress === value.workAddress)
      console.log('will submit', value)
    }
  }

  render() {
    const { schema, value } = this.state

    return <form onSubmit={this.handleSubmit}>
      <CustomInput
        schema={schema}
        value={value}
        onChange={(newValue, { path }) => {
          this.setState({
            ...this.state,
            schema: DATA_SCHEMA.parse(schema, newValue, { recursive: true }),
            value: DATA_SCHEMA.parseValue(schema, newValue, { recursive: true }),
          })
        }}
        schemaParse={(schema, value) => {
          // const parsed = DATA_SCHEMA.parse(schema, value)
          // if (schema.type === 'map') {
          //   console.log('parsed', schema, value, parsed)
          // }

          return DATA_SCHEMA.parse(schema, value)
        }}
        schemaParseValue={() => {
          return DATA_SCHEMA.parseValue(schema, value)
        }}
      />
      <button type='submit'>
        Enviar
      </button>
    </form>
  }
}

const SCHEMA = window.SCHEMA = {
  type: 'map',
  attributes: {
    text_1: {
      label: 'text_1',
      type: 'text',
      options: ['show', 'hide', 'text-1'],
      ui: {
        input: 'radio'
      }
    },
    text_2: {
      label: 'text_2',
      type: 'text',
    },
    text_3: {
      label: 'text_3',
      type: 'text',
    },
    list_of_options: {
      label: 'List of options',
      type: 'list',
      item: {
        type: 'map',
        attributes: {
          value: {
            label: 'Value',
            type: 'text'
          },
          label: {
            label: 'Label',
            type: 'text'
          }
        },
      }
    },
    should_nested_copy: {
      label: 'Copy',
      type: 'boolean',
    },
    nested: {
      type: 'map',
      attributes: {
        text_1: {
          type: 'text',
        }
      }
    },
    list_of_attachments: {
      label: 'List of attachments',
      type: 'list',
      item: {
        type: 'map',
        label: 'Attachment',
        attributes: {
          kind: {
            type: 'text',
            options: ['file', 'website', 'note'],
            ui: { input: 'radio' }
          },
          fileId: {
            label: 'File ID',
            type: 'text',
            hidden: true
          },
          websiteUrl: {
            label: 'Website URL',
            type: 'text',
            hidden: true
          },
          noteContents: {
            label: 'Note contents',
            type: 'text',
            hidden: true
          }
        },
        transforms: [
          {
            condition: { kind: 'file' },
            schema: {
              'attributes.fileId.hidden': false,
              'attributes.fileId.required': true,
            },
            value: {
              websiteUrl: '',
              noteContents: ''
            }
          },
          {
            condition: { kind: 'website' },
            schema: {
              'attributes.websiteUrl.hidden': false,
              'attributes.websiteUrl.required': true,
            }
          },
          {
            condition: { kind: 'note' },
            schema: {
              'attributes.noteContents.hidden': false,
              'attributes.noteContents.required': true,
            }
          }
        ]
      }
    },
    homeAddress: {
      label: 'Home address',
      type: 'map',
      attributes: {
        line_1: { type: 'text' },
        line_2: { type: 'text' },
      }
    },
    workAddressIsSameAsHome: {
      type: 'boolean',
      default: true
    },
    workAddress: {
      label: 'Work address',
      type: 'map',
      attributes: {
        line_1: { type: 'text' },
        line_2: { type: 'text' },
      }
    }
  },
  transforms: [
    {
      condition: { workAddressIsSameAsHome: true },
      value: { workAddress: '$homeAddress' },
      schema: { 'attributes.workAddress.disabled': true }
    },
    {
      condition: {
        'list_of_attachments.0.websiteUrl': {
          $exists: true
        }
      },
      value: {
        text_3: '$list_of_attachments.0.websiteUrl',
      }
    },
    {
      condition: {
        should_nested_copy: true
      },
      value: {
        'nested.text_1': '$text_1',
      },
      schema: {
        'attributes.nested.attributes.text_1.disabled': true,
      }
    },
    {
      condition: {
        text_1: 'hide',
      },
      schema: {
        'attributes.text_2.hidden': true,
      }
    },
    {
      condition: {
        text_2: {
          $exists: true,
          $ne: '',
        }
      },
      schema: {
        'attributes.text_1.label': '$text_2',
      }
    },
    {
      condition: {
        text_2: 'hide'
      },
      schema: {
        'attributes.text_1.hidden': true,
      }
    },
    {
      condition: {
        'list_of_options.0': {
          $exists: true,
        }
      },
      schema: {
        'attributes.text_1.options': '$list_of_options',
      }
    }
  ],
}


// SCHEMA.attributes.nested = cloneDeep(SCHEMA)

render(
  <Form
    schema={SCHEMA}
    value={{
      text_1: 'show',
      text_2: 'Some value',
    }}
  />,
	document.getElementById('root')
)
