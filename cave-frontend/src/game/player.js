export const movePlayer = (e, playerLocation, caveSize) => {
    let playerX = playerLocation.x;
    let playerY = playerLocation.y;
    if (e.key === 'w' || e.key === 'ArrowUp') {
        if(playerY-1>=0) {
            playerY -= 1;
        }
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        if(playerX-1>=0) {
            playerX -= 1;
        }
    }
    if (e.key === 'd' || e.key === 'ArrowRight') {
        if(playerX+1<=caveSize-1) {
            playerX += 1;
        }
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
        if(playerY+1<=caveSize-1) {
            playerY += 1;
        }
    }
    const newPlayerLocation = {
        x: playerX,
        y: playerY
    };
    
    return newPlayerLocation;
}

export const didThePlayerWin = (monsterCount) => {
    if (monsterCount === 0) {
        return true;
    }
    return false;
}