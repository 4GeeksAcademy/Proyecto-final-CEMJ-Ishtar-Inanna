import { useState } from "react";
import { registerUser } from "../services/registerUser";

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const registerUsers = async (e) => {
        e.preventDefault();


        const userData = { username, email, password, name, last_name: lastName };
        try {
            const result = await registerUser(userData);
            console.log("Usuario registrado:", result);
        } catch (err) {
            console.error(err);
            alert("No se pudo registrar el usuario.");
        }


    }

    return (
        <div>
            <h1>Sign Up</h1>
            
            <form onSubmit={registerUsers}>

                <label>Username</label>
                <input onChange={({ target }) => setUsername(target.value)} value={username} placeholder="username"></input>


                <label>email</label>
                <input onChange={({ target }) => setEmail(target.value)} value={email} placeholder="email"></input>


                <label>password</label>
                <input type="password" onChange={({ target }) => setPassword(target.value)} value={password} placeholder="password"></input>

                <label>Name</label>
                <input onChange={({ target }) => setName(target.value)} value={name} placeholder="name"></input>

                <label>Last name</label>
                <input onChange={({ target }) => setLastName(target.value)} value={lastName} placeholder="last name"></input>

                <button type="submit"> Registrar</button>
            </form>
        </div>
    );
}
