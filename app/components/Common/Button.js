import React from 'react'

const Button = ({className, width, height, fontSize, handleSubmit, value}) => (
  <a
    className={`btn ${className}`}
    style={{
      width,
      height,
      fontSize,
      lineHeight: height
    }}
    onClick={handleSubmit}
    href="javascript:void(0);"
  >
    {value}
  </a>
)

export default Button
