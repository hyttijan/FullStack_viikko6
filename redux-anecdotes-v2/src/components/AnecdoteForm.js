import React from 'react'
import {createAction, getId} from '../reducers/anecdoteReducer'
import {notifyAction} from '../reducers/notificationReducer'
import { connect } from 'react-redux'
class AnecdoteForm extends React.Component {
  handleSubmit = async(e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createAction({ content: content, id: getId(), votes:0 })
    this.props.notifyAction(`you created '${content}'`, 10)


    
  }
  render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}
const mapDispatchToProps ={
  createAction,
  notifyAction
}
const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
