import { useMutation } from "@apollo/client";
import react, { useState } from 'react';
import './login.css';
import { CURRENT_USER_QUERY } from '../apicalls/queries';
import { LOGIN_MUTATION } from '../apicalls/mutations';

function Loginform () {



  const [login] = useMutation(
    LOGIN_MUTATION,
    {
      update: (cache, { data: { login }}) => cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: login.user },
      }),
    }
  )
//https://sebhastian.com/handlechange-react/
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async(event) => { 
    event.preventDefault();
    alert(inputs.password)
    const s = await login({ variables: inputs })
    alert(inputs.email)
  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
       <label>Enter your email: 
       <input 
          type="text" 
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
       />
       <br />
       </label>
       <label>Enter your password: 
       <input 
          type="text" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        <br />
        </label>
        <input type="submit" />
    </form>
    </div>
  );
}

export default Loginform;


// made with the help of https://contactmentor.com/login-form-react-js-code/