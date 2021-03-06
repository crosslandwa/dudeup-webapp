import React from 'react'
import { textInputStyle } from '../styles'

const PriceInput = ({ onChange, placeholder = 0, price, style }) => (
  <input
    style={{ ...textInputStyle, ...style }}
    type="number"
    step="0.01"
    onChange={onChange}
    placeholder={placeholder}
    value={price !== 0 ? price : ''}
  />
)

export default PriceInput
