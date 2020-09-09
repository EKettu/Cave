export const movePlayer = (e, playerLocation, caveSize) => {
    let playerX = playerLocation.x;
    let playerY = playerLocation.y;
    if (e.key==='w') {
        if(playerX-1>=0) {
            playerX -= 1;
        }
    }
    if (e.key==='a') {
        if(playerY-1>=0) {
            playerY -= 1;
        }
    }
    if (e.key==='d') {
        if(playerY+1<=caveSize-1) {
            playerY += 1;
        }
    }
    if (e.key==='s') {
        if(playerX+1<=caveSize-1) {
        playerX += 1;
        }
    }
    const newPlayerLocation = {
        x: playerX,
        y: playerY
    };
    
    return newPlayerLocation
}