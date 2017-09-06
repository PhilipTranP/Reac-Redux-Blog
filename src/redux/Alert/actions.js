export const START_ALERT = 'START_ALERT'
export const STOP_ALERT = 'STOP_ALERT'

export function stopAlert(id) {
  return function(dispatch) {
    dispatch({
      type: STOP_ALERT,
      payload: id
    })
  }
}

export function startAlert (message, icon, color) {
   return function(dispatch) {
     const id = Math.floor(Math.random()*10000);
     window.setTimeout(() => stopAlert(id)(dispatch), 7000)
     return dispatch({
       type: START_ALERT,
       payload: {id, message, icon, color}
     })
   }
}
