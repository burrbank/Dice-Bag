const discord = require("discord.js");
const config = require("./config");

const client = new discord.Client();
const dicepat = /(\d+)d(\d+)/;


function add(a, b){
    // simple add function for use in reduce later
    return a + b;
}

function rollDice(n, d){
    //return result of n, d sided dice
    var rolls = [];
    for(i = 0; i < n; i++){
        rolls.push(Math.floor(d*Math.random()+1));
    }
    return rolls;
}

client.on('ready', () => {
    // bot start measage
    console.log(`logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    //message handling
    if (! msg.content.startsWith(config.mod)) {
        //test for leading ! if not exit
        return;
    }

    if (dicepat.test(msg.content)) {
        //if entry in xdy format then roll that die roll
        var dicematch = dicepat.exec(msg.content)
        var results = rollDice(dicematch[1], dicematch[2])
        msg.reply(`${results.reduce(add, 0)} [${results}]`);
        return;
    }
});

client.login(config.token);