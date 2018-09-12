import React from 'react'
import {filterChange, noFilter} from '../reducers/filterReducer'
import { connect } from 'react-redux'
class Filter extends React.Component {
  handleChange = (event) => {
    const filter = event.target.value 
    filter.length>0?this.props.filterChange(filter):this.props.noFilter()      
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}
const mapDispatchToProps ={
  filterChange,
  noFilter
}
const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)
export default ConnectedFilter