import React, { useState } from 'react'
import Button from './Button'

// const Display = (props) => (
//     <div>
//     <table>
//         <tbody>
//             {props.cave.map(row => 
//             <tr>{row.map(tile => 
//                     <td>{props.render(tile)}</td>)}
//             </tr>)              
//             }
//         </tbody>
// </table>
// </div>
// )

const Cave = ({}) => {

    const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns))

    const caveSize = 4

    const [playerPreviousX, setPreviousX] = useState(0)
    const [playerPreviousY, setPreviousY] = useState(0)
    const [playerCurrentX, setCurrentX] = useState(0)
    const [playerCurrentY, setCurrentY] = useState(0)

    const [monsterCount, setMonsterCount] = useState(2)
    const [lightLeft, setLight] = useState(10)
    

    const playerMove = (e) =>{
        var playerX = playerPreviousX
        var playerY = playerPreviousY
        if (e.key==='w') {
            if(playerX-1>=0) {
                playerX -= 1
                setCurrentX(playerX)
            }
        }
        if (e.key==='a') {
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
        var i = 1
        while (i<=number) {
            var randomX = Math.floor(Math.random() * caveSize-1) + 1;
            var randomY = Math.floor(Math.random() * caveSize-1) + 1;
            tiles[randomX][randomY].monster = true
            i++;
        }
        return tiles
    }

    const createTheCave = () => {
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
        var previousMonsters = new Set()
        for (let i = 0; i < caveSize; i++) {
            for (let j = 0; j < caveSize; j++) {
                if(!previousMonsters.has(newCave[i][j])) {
                    if(newCave[i][j].monster==true) {
                        var indexX = i
                        var indexY = j
                        var direction = Math.floor(Math.random() * 3);
                        newCave[i][j].monster=false
                        if(direction== 0) {
                            if(indexX+1<=caveSize-1) {
                                indexX+=1
                            }
                        }
                        if(direction== 1) {
                            if(indexX-1>=0) {
                                indexX-=1
                            }
                        }
                        if(direction== 2) {
                            if(indexY+1<=caveSize-1) {
                                indexY+=1
                            }
                        }
                        if(direction== 3) {
                            if(indexY-1>=0) {
                                indexY-=1
                            }
                        }
                        const tile = newCave[indexX][indexY]
                        // console.log("tile is ")
                        // console.log(tile)
                        newCave[indexX][indexY].monster = true
                        if(!didTheMonsterDie(tile)) {
                            // console.log("monster did not die")
                            previousMonsters.add(tile)
                            // console.log(previousMonsters)
                        }
                        else {
                            // console.log("MONSTER DIED!!!!!!!!!!!!!!!!!!!!!!!!!!")
                            newCave[indexX][indexY].monster = false
                            setMonsterCount(monsterCount - 1)
                            if(didThePlayerWin(monsterCount)) {
                                stopTheGame()
                            }
                            
                        }
                    }
                }
            }           
        }
        
    }

    const didTheMonsterDie = (tile) => {
        if(tile.x === playerCurrentX && tile.y ===playerCurrentY && tile.monster === true) {
        // if(tile.player === true && tile.monster === true) {
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
        // console.log("in render")
        // console.log(cave)
        // console.log(tile)
        return tile.player ? 'P': (tile.monster ? 'M' : '')
    }

    const drawTheCave = () => {
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
           {/* <Display cave={cave} render={render()} /> */}
           <Button onClick={drawTheCave} text='Light' />
        </div>
    )

}

export default Cave