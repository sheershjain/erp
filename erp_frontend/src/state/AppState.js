import {createContext, useContext} from 'react'

export const defaultAppState = {
    signedIn: false,
    userId: 0,
    role: '',
    email: '',
    name: '',
    position: '',
    token: ''
}

export const AppStateContext = createContext({
    appState: {...defaultAppState},
    setAppState: (obj) => console.log(obj)
})

export const useAppState = () => useContext(AppStateContext)