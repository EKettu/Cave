import React, { useState, useEffect}  from 'react';
import './App.css';
import axios from 'axios'
import Cave from './components/Cave';
import Button from './components/Button';

const App = () => {

  const baseUrl = '/api/games'
  const [startPressed, setStartPressed] = useState(false);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
      })
  }, [])

  if (startPressed===true) {
    return (
      <div className="container">
        <h1>Cave Game</h1>
        <Cave></Cave>
      </div>

    );
  }

  return (
    <div className="container">
      <h1>Cave Game</h1>
      <p>Squash monsters in the cave before your flashlight runs out of batteries!</p>
      <Button onClick={()=>setStartPressed(true)} text = "Start"/>
    </div>
  );
}

export default App;
