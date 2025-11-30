import React, { useEffect, useState } from "react"
import { getMyTasks, login } from "../services/loginServices.js"

export const LoginPage = () =>{

    const[password,setPassword]= useState("")
    const[userName,setUserName]= useState("")

    return(
        <>  
            <div className="container">
        	<h3>Login and register test</h3>
			<div>
				<input placeholder="Username" onChange={e=>setUserName(e.target.value)}></input>
				<input placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
				<button >Register</button>
			</div>
			<div>
				<input placeholder="Username" onChange={e=>setUserName(e.target.value)}></input>
				<input placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
				<button onClick={e=>login(userName,password)}>Login</button>
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