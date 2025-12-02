import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";  
import { getAuthentication } from "../../services/loginServices";
import { useEffect } from "react";


export const Demo = () => {

  const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
  
      const authenticationPrivateZone = async () => {
          const response = await getAuthentication()
          if (!response){
              navigate('/')
          }
          console.log(response)
      }
  
      useEffect(()=>{
          authenticationPrivateZone()
      })

  return (
    <div className="container">
      <ul className="list-group">
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}>

              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>

              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>

              <button className="btn btn-success"
                onClick={() => dispatch({
                  type: "add_task",
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
