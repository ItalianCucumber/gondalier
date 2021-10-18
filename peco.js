function peco(msg) {
	let p = config.prefix;
	let messageArray = msg.content.split(" ");

	// Dad joke
	var imArray = ['im ', "i'm ", "i am ", "i‘m ", "i’m "];
	let includesIm = false;
	for (let v of imArray) {
		if (msg.content.slice(0, 5).toLowerCase().includes(v)) {
			includesIm = true;
			var joke = msg.content.toLowerCase().split(v);
			break;
		}
	};
	if (includesIm) {
		var rand = Math.round(Math.random() * 4);
		if (rand >= 2) {
			msg.channel.send('Hello ' + joke.slice(1, -1) + joke.slice(-1) + ", I'm Dad.");
		} else {
			return;
		}
	}
	// More Dad jokes
	if (messageArray[0].toLowerCase() === "i''m") {
		msg.delete();
		msg.channel.send("Don't want to be publicly stupid, I got you.");
	}
	// Ability to talk through the bot, identified
	if (messageArray[0] === `${p}dire`) {
		msg.delete();
		msg.reply('it is sent!')
		let dialogue = msg.content.slice(7, -1) + msg.content.slice(-1);
		client.channels.cache.get(bot).send('<@' + msg.author.id + '>' + ' says ' + dialogue);
	}
	/*// Ability to talk through the bot, anonymously
	if (msg.content.slice(0, 5) === `${p}bd `) {
		msg.delete();
		msg.reply('it is sent!')
		let dialogue = msg.content.slice(5, -1) + msg.content.slice(-1);
		client.channels.cache.get(bot).send(dialogue);
	}
	if (messageArray[0] === `${p}sbotr`) {
		msg.delete();
		let botContent = {
			"bot": msg.channel.id
		};
		let botData = JSON.stringify(botContent, null, 2)
		fs.writeFileSync('botdire.json', botData)
	}*/
	if (msg.channel.id === '809385599165005876' && msg.author.id !== '643515430287310868') {
		let botContent = {
			"bot": msg.content
		}
		let botData = JSON.stringify(botContent, null, 2)
		fs.writeFileSync('./data/botdire.json', botData)
		msg.reply('channel is set!')
	}
	if (msg.channel.id === '809385537823440896' && msg.author.id !== '643515430287310868') {
		client.channels.cache.get(bot).send(msg.content)
		msg.reply('message is sent!')
	}
	// 30 Sauce Garden
	if (messageArray[0] === ('?sauce')) {
		msg.channel.send('Excuse me, but would you mind to shut up?')
		/* if (sauce < 30) {
		    msg.channel.send('?sauce')
		    sauce = sauce + 1;
		} else {
		    msg.channel.send('The garden of sauce has been grown')
		    sauce = 0
		} */
	}
	// Spread the love
	var loveArray = ['love you', 'love ya', 'love u', 'ti amo', 'ti voglio bene', 'te amo', 'te quiero', '爱你', '大好き', 'ich liebe dich']
	var valArray = ['val', 'valentino', 'gondalier', 'gondolier', '<@!643515430287310868>']

	let includesLove = false;
	let includesVal = false;
	for (let v of loveArray) {
		if (msg.content.toLowerCase().includes(v)) {
			includesLove = true;
			break;
		}
	};
	for (let v of valArray) {
		if (msg.content.toLowerCase().includes(v)) {
			includesVal = true;
			break;
		}
	};
	if (includesLove && includesVal) {
		msg.channel.send('Love you too, <@' + msg.author.id + '>');
	}
	// Spread the thanks
	var thanksArray = ['thank you', 'tank you', 'thanks', 'thanks you', 'thank u', 'graces', 'grazie', 'la ringrazio', 'gracias', '谢谢', '多谢你', 'ありがとう', 'danke']

	let includesThanks = false;
	for (let v of thanksArray) {
		if (msg.content.toLowerCase().includes(v)) {
			includesThanks = true;
			break;
		}
	};
	for (let v of valArray) {
		if (msg.content.toLowerCase().includes(v)) {
			includesVal = true;
			break;
		}
	};
	if (includesThanks && includesVal) {
		msg.channel.send('You\'re welcome, <@' + msg.author.id + '> :)');
	}

	// Face :)
	var facesArray = [
		['>:)', ':)', '^-^', '^~^', ':D', '>.<', ';)', ';D', ':P'], /* positive */
		['+-+', '>-<', '>~<', ':/', ':O', '0_o', 'o_0', ':|', ':P'], /* neutral */
		['>:(', ':(', '=_=', 'T_T', ';-;', ':\'(', '(╯°□°）╯︵ ┻━┻'] /* negative */
	]

	var sentiment = new Sentiment()
	var result = sentiment.analyze(msg.content)

	qtyEmo = Math.abs(result.score)
	if (qtyEmo > 20) {
		emoMax = qtyEmo
	} else {
		emoMax = 20
	}

	emotionChance = Math.floor((Math.random() * emoMax) + 1)

	if (emotionChance < qtyEmo) {
		if (result.score > 1) {
			emotion = 0
		} else if (result.score < -1) {
			emotion = 2
		} else {
			emotion = 1
		}

		faceEmo = facesArray[emotion]

		w = Math.floor((Math.random() * faceEmo.length))

		if (msg.content.indexOf('?') > -1) {
			msg.channel.send("¯\\_(ツ)_/¯")
		} else {
			msg.channel.send(faceEmo[w])
		}
	}

	// Ara Ara
	if (msg.content.slice(0, 34) === 'gondalier can also be anime themed') {
		msg.channel.send("ara ara desu-kun omae shamo winderu ony-chan or something")
	}
}

module.exports = peco