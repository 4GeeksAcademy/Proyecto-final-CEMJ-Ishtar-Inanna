
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

     localStorage.setItem("jwt-token", data.token);

     return data

}

export const getAuthentication = async () => {
  const token = localStorage.getItem('jwt-token');

//   console.log('raw token:', JSON.stringify(token));
//   console.log('parts   :', token?.split('.').length);
 
  console.log('Authorization:', `Bearer ${token}`);
  if (!token) {                      
    console.warn('No token found – aborting request');
    return { ok: false, status: 401 };
  }

  const resp = await fetch(`http://localhost:3001/api/protected`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await resp.json();
  console.log('status:', resp.status, 'body:', data);
  return resp;
};