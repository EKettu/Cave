const create2dArray = (rows, columns) => [...Array(rows).keys()].map(i => Array(columns));

export const createCave = (playerX, playerY, shadowX, shadowY, caveSize, monsters) => {
    console.log("create the cave");
    let tiles = create2dArray(caveSize, caveSize);
    let keyIndex = 1;
    for (let i = 0; i < caveSize; i++) {
        for (let j = 0; j < caveSize; j++) {
            const tile = {key: keyIndex, x: i, y: j, player: false, monster: false, shadow: false};
            for (let index = 0; index < monsters.length; index++) {
                let monster = monsters[index];
                if(monster.y===i && monster.x===j) {
                    tile.monster = true;
                }
            }
            tiles[i][j] = tile;
            keyIndex++;
        }           
    }
    tiles[playerY][playerX].player = true;
    tiles[shadowY][shadowX].shadow = true;
    return tiles;
}