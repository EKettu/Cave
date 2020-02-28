import React, { useState } from 'react'


const Cave = ({}) => {

    const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns))

    const caveSize = 4

    var playerCurrentX = 0
    var playerCurrentY = 0

    const playerMove = (e) =>{
        if (e.key==='w') {
            if(playerCurrentY-1>=0) {
                setPlayer(playerCurrentX, playerCurrentY, playerCurrentX, playerCurrentY - 1)
                playerCurrentY = playerCurrentY-1
            }
        }
        if (e.key==='a') {
            if(playerCurrentX-1>=0) {
                setPlayer(playerCurrentX, playerCurrentY, playerCurrentX - 1, playerCurrentY)
                playerCurrentX = playerCurrentX-1

            }
        }
        if (e.key==='d') {
            // console.log("d pressed")
            // console.log(playerCurrentX+1)
            if(playerCurrentX+1<=caveSize-1) {
                // console.log("player moves")
                setPlayer(playerCurrentX, playerCurrentY, playerCurrentX + 1, playerCurrentY)
                playerCurrentX = playerCurrentX+1
            }
        }
        if (e.key==='s') {
            if(playerCurrentY+1<=caveSize-1) {
                setPlayer(playerCurrentX, playerCurrentY, playerCurrentX, playerCurrentY + 1)
                playerCurrentY = playerCurrentY+1
            }
        }
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
        for (let i = 0; i < caveSize; i++) {
            for (let j = 0; j < caveSize; j++) {
                const tile = {x: i, y: j, player: false, monster: false}
                tiles[i][j] = tile
            
            }           
        }
        tiles[0][0].player = true
        tiles = addMonsters(tiles, 2, caveSize)
        return tiles
    }

    const [cave, setCave] = useState(createTheCave())

    // console.log("first cave")
    // console.log(cave)

    const setPlayer = (playerCurrentX, playerCurrentY, playerNewX, playerNewY) => {
        const newCave = {...cave}
        newCave[playerCurrentX][playerCurrentY].player = false
        newCave[playerNewX][playerNewY].player = true
        // console.log("new Cave")
        // console.log(newCave)
        setCave(newCave)
    }

    const setMonster = (monsterCurrentX, monsterCurrentY, monsterNewX, monsterNewY) => {
        const newCave = {...cave}
        newCave[monsterCurrentX][monsterCurrentY].monster = false
        newCave[monsterNewX][monsterNewY].monster = true
        setCave(newCave)
    }

    // const moveMonsters = () => {
    //     const newCave = {...cave}
    //     var previousMonsters = new Set()
    //     for (let i = 0; i < caveSize; i++) {
    //         for (let j = 0; j < caveSize; j++) {
    //             if(newCave[i][j].monster==true) {
                    
    //                 var direction = Math.floor(Math.random() * 3);
    //                 if(direction== 0) {
    //                     newCave[i][j].monster==false
    //                 }
    //                 if(direction== 1) {
                        
    //                 }
    //                 if(direction== 2) {
                        
    //                 }
    //                 if(direction== 3) {
                        
    //                 }
    //                 previousMonsters.add(newCave[i][j])
    //             }
            
    //         }           
    //     }
        
    // }

    // console.log("here")
    // console.log(cave)



    const render = (tile) => {
        return tile.player ? 'P': (tile.monster ? 'M' : '')
    }


    return ( 
        <table>
            <tbody>
                {cave.map(row => 
                <tr> {row.map(tile => 
                        <td>{render(tile)}</td>)
                    }
                </tr>)              
                }
            </tbody>
        </table>

    )

}

export default Cave