import React, {PropTypes} from 'react'
import '../css/resultTable.less'

export const ResultTable = (props) => {
  return (
    <table id='resultTable' className='table table-striped'> 
      <thead className='thead-inverse'> 
        <tr>
          {props.headerRows.map((row, index) => {
            return (
              <th key={index}> {row.text}</th>
            )
          })} 
        </tr>
      </thead>
      <tbody> 
        {props.children}
      </tbody> 
      
    </table>
  )
}

ResultTable.propTypes = {
  headerRows: PropTypes.array
}