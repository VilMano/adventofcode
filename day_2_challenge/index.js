import fs from 'fs-extra'
import readline from 'readline'

const bag = [{ quantity: 12, colour: "red" }, { quantity: 13, colour: "green" }, { quantity: 14, colour: "blue" }];

async function processLines() {
    const filestream = fs.createReadStream("game_results.txt");

    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity
    });

    let total = 0;
    let totalpt = 0;

    for await (const line of rl) {

        let game = getGameObject(line);
        let validPlay = processGame(game);
        let powerObject = getCubePower(game);
        totalpt += parseInt(powerObject);
        if (validPlay) {
            total += parseInt(game.id);
        }
    }

    console.log('Sum pt1: ', total);
    console.log('Sum pt2: ', totalpt);
}

function getGameObject(line) {
    let gameId = line.split(':')[0].split(' ')[1];
    let gameSets = line.split(':')[1].split(';');
    let cubeColours = [];

    gameSets.forEach(set => {
        let results = set.split(',');
        let colours = [];
        results.forEach(cube => {
            colours.push({ quantity: cube.split(' ')[1], colour: cube.split(' ')[2] })
        });
        cubeColours.push(colours)
    });

    return {
        id: gameId,
        gameSets: gameSets,
        cubeColours: cubeColours
    };
}

function getCubePower(game) {
    let cubeColours = game.cubeColours;

    let redCubes = 0;
    let greenCubes = 0;
    let blueCubes = 0;

    cubeColours.forEach(sets => {
        sets.forEach(cube => {
            let cubequantity = parseInt(cube.quantity);
            switch (cube.colour) {
                case "red":
                    redCubes = cubequantity > redCubes ? cubequantity : redCubes;
                    break;
                case "green":
                    greenCubes = parseInt(cubequantity) > parseInt(greenCubes) ? cubequantity : greenCubes;
                    break;
                case "blue":
                    blueCubes = cubequantity > blueCubes ? cubequantity : blueCubes;
                    break;
                default:
                    break;
            }
        });

    });
    let values = [];
    
    // im so glad there's no more than 3 colours
    redCubes == 0 ? 0 : values.push(redCubes);
    greenCubes == 0 ? 0 : values.push(greenCubes);
    blueCubes == 0 ? 0 : values.push(blueCubes);
    
    let total = 1;
    values.forEach(n => {
        total *= n;
    })

    return total;
}

function processGame(game) {
    let validPlay = true;
    game.cubeColours.forEach(play => {
        play.forEach(cube => {
            switch (cube.colour) {
                case "red":
                    if (bag[0].quantity < cube.quantity) {
                        validPlay = false;
                        break;
                    }
                    break;
                case "blue":
                    if (bag[2].quantity < cube.quantity) {
                        validPlay = false;
                        break;
                    }
                    break;
                case "green":
                    if (bag[1].quantity < cube.quantity) {
                        validPlay = false;
                        break;
                    }
                    break;
                default:
                    validPlay = false;
                    console.error('Invalid colour !!!')
            }

        });

        if (!validPlay) {
            return;
        }
    });

    return validPlay;
}


processLines();

