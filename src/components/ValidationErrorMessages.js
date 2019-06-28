import React from 'react'

export const ValidationErrorMessages = ({ validationError }) => {
  return <div className='validation-error-messages'>
    {validationError.errors.map((err, index) => (<div
      className='validation-error-messages__message'
      key={index}>
      {err.message}
    </div>))}
  </div>
}
