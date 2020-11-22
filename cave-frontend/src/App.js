import React, { useState}  from 'react';
import './App.css';
import Cave from './components/Cave';
import Button from './components/Button';

const App = () => {

  const [startPressed, setStartPressed] = useState(false);

  if (startPressed===true) {
    return (
      <div className="container">
        <h1>Cave Game</h1>
        <p>Squash all monsters before you run out of batteries, but don't let the shadow catch you. 
          The shadow can hide behind monsters, so be careful!
        </p>
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
