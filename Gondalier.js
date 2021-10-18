// imports
Discord = require('discord.js')
Canvas = require('canvas')
client = new Discord.Client()
logger = require('winston')

// data init

botdire = require('./data/botdire.json')
UNITS = require('./data/units.js')

// node.js init

fs = require('fs')
ffmpeg = require('ffmpeg-static')
glob = require('glob')
path = require('path')
Colour = require('color')
Qty = require('js-quantities')
Sentiment = require('sentiment')

// mongoDB init

var {
	MongoClient
} = require('mongodb')
url = require('./setup/url.js')
mongo = new MongoClient(url)

// setup init

auth = require('./setup/auth.json');
config = require('./setup/botconfig.json')

// prefix
p = config.prefix

// commands init

fs.readdir("./commands", (err, files) => {
	if (err) throw new Error(err)
	commands = []

	files.forEach((file) => {
		commands.push(require(`./commands/${file}`))
	})
})

peco = require('./peco.js')
warn = require('./warn.js')

// configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// initialize Discord bot

client.on('ready', () => {
	client.user.setPresence({
		activity: {
			name: 'the game'
		},
		status: 'dnd'
	})
	console.log(`%cSuccessfully logged in.`, 'font-weight: bold; color: lightgreen;');
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

// music init
loop = false
shuffle = false
shuffleP = false
notify = true
notifyP = true
controls_embed = null

// reminder init
Reminders = []

// schedule interval

setInterval(() => {
	var rTime = new Date();

	schedule(rTime)

	for (var i = 0; i < Reminders.length; i++) {
		reminder = Reminders[i]
		var rChat = client.channels.cache.get(reminder.channel);
		if (rTime.getHours() == reminder.hour && rTime.getMinutes() == reminder.minute && rTime.getSeconds() == 0) {
			rChat.send(`<@${reminder.user}>, your reminder **${reminder.event}** has started`);
			Reminders.splice(i, 1)
		} else {
			return;
		}
	}
}, 1000);

client.on('message', msg => {

	if (msg.author.id == '643515430287310868') return

	if (msg.content.startsWith(p)) {
		var env = {
			client: this,
			message: msg,
			args: msg.content
				.substr(p.length)
				.toLowerCase()
				.split(" "),
		}

		// executor
		for (let c of commands) {
			if (c.aliases?.includes(env.args[0])) {
				try {
					c.execute(env)
				} catch (error) {
					msg.channel.send('```' + error + '```')
				}
			}
		}
	}

	if (msg.content === '<@!643515430287310868>' || msg.content === '<@643515430287310868>') {
		msg.channel.send('My prefix is `' + `${p}` + '`, for a list of my commands, do `' + `${p}h` + '`.')
	}

	// personal commands
	peco(msg)
});