import React from 'react';
import shortid from "shortid";
import playerPic from '../images/player.png';
import shadowPic from '../images/shadow.png';
import monsterPic from '../images/monster.png';

const Table = ({table, playerMoves, playerLost}) => {

    const render = (tile) => {
        if(playerMoves===true) {
            return '';
        }
        if(playerLost === true) {
            return tile.monster? <img src = {monsterPic} alt = 'Monster' /> : (
            tile.shadow ? <img src = {shadowPic} alt = 'Shadow' /> : '');
        }
        return tile.monster? <img src = {monsterPic} alt = 'Monster' /> : (tile.player? <img src = {playerPic} alt = 'Player' /> : 
            tile.shadow ? <img src = {shadowPic} alt = 'Shadow' /> : '');
    }

    const style = {
        textAlign: 'center',
        backgroundColor: playerMoves ? 'black' : '#181818',
        borderColor: playerMoves ? 'black' : '#181818'
    }

    return (
        <table key= {shortid.generate()} className = "CaveTable">
            <tbody key = {shortid.generate()}>
            {table.map(row => 
            <tr key = {shortid.generate()}>{row.map(tile => 
                    <td style={style} key={tile.key}>{render(tile)}</td>)}
            </tr>)              
            }
            </tbody>
        </table>
    );
}

export default Table;
