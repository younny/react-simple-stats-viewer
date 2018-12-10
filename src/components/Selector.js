import React from 'react'

const mapOptions = (val, idx) => <option value={val} key={idx}>{val}</option>

const Selector = (props) => {
  const {
    label,
    name,
    options,
    onSelect
  } = props

  return (
    <div>
      <label>{label}</label>
      <select name={name} onChange={onSelect}>
        {options.map(mapOptions)}
      </select>
    </div>
  )
}

export default Selector
