import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/AnecdoteFilter'
import {connect} from 'react-redux'
import {initAllAction} from './reducers/anecdoteReducer'
class App extends React.Component {
  componentDidMount () {
    this.props.initAllAction()
  }
  render() {

    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification/>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
      </div>
    )
  }
}

export default connect(null,{initAllAction})(App)