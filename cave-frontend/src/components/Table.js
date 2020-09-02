import React from 'react'
import shortid from "shortid"

const Table = ({table, playerMoves}) => {
    const render = (tile) => {
        if(playerMoves) {
            return ''
        }
        return tile.player ? 'P': (tile.monster ? 'M' : '')
    }

    return (
        <table key= {shortid.generate()} className = "CaveTable">
            <tbody key = {shortid.generate()}>
            {table.map(row => 
            <tr key = {shortid.generate()}>{row.map(tile => 
                    <td key={tile.key}>{render(tile)}</td>)}
            </tr>)              
            }
            </tbody>
        </table>
    )
}

export default Table
