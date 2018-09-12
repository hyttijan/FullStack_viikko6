import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}
const save = async(anecdote) =>{
  const response = await axios.post('http://localhost:3001/anecdotes',anecdote)
  return response.data
}
const vote = async(anecdote)=>{
	const updatedAnecdote  = {...anecdote,votes:anecdote.votes+1}
	const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`,updatedAnecdote)
	return response.data
}
export default { getAll,save,vote }
