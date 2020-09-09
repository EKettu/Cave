import shortid from "shortid";

export const createMonsters = (amount, caveSize) => {
    console.log("createMonsters");
    let monsterArray = [];
    while (monsterArray.length < amount) {
        let randomX = Math.floor(Math.random() * (caveSize-1)) + 1;
        let randomY = Math.floor(Math.random() * (caveSize-1)) + 1;
        var monster = {id: shortid.generate(), x: randomX, y: randomY};

        if (monsterArray.some(m => m.x === monster.x && m.y === monster.y)) {
            continue;
        }

        monsterArray.push(monster);
    }
    // console.log(monsterArray)
    return monsterArray;
}
