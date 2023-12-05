import fs from 'fs-extra'
import readline from 'readline'

const bag = [{ quantity: 12, colour: "red"}, {quantity: 13, colour: "green"},{ quantity: 14, colour: "blue" }];

async function processLines() {
    const filestream = fs.createReadStream("game_results.txt");

    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity
    });

    let total = 0;

    for await (const line of rl) {
        let game = getGameObject(line);

        let validPlay = processGame(game);
        if(validPlay)
            total += parseInt(game.id);
    }

    console.log('Sum: ',total);
}

function getGameObject(line){
    let gameId = line.split(':')[0].split(' ')[1];
    let gameSets = line.split(':')[1].split(';');
    let cubeColours = [];

    gameSets.forEach(set => {
        let results = set.split(',');
        results.forEach(cube => {
            cubeColours.push({ quantity: cube.split(' ')[1], colour: cube.split(' ')[2] })
        });
    });

    return {
        id: gameId,
        gameSets: gameSets,
        cubeColours: cubeColours
    };
}

function processGame(game){
    let validPlay = true;
    game.cubeColours.forEach(play => {
        switch(play.colour){
            case "red":
                if(bag[0].quantity < play.quantity){
                    validPlay = false;
                    break;
                }
                break;
            case "blue":
                if(bag[2].quantity < play.quantity){
                    validPlay = false;
                    break;
                }
                break;
            case "green":
                if(bag[1].quantity < play.quantity){
                    validPlay = false;
                    break;
                }
                break;
            default:
                validPlay = false;
                console.error('Invalid colour !!!')
        }

        if(!validPlay){
            return;
        }
    });

    return validPlay;
}


processLines();

