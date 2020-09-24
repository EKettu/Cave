export const moveShadow = (shadowLocation, caveSize) => {
    let shadowX = shadowLocation.x;
    let shadowY = shadowLocation.y;

    let direction = Math.floor(Math.random() * 3);
    if (direction === 0) {
        if(shadowX-1>=0) {
            shadowX -= 1;
        }
    }
    if (direction === 1) {
        if(shadowY-1>=0) {
            shadowY -= 1;
        }
    }
    if (direction === 2) {
        if(shadowY+1<=caveSize-1) {
            shadowY += 1;
        }
    }
    if (direction === 3) {
        if(shadowX+1<=caveSize-1) {
        shadowX += 1;
        }
    }
    const newShadowLocation = {
        x: shadowX,
        y: shadowY
    };
    
    return newShadowLocation;
}