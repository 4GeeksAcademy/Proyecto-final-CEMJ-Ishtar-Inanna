import React, { useEffect, useState } from "react"
import { getMyTasks, login } from "../services/loginServices.js"

export const RegisterPage = () =>{

    const[password,setPassword]= useState("")
    const[userName,setUserName]= useState("")

    return(
        <>  
            <div className="container">
            <h3>Register test</h3>
            <div>
                <input placeholder="Username" onChange={e=>setUserName(e.target.value)}></input>
                <input placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
                <button >Register</button>
            </div>
            <div>
                <button onClick={e=>getMyTasks()}>Testeame el sistema de logeo</button>
            </div>
            <div>
                <button>Logout</button>
            </div>
            </div>
        </>
    )
}