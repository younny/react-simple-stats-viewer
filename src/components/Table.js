import React from 'react'

const styles = {
  table: {
    margin: '20px 0px',
    width: '100%',
    borderCollapse: 'collapse'
  },
  row: {
    border: '1px solid'
  },
  data: {
    border: '1px solid',
    textAlign: 'center'
  }
}

const renderHeader = (text, idx) => <th key={idx} style={styles.data}>{text}</th>

const renderValue = (text, idx) => <td key={idx} style={styles.data}>{Number(text).toFixed(2)}</td>

const Table = (props) => {
  const {
    data
  } = props

  return (
    <table style={styles.table}>
      <tbody>
        <tr style={styles.row}>
          {Object.keys(data).map(renderHeader)}
        </tr>
        <tr style={styles.row}>
          {Object.values(data).map(renderValue)}
        </tr>
      </tbody>
    </table>
  )
}

export default Table
