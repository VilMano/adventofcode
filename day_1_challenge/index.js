import fs from 'fs-extra';
import readline from 'readline';

async function processLines() {
    const filestream = fs.createReadStream("calibration_values.txt");

    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity
    });

    let sum = 0;
    
    for await (const line of rl) {
        const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const WRITTENUMBERS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

        let writtenNumbersInLine = [];
        
        // array will be automatically sorted 
        WRITTENUMBERS.forEach((number, i) => {
            if(line.includes(number)){
                writtenNumbersInLine.push({ number: NUMBERS[i], pos: { first: line.indexOf(number), last: line.lastIndexOf(number) } });
            }
        });

        let lineChars = line.split(''); 

        // array will already be with the proper sorting
        let numbersArr = [];
        lineChars.forEach((char, i) => {
            if(NUMBERS.includes(parseInt(char))){
                numbersArr.push({ number: parseInt(char), pos: { first: line.indexOf(char), last: line.lastIndexOf(char) }});
            }
        });

        let firstNumber = parseInt(numbersArr[0].number);
        let lastNumber = parseInt(numbersArr[numbersArr.length-1].number);

        if(writtenNumbersInLine.length > 0){
            let firstPosition = numbersArr[0].pos.first;
            let lastPosition = numbersArr[numbersArr.length-1].pos.last;

            writtenNumbersInLine.forEach(number => {
                lastPosition = number.pos.last > lastPosition ? number.pos.last : lastPosition;
                firstPosition = number.pos.first < firstPosition ? number.pos.first : firstPosition;
            })
    
            if(numbersArr[0].pos.first > firstPosition){
                firstNumber = writtenNumbersInLine.filter(n => n.pos.first == firstPosition)[0].number;
            }
    
            if(numbersArr[numbersArr.length-1].pos.last < lastPosition){
                lastNumber = writtenNumbersInLine.filter(n => n.pos.last == lastPosition)[0].number;
            }
        }

        let lineResult = (firstNumber * 10) + lastNumber;
        sum += lineResult;
    }

    console.log("Sum: ", sum)
}

await processLines();