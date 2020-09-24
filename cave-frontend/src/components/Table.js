import React from 'react';
import shortid from "shortid";

const Table = ({table, playerMoves}) => {
    const render = (tile) => {
        if(playerMoves===true) {
            return '';
        }
        return tile.monster? 'M' : (tile.player? 'P' : tile.shadow ? 'S' : '');
    }

    const style = {
        textAlign: 'center',
        backgroundColor: playerMoves ? 'black' : 'white',
        borderColor: playerMoves ? 'white' : 'black'
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
