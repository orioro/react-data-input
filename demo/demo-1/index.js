import React from 'react'
import { render } from 'react-dom'
import { dataSchema } from '@orioro/data-schema'

import {
  DataInput,
  withRenderers,
  DEFAULT_RENDERERS,
} from '../../src'

const {
  parseValue,
  validateValue,
  parseAndValidateValue
} = dataSchema({
  STRING_TYPES: ['text'],
  validateAsync: true,
})

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      spec: props.spec,
      value: parseValue(props.spec, props.value, { recursive: true }),
      errors: []
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const {
      spec,
      value,
      errors,
    } = this.state

    if (errors && errors.length > 0) {
      console.warn('attempted to submit, but cancelling due to errors', errors)
    } else {
      console.log('will submit', value)
    }
  }

  render() {
    const { spec, value } = this.state

    return <form onSubmit={this.handleSubmit}>
      {withRenderers(DataInput, DEFAULT_RENDERERS)({
        spec: spec,
        value: value,
        onChange: (newValue, { path, errors }) => {

          console.log('onChange', newValue, path, errors)

          this.setState({
            ...this.state,
            value: newValue,
            errors
          })
        },
        // onValidateValue: (spec, value) => {
        //   return validateValue(spec, value, {
        //     recursive: false,
        //   })
        // },
        onParseValue: (spec, value) => {
          // console.log('onParseValue', spec, value, parseValue(spec, value))

          return parseValue(spec, value, {
            recursive: false,
          })
        }
      })}
      <button type='submit'>
        Enviar
      </button>
    </form>
  }
}

const SCHEMA = {
  type: 'map',
  attributes: {
    text_1: {
      label: 'Text 1',
      type: 'text',
      validation: {
        stringMinLength: {
          length: 6,
        },
        stringMaxLength: {
          length: 10,
          message: 'Text has to have at most 10 chars',
        }
      }
    },
    text_2: {
      label: 'Text 2',
      type: 'text',
      validation: {
        stringMinLength: {
          length: 6,
        },
        stringMaxLength: {
          length: 10,
          message: 'Text has to have at most 10 chars',
        }
      }
    },
    boolean_true: {
      label: 'Must be true',
      type: 'boolean',
      default: false,
      validation: {
        identity: {
          value: true,
          message: 'Option must be true',
        }
      }
    },
    boolean_false: {
      label: 'Must be false',
      type: 'boolean',
      default: false,
      validation: {
        identity: {
          value: false,
          message: 'Option must be false',
        }
      }
    },
    map: {
      label: 'Map',
      type: 'map',
      attributes: {
        nested_map: {
          type: 'map',
          attributes: {
            text: {
              label: 'Text',
              type: 'text',
              validation: {
                stringMinLength: {
                  length: 6,
                },
                stringMaxLength: {
                  length: 10,
                  message: 'Text has to have at most 10 chars',
                }
              }
            },
            anotherText: {
              label: 'Another Text',
              type: 'text',
              default: 'Lorem ipsum dolor'
            },
          }
        }
      }
    },
    enable_list_of_texts: {
      type: 'text',
      default: 'enable',
      options: [
        {
          label: 'Enable list of texts',
          value: 'enable',
        },
        {
          label: 'Disable list of texts',
          value: 'disable',
        }
      ]
    },
    list_of_texts: {
      condition: {
        enable_list_of_texts: 'enable',
        $expr: {
          $eq: [
            {
              $cmp: ['$text_1', '$text_2']
            },
            0
          ]
        },
      },
      type: 'list',
      item: {
        type: 'text',
      }
    },
    list_of_people: {
      label: 'List of people',
      type: 'list',
      item: {
        label: 'Person',
        type: 'map',
        attributes: {
          givenName: {
            type: 'text',
            label: 'Given name',
          },
          familyName: {
            type: 'text',
            label: 'Family name',
          },
        }
      },
      validation: {
        arrayMinLength: {
          length: 1,
        },
        arrayMaxLength: {
          length: 5,
        }
      }
    },
    text_select: {
      type: 'text',
      options: ['Option A', 'Option B', 'Option C']
    },
    text_select_radio: {
      type: 'text',
      options: ['Option A', 'Option B', 'Option C'],
      ui: {
        radio: true,
      }
    },
  }
}

render(
  <Form
    spec={SCHEMA}
    value={{
      map: {
        nested_map: {
          text: 'Some text',
        }
      },
      list_of_texts: ['1', '2', '3'],
    }}
  />,
	document.getElementById('root')
)
