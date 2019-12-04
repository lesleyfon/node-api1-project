import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/user'
function App() {
  const [user, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    bio: ''
  })
  useEffect(()=>{
    fetchUsers()

  })

  const fetchUsers = () => {
    axios.get(baseUrl).then(res=> {
      setUsers(res.data.data)
    }).catch(err=> {
      console.log(err)
    })
  }

  useEffect(()=>{

  })
  const deleteUser = (id) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(res=> {
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
  }
const postUser = params => {
  axios.post(baseUrl, params)
    .then(res=> console.log(res))
    .catch(err=>console.log(err))
}
const submitUser = e => {
  e.preventDefault()
  postUser(newUser)
}
const handleChange = e =>{
  console.log(e.target)
  setNewUser({
    ...newUser,
    [e.target.name] : e.target.value 
  })
}
  return (
    <div className="App">
        <ul>
            {user.length > 1 ? user.map(person => <li key={person.name}> {person.name} <button onClick={()=>{deleteUser(person.id)}}>Delete User</button></li>) : <p>Data Loading</p>}
        </ul>
        <form onSubmit={(e)=>{submitUser(e)}}>
          <input 
            type='text'
            name='name'
            placeholder='Name'
            value={newUser.name}
            onChange= {handleChange}
            />
          <input 
            type='text'
            name='bio'
            placeholder='Bio'
            value={newUser.bio}
            onChange= {handleChange}
            />
            <button>Submit User</button>
        </form>
    </div>
  );
}

export default App;
