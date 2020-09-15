import React, { useState, useEffect, useRef} from 'react';
import Button from './Button';
import Table from './Table';
import { createMonsters, moveMonster, updateMonster, 
removeMonster, didTheMonsterDie } from '../game/monsters';
import { movePlayer, didThePlayerWin } from '../game/player';
import { createCave } from '../game/cave';

const Cave = () => {

    const caveSize = 4;
    const monsterAmount = 2;
    const batteryCount = 8;
    const playerStartX = 0;
    const playerStartY = 0;
  
    const playerLocation = useRef(null);
    if(playerLocation.current === null) {
        playerLocation.current = {
            x: playerStartX, y: playerStartY
        };  
    }

    const monsters = useRef(null);
    if (monsters.current === null) {
        monsters.current = createMonsters(monsterAmount, caveSize);
    }

    const monsterCount = useRef(monsterAmount);
    const batteriesLeft = useRef(batteryCount);

    const [playerMoves, setPlayerMoving] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [cave, setCave] = useState(() => {
        const initialState = createCave(playerStartX, playerStartY, caveSize, monsters.current);
        return initialState;
    });

    const playerMove = (e) =>{
       if(gameOver===false) {
            if(playerMoves===false) {
               setPlayerMoving(true);
            }
            playerLocation.current = movePlayer(e, playerLocation.current, caveSize)
            moveMonsters();
       }
    }

    useEffect(() => {
        document.addEventListener('keydown', playerMove);
        return () => {
          document.removeEventListener('keydown', playerMove);
        };
      }, []);

    const moveMonsters = () => {
        for (let i = 0; i < monsters.current.length; i++) {
            let monster = moveMonster(monsters.current[i], caveSize);          
            monsters.current = updateMonster(monster, monsters.current);
         
            if(didTheMonsterDie(monster.x, monster.y, playerLocation.current.x, playerLocation.current.y)) {
                console.log("MONSTER DIED!");
                monsters.current = removeMonster(monster.id, monsters.current);
                monsterCount.current = monsterCount.current - 1;
                if(didThePlayerWin(monsterCount.current)) {
                    stopTheGame();
                }              
            }
        }
    }

    const stopTheGame = () => {
        setGameOver(true);
        if(batteriesLeft.current > 0) {
            console.log('Victory');
        }
        else {
            console.log('Loss');
        }
    }

    const restartTheGame = () => {
        setGameOver(false);
        setPlayerMoving(false);
        playerLocation.current = {
            x: playerStartX, y: playerStartY
        }; 
        monsterCount.current = monsterAmount;
        batteriesLeft.current = batteryCount;
        monsters.current = createMonsters(monsterAmount, caveSize);
        setCave(createCave(playerStartX, playerStartY, caveSize, monsters.current)); 
    }

    const drawCave = () => {
        setPlayerMoving(false);
        batteriesLeft.current = batteriesLeft.current - 1;
        if(batteriesLeft.current===0) {
            stopTheGame();
        }
        else {
            const newCave = createCave(playerLocation.current.x, playerLocation.current.y, 
                caveSize, monsters.current);
            setCave(newCave);
        }
    }

    if(gameOver===true) {
        return (
            <div> 
                <p>Monsters left: {monsterCount.current}</p>
                <p>Batteries left: {batteriesLeft.current}</p>
                <p>Game Over</p>
                <Table table = {createCave(playerLocation.current.x, playerLocation.current.y, 
                    caveSize, monsters.current)} playerMoves = {false}/>
                <Button onClick = {restartTheGame} text = 'New Game' />
            </div>
        );
    }
    return ( 
       <div> 
           <p>Monsters left: {monsterCount.current}</p>
           <p>Batteries left: {batteriesLeft.current}</p>
           <Table table = {cave} playerMoves = {playerMoves}/>
           <Button onClick = {drawCave} text = 'Light' />
        </div>
    );
}

export default Cave;