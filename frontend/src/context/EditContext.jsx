import { createContext, useReducer, useEffect } from 'react'

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

  /* useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state) */
  
  return (
    <EditContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EditContext.Provider>
  )

}