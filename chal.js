const readline = require('readline');
const alingtext = require("align-text");
require("colors");
var dep = false;

const rl = readline.createInterface(
{
  input: process.stdin,
  output: process.stdout
});

rl.question('How many storeys do you want to make your tree?', (answer) => 
{
    answer = Number(answer);
    if (isNaN(answer)) {console.log("Please input a number."); return rl.close();}
    generation(answer);
    rl.close();
});

var generation = function(answer, coloredFloor = 1) {
    const baseHeightFloor = 4;
    var character = "*";
    var result = new Array();
    var step = new Array();
    var lastLength;
    for (let floor = 1; floor <= answer; floor++)
    {
        for (let baseFloor = 1; baseFloor <= baseHeightFloor; baseFloor++)
        {
            if (result.length <= 0) 
            {
                if (coloredFloor === baseFloor) result.push(character.repeat(1)["rainbow"]);
                else result.push(character.repeat(1));
                lastLength = 1;
                continue;
            }
            else 
            if (result.length%4 === 0) {
                lastLength = lastLength - 2;
                if (coloredFloor === baseFloor) result.push(character.repeat(lastLength)["rainbow"]);
                else result.push(character.repeat(lastLength));
                continue;
            } 
            else 
            {
                lastLength = lastLength + 2;
                if (baseFloor === coloredFloor) result.push(character.repeat(lastLength)["rainbow"]);
                else result.push(character.repeat(lastLength));
                continue;
            }
        }
    }
    var endLength = lastLength;
    for (let i in result) 
    {
        if ((Number(i) - 1)%4 === 0 && Number(i) !== 1) endLength++;
        result.push(alingtext(result[i], Number(i)%4 === 0 && Number(i) !== 0 ? endLength + 2 : endLength--));
    }
    var numberAnswer = Number(answer);
    var stepCharacter = "|";
    if (!dep) dep = result[result.length - 1].length;
    while (numberAnswer --> 0) {
        step.push(alingtext(stepCharacter.repeat(Number(answer)),  dep / 2 + 1 + answer / 2));
    }
    console.clear();
    console.log(`${result.slice(answer*4).join("\n")}\n${step.join("\n")}`);
    setTimeout(() => {
        generation(answer, coloredFloor++ >= 4 ? 1 : coloredFloor++);
    }, 1000);
};