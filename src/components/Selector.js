import React from 'react'

const mapOptions = (val, idx) => <option value={val} key={idx}>{val}</option>

const Selector = (props) => {
  const {
    name,
    options,
    onSelect
  } = props

  return (
    <select name={name} onChange={onSelect}>
      {options.map(mapOptions)}
    </select>
  )
}

export default Selector
