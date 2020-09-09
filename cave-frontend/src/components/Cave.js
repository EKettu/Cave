import React, { useState, useEffect, useRef} from 'react';
import Button from './Button';
import Table from './Table';
import { createMonsters } from '../game/monsters'

const Cave = () => {
    const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns));

    const caveSize = 4;
  
    const playerLocation = useRef(null);
    if(playerLocation.current === null) {
        playerLocation.current = {
            currentX: 0, currentY: 0
        };  
    }

    const monsters = useRef(null);
    if (monsters.current === null) {
        monsters.current = createMonsters(2, caveSize);
    }

    const monsterCount = useRef(2);

    const [lightLeft, setLight] = useState(8);
    const [playerMoves, setPlayerMoving] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const playerMove = (e) =>{
        console.log("gameOver is ", gameOver);
        if(gameOver===false) {
            console.log("player moves, key is ", e.key);
            if(playerMoves===false) {
                setPlayerMoving(true);
            }
            let playerX = playerLocation.current.currentX;
            let playerY = playerLocation.current.currentY;
            if (e.key==='w') {
                if(playerX-1>=0) {
                    playerX -= 1;
                }
            }
            if (e.key==='a') {
                if(playerY-1>=0) {
                    playerY -= 1;
                }
            }
            if (e.key==='d') {
                if(playerY+1<=caveSize-1) {
                    playerY += 1;
                }
            }
            if (e.key==='s') {
                if(playerX+1<=caveSize-1) {
                    playerX += 1;
                }
            }
            const newPlayerLocation = {
                currentX: playerX,
                currentY: playerY
            };
            playerLocation.current = newPlayerLocation;
            moveMonsters();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', playerMove);

        return () => {
          document.removeEventListener('keydown', playerMove);
        };
      }, []);

    const createTheCave = (playerX, playerY) => {
        console.log("create the cave");
        var tiles = create2dArray(4, 4);
        var keyIndex = 1;
        for (let i = 0; i < caveSize; i++) {
            for (let j = 0; j < caveSize; j++) {
                const tile = {key: keyIndex, x: i, y: j, player: false, monster: false};
                for (let index = 0; index < monsters.current.length; index++) {
                    let monster = monsters.current[index];
                    if(monster.x===i && monster.y===j) {
                        tile.monster = true;
                    }
                }
                tiles[i][j] = tile;
                keyIndex++;
            }           
        }
        tiles[playerX][playerY].player = true;
        return tiles;
    }
  
    const [cave, setCave] = useState(() => {
        const initialState = createTheCave(0,0);
        return initialState;
    });

    const removeMonster = (id) => {
        console.log("monsters is ", monsters.current);
        const temp = monsters.current.filter(monster => monster.id !== id);
        monsters.current = temp;
        console.log("now monsters is ", monsters.current);
    }

    const updateMonster = (updatedMonster) => {
        monsters.current.map(monster => monster.id === updatedMonster.id ? {...updatedMonster} : monster);
    }
  
    const moveMonsters = () => {
        console.log("moving monsters");
        for (let index = 0; index < monsters.current.length; index++) {
            let updatedMonster = monsters.current[index];
            let indexX = updatedMonster.x;
            let indexY = updatedMonster.y;

            let direction = Math.floor(Math.random() * 3);
            if(direction === 0) {
                if(indexX+1<=caveSize-1) {
                    indexX+=1;
                }
            }
            if(direction === 1) {
                if(indexX-1>=0) {
                    indexX-=1;
                }
            }
            if(direction === 2) {
                if(indexY+1<=caveSize-1) {
                    indexY+=1;
                }
            }
            if(direction === 3) {
                if(indexY-1>=0) {
                    indexY-=1;
                }
            }
            updatedMonster.x = indexX;
            updatedMonster.y = indexY;
            
            updateMonster(updatedMonster);
         
            if(didTheMonsterDie(indexX, indexY)) {
                console.log("MONSTER DIED!");
                removeMonster(updatedMonster.id);
                monsterCount.current = monsterCount.current - 1;
                if(didThePlayerWin(monsterCount.current)) {
                    stopTheGame();
                }              
            }
        }
    }
  
    const didTheMonsterDie = (monsterX, monsterY) => {
        if(monsterX === playerLocation.current.currentX && monsterY === playerLocation.current.currentY) {
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
        if(lightLeft > 0) {
            console.log('Victory');
        }
        else {
            console.log('Loss');
        }
    }

    const drawTheCave = () => {
        setPlayerMoving(false);
        setLight(lightLeft - 1);
        const newCave = createTheCave(playerLocation.current.currentX, playerLocation.current.currentY);
        setCave(newCave);
    }

    if(gameOver===true) {
        return (
            <div> 
                <p>Monsters left: {monsterCount.current}</p>
                <p>Batteries left: {lightLeft}</p>
                <p>Game Over</p>
                <Table table = {createTheCave(playerLocation.current.currentX, playerLocation.current.currentY)} playerMoves = {false}/>
            </div>
        );
    }
    return ( 
       <div> 
           <p>Monsters left: {monsterCount.current}</p>
           <p>Batteries left: {lightLeft}</p>
           <Table table = {cave} playerMoves = {playerMoves}/>
           <Button onClick = {drawTheCave} text = 'Light' />
        </div>
    );
}

export default Cave;