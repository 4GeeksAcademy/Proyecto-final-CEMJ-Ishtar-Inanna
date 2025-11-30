


export const login = async (username, password) => {

     const resp = await fetch(`http://localhost:3001/api/users/login`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }) 

     })

     if(!resp.ok) throw Error("There was a problem in the login request")

     if(resp.status === 401){throw("Invalid credentials")}

     else if(resp.status === 400){throw ("Invalid email or password format")}

     const data = await resp.json()

     // Save your token in the localStorage
     // Also you should set your user into the store using the setItem function

     localStorage.setItem("jwt-token", data.token);

     return data

}

export const getMyTasks = async () => {

     // Retrieve token from localStorage
     const token = localStorage.getItem('jwt-token');
     const resp = await fetch(`http://localhost:3001/protected`, {

        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
        } 

     });

     if(!resp.ok) {
          throw Error("There was a problem in the login request")
     } else if(resp.status === 403) {
          throw Error("Missing or invalid token");
     } 
     console.log(token)
     return "WORKS"

}

