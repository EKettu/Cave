import React, { useState } from 'react'
import Button from './Button'

const Cave = ({}) => {

    const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns))

    const caveSize = 4
  
    const createMonsters = (amount) => {
        console.log("here createMonsters")
        var monsterArray = new Array()
        for (let index = 0; index < amount; index++) {
            var monster = {id: index, x: 0, y:0}
            monsterArray.push(monster)
        }
        return monsterArray
    }
  
    const [playerPreviousX, setPreviousX] = useState(0)
    const [playerPreviousY, setPreviousY] = useState(0)
    const [playerCurrentX, setCurrentX] = useState(0)
    const [playerCurrentY, setCurrentY] = useState(0)
  
    const [monsters, setMonsters] = useState(createMonsters(2))
    const [monsterCount, setMonsterCount] = useState(2)
    const [lightLeft, setLight] = useState(10)
  
    const[playerMoves, setPlayerMoving] = useState(false)
    
  
    const playerMove = (e) =>{
        setPlayerMoving(true)
        var playerX = playerCurrentX
        var playerY = playerCurrentY
        if (e.key==='w') {
            if(playerX-1>=0) {
                playerX -= 1
                setCurrentX(playerX)
            }
        }
        if (e.key==='a') {
            console.log("playerY-1")
            console.log(playerY-1)
            if(playerY-1>=0) {
                playerY -= 1
                setCurrentY(playerY)
            }
        }
        if (e.key==='d') {
            if(playerY+1<=caveSize-1) {
                playerY += 1
                setCurrentY(playerY)
            }
        }
        if (e.key==='s') {
            if(playerX+1<=caveSize-1) {
                playerX += 1
                setCurrentX(playerX)
            }
  
        }
        moveMonsters()
    }
  
    document.addEventListener('keydown', playerMove);
  
    const addMonsters = (tiles, number, caveSize) => {
        console.log("in addMonsters")
        let updatedMonsters = new Array()
        for (let i = 0; i < number; i++) {
            let randomX = Math.floor(Math.random() * caveSize-1) + 1;
            let randomY = Math.floor(Math.random() * caveSize-1) + 1;
            let updatedMonster = monsters[i]
            updatedMonster.x = randomX
            updatedMonster.y = randomY
            updatedMonsters.push(updatedMonster)
            // setMonsters(monsters.map(monster => (monster.id === updatedMonster.id ? {...updatedMonster} : monster )))
            tiles[randomX][randomY].monster = true
        }
        // console.log("updatedMonsters is ", updatedMonsters)
        // setMonsters(updatedMonsters)
        return tiles
    }
  
    const createTheCave = () => {
        console.log("create the cave")
        var tiles = create2dArray(4, 4)
        var keyIndex = 1
        for (let i = 0; i < caveSize; i++) {
            for (let j = 0; j < caveSize; j++) {
                const tile = {key: keyIndex, x: i, y: j, player: false, monster: false}
                tiles[i][j] = tile
                keyIndex++
            }           
        }
        tiles[0][0].player = true
        tiles = addMonsters(tiles, 2, caveSize)
        return tiles
    }
  
    const [cave, setCave] = useState(createTheCave())
  
    const moveMonsters = () => {
        const newCave = [...cave]
        for (let index = 0; index < monsters.length; index++) {
            let updatedMonster = monsters[index]
  
            let indexX = updatedMonster.x
            let indexY = updatedMonster.y
  
            newCave[indexX][indexY].monster = false
            let direction = Math.floor(Math.random() * 3);
            if(direction=== 0) {
                if(indexX+1<=caveSize-1) {
                    indexX+=1
                }
            }
            if(direction=== 1) {
                if(indexX-1>=0) {
                    indexX-=1
                }
            }
            if(direction=== 2) {
                if(indexY+1<=caveSize-1) {
                    indexY+=1
                }
            }
            if(direction=== 3) {
                if(indexY-1>=0) {
                    indexY-=1
                }
            }
  
            updatedMonster.x = indexX
            updatedMonster.y = indexY
  
            setMonsters(monsters.map(monster => monster.id === updatedMonster.id ? {...updatedMonster} : monster ))
            newCave[indexX][indexY].monster = true
         
            if(!didTheMonsterDie(indexX, indexY)) {
              console.log("monster did not die")
            }
            else {
                newCave[indexX][indexY].monster = false
                setMonsterCount(monsterCount - 1)
                if(didThePlayerWin(monsterCount)) {
                    stopTheGame()
                }
                            
            }
  
        }
        setCave(newCave)
    }
  
  
    const didTheMonsterDie = (monsterX, monsterY) => {
        if(monsterX === playerCurrentX && monsterY ===playerCurrentY) {
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
        if(lightLeft>0) {
            return 'Victory'
        }
        return 'Loss'
  
    }
  
  
    const render = (tile) => {
        if(playerMoves) {
            return ''
        }
        return tile.player ? 'P': (tile.monster ? 'M' : '')
    }
  
    const drawTheCave = () => {
        setPlayerMoving(false)
        setLight(lightLeft - 1)
        const newCave = [...cave]
        newCave[playerPreviousX][playerPreviousY].player= false
        newCave[playerCurrentX][playerCurrentY].player = true
        setPreviousX(playerCurrentX)
        setPreviousY(playerCurrentY)
        setCave(newCave)
    }
  
  
    return ( 
       <div> 
            <table>
                <tbody>
                {cave.map(row => 
                <tr>{row.map(tile => 
                        <td>{render(tile)}</td>)}
                </tr>)              
                }
                </tbody>
            </table>
           <Button onClick={drawTheCave} text='Light' />
        </div>
    )

}

export default Cave