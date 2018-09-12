const initialState = {
  content: ""
}
const notificationReducer = (store=initialState, action)=>{
  switch(action.type){
  	case 'NOTIFY':
      store = {content: action.message}
      break
    case 'HIDE':
      store = {content:""}
      break
    default:
      break  
  }
  return store
}

const notifyAction = (message,time)=>{
  return (dispatch)=>{
    dispatch({type:'NOTIFY',message:message})
    setTimeout(()=>{dispatch({type:'HIDE'})},time*1000)
  }
}
export {notificationReducer}
export {notifyAction}