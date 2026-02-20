import { createContext, useReducer, useEffect, useState } from 'react'

export const EditContext = createContext()

export const editReducer = (state, action) => {
  switch (action.type) {
    case 'EDITING':
      return { edit: action.payload }
    case 'NOTEDITING':
      return { edit: false }
    default:
      return state
  }
}

export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editReducer, { 
    edit: false
  })

  //this is a flag to prevent conflict of openning Action menu and chat actions
  const [flag, setFlag] = useState(false)

  /* useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state) */
  
  return (
    <EditContext.Provider value={{ ...state, dispatch, flag, setFlag }}>
      { children }
    </EditContext.Provider>
  )

}