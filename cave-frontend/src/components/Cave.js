import React, { useState, useEffect, useRef} from 'react';
import Button from './Button';
import Table from './Table';
import { createMonsters, moveMonster, updateMonster, removeMonster } from '../game/monsters';
import { movePlayer } from '../game/player';
import { createCave } from '../game/cave';

const Cave = () => {

    const caveSize = 4;
  
    const playerLocation = useRef(null);
    if(playerLocation.current === null) {
        playerLocation.current = {
            x: 0, y: 0
        };  
    }

    const monsters = useRef(null);
    if (monsters.current === null) {
        monsters.current = createMonsters(2, caveSize);
    }

    const monsterCount = useRef(2);
    const lightLeft = useRef(8);

    const [playerMoves, setPlayerMoving] = useState(false);
    const [gameOver, setGameOver] = useState(false);

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

    const [cave, setCave] = useState(() => {
        const initialState = createCave(0, 0, caveSize, monsters.current);
        return initialState;
    });

    const moveMonsters = () => {
        console.log("moving monsters");
        for (let i = 0; i < monsters.current.length; i++) {
            let monster = moveMonster(monsters.current[i], caveSize);          
            monsters.current = updateMonster(monster, monsters.current);
         
            if(didTheMonsterDie(monster.x, monster.y)) {
                console.log("MONSTER DIED!");
                monsters.current = removeMonster(monster.id, monsters.current);
                monsterCount.current = monsterCount.current - 1;
                if(didThePlayerWin(monsterCount.current)) {
                    stopTheGame();
                }              
            }
        }
    }
  
    const didTheMonsterDie = (monsterX, monsterY) => {
        if(monsterX === playerLocation.current.x && monsterY === playerLocation.current.y) {
            return true;
        }
        return false;
    }
  
    const didThePlayerWin = (monsterCount) => {
        if (monsterCount === 0) {
            return true;
        }
        return false;
    }
  
    const stopTheGame = () => {
        setGameOver(true);
        document.removeEventListener('keydown', playerMove);
        if(lightLeft.current > 0) {
            console.log('Victory');
        }
        else {
            console.log('Loss');
        }
    }

    const drawCave = () => {
        setPlayerMoving(false);
        lightLeft.current = lightLeft.current -1;
        if(lightLeft.current===0) {
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
                <p>Batteries left: {lightLeft.current}</p>
                <p>Game Over</p>
                <Table table = {createCave(playerLocation.current.x, playerLocation.current.y, 
                    caveSize, monsters.current)} playerMoves = {false}/>
            </div>
        );
    }
    return ( 
       <div> 
           <p>Monsters left: {monsterCount.current}</p>
           <p>Batteries left: {lightLeft.current}</p>
           <Table table = {cave} playerMoves = {playerMoves}/>
           <Button onClick = {drawCave} text = 'Light' />
        </div>
    );
}

export default Cave;