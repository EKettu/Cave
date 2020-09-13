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
