import anecdoteService from '../services/anecdotes'
const getId = () => (100000*Math.random()).toFixed(0)



const anecdoteReducer = (store = [], action) => {

  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.anecdote.id)
    return [...old, action.anecdote ]
  }
  else if (action.type === 'CREATE') {

    return [...store, action.anecdote]
  }
  else if(action.type === 'INIT_ALL'){
    return [...store,...action.anecdotes]
  }

  return store
}

const createAction = (anecdote)=>{
  return async(dispatch) =>{
    const newAnecdote = await anecdoteService.save(anecdote)
    dispatch({
      type: 'CREATE',
      anecdote: newAnecdote
    })
  }
}
const voteAction = (anecdote)=>{
  return async(dispatch)=>{
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({ type: 'VOTE', anecdote:updatedAnecdote})
  }
}
const initAllAction = ()=>{
  return async(dispatch)=>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ALL',
      anecdotes:anecdotes
    })
  }
  
}

export {anecdoteReducer}
export {createAction}
export {voteAction}
export {getId}
export {initAllAction}