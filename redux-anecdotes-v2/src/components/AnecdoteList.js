import React from 'react'
import {voteAction} from '../reducers/anecdoteReducer'
import {notifyAction} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  
  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={async() =>{
                this.props.voteAction(anecdote)
                this.props.notifyAction(`you voted '${anecdote.content}'`, 10)
              }  
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state)=> {
  return{
    anecdotes:anecdotesToShow(state.anecdoteReducer,state.filterReducer)
  }
}
 
const anecdotesToShow = (anecdotes,filter) =>{
    if(filter.type==='ALL'){
      return anecdotes
    }
    else{
      return anecdotes.filter(anecdote=>anecdote.content.includes(filter.filter))
    }
  }
const mapDispatchToProps = {
  voteAction,
  notifyAction
}
const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
