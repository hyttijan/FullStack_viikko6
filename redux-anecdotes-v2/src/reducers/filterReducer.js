

const filterReducer = (store={type:'ALL'}, action)=>{
  switch(action.type){
    case 'SET_FILTER':
      return action
    case 'ALL':
      return action
    default:
      return store
  }
}
const filterChange = (filter)=>{
	return {
		type: 'SET_FILTER',
		filter
	}
}
const noFilter = ()=>{
  return{
    type:'ALL'
  }
}

export {filterReducer}
export {filterChange, noFilter}