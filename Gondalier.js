// imports init
Discord = require('discord.js');
client = new Discord.Client();
logger = require('winston');

// data init

botdire = require('./data/botdire.json')
reminder = require('./data/reminder.json')

// node.js init

fs = require('fs')
ffmpeg = require('ffmpeg-static');
glob = require('glob');
path = require('path')

// setup init

auth = require('./setup/auth.json');
config = require('./setup/botconfig.json')

// commands init

commands = {}
commands['paninis'] = require('./commands/paninis.js')
commands['prefix'] = require('./commands/prefix.js')
commands['help'] = require('./commands/help.js')
commands['suggest'] = require('./commands/suggest.js')
commands['queue'] = require('./commands/queue.js')
commands['vote'] = require('./commands/vote.js')
commands['dice'] = require('./commands/dice.js')
commands['remind'] = require('./commands/remind.js')

// server init

glob.sync('./server/*.js').forEach(function(file) {
	require(path.resolve(file));
});

// configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// initialize Discord bot

client.on('ready', () => {
	client.user.setActivity('the master race', {
		type: 5
	});
	console.log('Successfully logged in.');
});

bot = botdire.bot;
client.login(auth.token);

// image init

gondalierIcon = 'https://media.discordapp.net/attachments/713792176894509076/787196361728458762/gondolaicon.png'
icIcon = 'https://media.discordapp.net/attachments/713792176894509076/787195608678531092/image0.png'
gondGitIcon = 'https://media.discordapp.net/attachments/713792176894509076/787196357151686656/gondolagit.png'

// schedule alert

times = require('./times.js')
schedule = require('./schedule.js')

// vote init

t = [0, 0, 0]

// schedule interval

setInterval(() => {
	var rTime = new Date();

	schedule(rTime)

	var rChat = client.channels.cache.get(reminder.channel);
	if (reminder.isActive === true) {
		if (rTime.getHours() == reminder.hour && rTime.getMinutes() == reminder.minute && rTime.getSeconds() == 0) {
			rChat.send(`<@${reminder.user}>, your reminder **${reminder.event}** has started`);
			rJSON = {
				"channel": "",
				"user": "",
				"hour": "",
				"minute": "",
				"event": "",
				"isActive": false
			}
			rData = JSON.stringify(rJSON, null, 2)
			fs.writeFileSync('./data/reminder.json', rData)
		} else {
			return;
		}
	}
}, 1000);

client.on('message', msg => {

	p = config.prefix;

	// command type functions

	function newCommand(name, func) {
		if (msg.content.startsWith(`${p}` + name)) {
			commands[func](msg)
		}
	}

	function newIncludes(string, func) {
		if (msg.content.includes(string)) {
			commands[func](msg)
		}
	}




	// general commands




	newCommand('paninis', 'paninis') // test for bot
	newIncludes('<@!643515430287310868>', 'prefix') // ask for prefix
	newCommand('h', 'help') // help menu
	newCommand('s ', 'suggest') // suggest for parliament
	newCommand('q', 'queue') // queue for suggestions
	newCommand('v ', 'vote') // voting for suggestions
	newCommand('d', 'dice') // dice rolling / random number generator
	newCommand('r ', 'remind') // reminders

});