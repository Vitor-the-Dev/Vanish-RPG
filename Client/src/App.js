import react, { useState } from 'react'
import './App.css'
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient/client';
import Changeyearbutton from "./components/changeyear"
import Loginform from "./components/Login"
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from './apicalls/queries';


function App ()  {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const isLoggedIn = !!data.currentUser;
  
  if (isLoggedIn) {
    const {
      name,
      discordtag,
    } = data.currentUser;
    return (
      <>
        <div className="container">
        <p>Greetings {name}! </p>
        <br />
        <p>I see your discord tag is {discordtag}</p> 
        <br />
        <p>Would you like to change the year? Just press the button!</p>
        <Changeyearbutton />

        </div>
        
      </>
    );
  }

  return(
    <div className="container">
          <Loginform />
    </div>
  );
}

export default App;