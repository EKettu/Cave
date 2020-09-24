import shortid from "shortid";

export const createMonsters = (amount, caveSize) => {
    console.log("createMonsters");
    let monsterArray = [];
    while (monsterArray.length < amount) {
        let randomX = Math.floor(Math.random() * (caveSize-1)) + 1;
        let randomY = Math.floor(Math.random() * (caveSize-1)) + 1;
        let monster = {id: shortid.generate(), x: randomX, y: randomY};

        if (monsterArray.some(m => m.x === monster.x && m.y === monster.y)) {
            continue;
        }

        monsterArray.push(monster);
    }
    // console.log(monsterArray)
    return monsterArray;
}

export const moveMonster = (monster, caveSize) => {
    let indexX = monster.x;
    let indexY = monster.y;

    let direction = Math.floor(Math.random() * 3);
    if(direction === 0) {
        if(indexX+1<=caveSize-1) {
            indexX+=1;
        }
    }
    if(direction === 1) {
        if(indexX-1>=0) {
            indexX-=1;
        }
    }
    if(direction === 2) {
        if(indexY+1<=caveSize-1) {
            indexY+=1;
        }
    }
    if(direction === 3) {
        if(indexY-1>=0) {
            indexY-=1;
        }
    }
    monster.x = indexX;
    monster.y = indexY;

    return monster;
}

export const removeMonster = (id, monsters) => {
    const temp = monsters.filter(monster => monster.id !== id);
    monsters = temp;
    return monsters;
}

export const updateMonster = (updatedMonster, monsters) => {
    monsters.map(monster => monster.id === updatedMonster.id ? {...updatedMonster} : monster);
    return monsters;
}

export const monsterMetPlayer = (monsterX, monsterY, playerX, playerY) => {
    if(monsterX === playerX && monsterY === playerY) {
        return true;
    }
    return false;
}