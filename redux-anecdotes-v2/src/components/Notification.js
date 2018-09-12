import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.notification.content}
      </div>
    )
  }
}
const mapsStateToProps = (state)=>{
  return {
    notification: state.notificationReducer
  }
}
const ConnectedNotification = connect(mapsStateToProps)(Notification)

export default ConnectedNotification
