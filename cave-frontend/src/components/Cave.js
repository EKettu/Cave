import React, { useState} from 'react'
import Button from './Button'
import Table from './Table'
import shortid from "shortid"

const Cave = () => {
    const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns))

    const caveSize = 4
  
    const createMonsters = (amount) => {
        console.log("createMonsters")
        let monsterArray = []
        for (let index = 0; index < amount; index++) {
            let randomX = Math.floor(Math.random() * caveSize-1) + 1;
            let randomY = Math.floor(Math.random() * caveSize-1) + 1;
            var monster = {id: shortid.generate(), x: randomX, y: randomY}
            monsterArray.push(monster)
        }
        return monsterArray
    }
  
    const [playerLocation, setPlayerLocation] = useState({
        currentX: 0, currentY: 0
    })

    const [monsters, setMonsters] = useState(() => {
        const initialState = createMonsters(2);
        return initialState;
      });

    const [monsterCount, setMonsterCount] = useState(2)
    const [lightLeft, setLight] = useState(10)
  
    const[playerMoves, setPlayerMoving] = useState(false)

    const playerMove = (e) =>{
        console.log("player moves, key is ", e.key)
        setPlayerMoving(true)
        let playerX = playerLocation.currentX
        let playerY = playerLocation.currentY
        if (e.key==='w') {
            if(playerX-1>=0) {
                playerX -= 1
            }
        }
        if (e.key==='a') {
            if(playerY-1>=0) {
                playerY -= 1
            }
        }
        if (e.key==='d') {
            if(playerY+1<=caveSize-1) {
                playerY += 1
            }
        }
        if (e.key==='s') {
            if(playerX+1<=caveSize-1) {
                playerX += 1
            }
        }
        const newPlayerLocation = {
            currentX: playerX,
            currentY: playerY
        }
        setPlayerLocation(newPlayerLocation)
        moveMonsters()
    }

    document.addEventListener('keydown', playerMove);

    const createTheCave = (playerX, playerY) => {
        console.log("create the cave")
        var tiles = create2dArray(4, 4)
        var keyIndex = 1
        for (let i = 0; i < caveSize; i++) {
            for (let j = 0; j < caveSize; j++) {
                const tile = {key: keyIndex, x: i, y: j, player: false, monster: false}
                for (let index = 0; index < monsters.length; index++) {
                    let monster = monsters[index]
                    if(monster.x===i && monster.y===j) {
                        tile.monster = true
                    }
                }
                tiles[i][j] = tile
                keyIndex++
            }           
        }
        tiles[playerX][playerY].player = true
        return tiles
    }
  
    const [cave, setCave] = useState(() => {
        const initialState = createTheCave(0,0);
        return initialState;
      });

    const removeMonster = (id) => {
        console.log("monsters is ", monsters)
        const temp = monsters.filter(monster => monster.id !== id)
        console.log("temp is ", temp)
        setMonsters(temp)
        // setMonsters(monsters.filter(monster => monster.id !== id))
        console.log("now monsters is ", monsters)
    }

    const updateMonster = (updatedMonster) => {
        setMonsters(monsters.map(monster => monster.id === updatedMonster.id ? {...updatedMonster} : monster ))
    }
  
    const moveMonsters = () => {
        console.log("moving monsters")
        for (let index = 0; index < monsters.length; index++) {
            let updatedMonster = monsters[index]
            let indexX = updatedMonster.x
            let indexY = updatedMonster.y

            let direction = Math.floor(Math.random() * 3);
            if(direction === 0) {
                if(indexX+1<=caveSize-1) {
                    indexX+=1
                }
            }
            if(direction === 1) {
                if(indexX-1>=0) {
                    indexX-=1
                }
            }
            if(direction === 2) {
                if(indexY+1<=caveSize-1) {
                    indexY+=1
                }
            }
            if(direction === 3) {
                if(indexY-1>=0) {
                    indexY-=1
                }
            }
            updatedMonster.x = indexX
            updatedMonster.y = indexY
            
            updateMonster(updatedMonster)
         
            if(!didTheMonsterDie(indexX, indexY)) {
              console.log("monster did not die")
            }
            else {
                removeMonster(updatedMonster.id)
                console.log("monsters is ", monsters)
                setMonsterCount(monsterCount - 1)
                if(didThePlayerWin(monsterCount)) {
                    stopTheGame()
                }
                            
            }
  
        }
    }
  
    const didTheMonsterDie = (monsterX, monsterY) => {
        if(monsterX === playerLocation.currentX && monsterY === playerLocation.currentY) {
            return true
        }
        return false
    }
  
    const didThePlayerWin = (monsterCount) => {
        if (monsterCount === 0) {
            return true
        }
        return false
    }
  
    const stopTheGame = () => {
        if(lightLeft > 0) {
            return 'Victory'
        }
        return 'Loss'
  
    }

    const drawTheCave = () => {
        setPlayerMoving(false)
        setLight(lightLeft - 1)
        const newCave = createTheCave(playerLocation.currentX, playerLocation.currentY)
        setCave(newCave)
    }
  
  
    return ( 
       <div> 
           <p>Monsters left: {monsterCount}</p>
           <p>Batteries left: {lightLeft}</p>
           <Table table = {cave} playerMoves = {playerMoves}/>
           <Button onClick={drawTheCave} text='Light' />
        </div>
    )

}

export default Cave