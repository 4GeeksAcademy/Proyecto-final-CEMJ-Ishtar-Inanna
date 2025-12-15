import { useContext, useReducer, createContext, useState } from "react";
import storeReducer, { initialStore } from "../store"


const StoreContext = createContext()


export function StoreProvider({ children }) {

    const [login, setLogin] = useState(localStorage.getItem("jwt-token") ? true : false)
    const [store, dispatch] = useReducer(storeReducer, initialStore)

    const switchLogin = () => { setLogin(!login) }


    return <StoreContext.Provider value={{ store, dispatch, login, switchLogin }}>
        {children}
    </StoreContext.Provider>
}

export default function useGlobalReducer() {
    const { dispatch, store, login, switchLogin } = useContext(StoreContext)
    return { dispatch, store, login, switchLogin };
}