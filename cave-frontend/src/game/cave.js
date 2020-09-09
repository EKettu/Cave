const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns));

export const createCave = (playerX, playerY, caveSize, monsters) => {
    console.log("create the cave");
    var tiles = create2dArray(4, 4);
    var keyIndex = 1;
    for (let i = 0; i < caveSize; i++) {
        for (let j = 0; j < caveSize; j++) {
            const tile = {key: keyIndex, x: i, y: j, player: false, monster: false};
            for (let index = 0; index < monsters.length; index++) {
                let monster = monsters[index];
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