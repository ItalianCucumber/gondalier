module.exports = {
	aliases: ['r', 'remind', 'reminder'],
	description: 'Sets a reminder for a certain time and event, will tag the user in the activated channel when ready',
	example: `${p}r <hours(24h format)>:<minutes> <event>`,
	async execute(env) {
		const msg = env.message
		// honestly, i probably copied these directly from stack overflow, i have no idea what these even do...
		content = msg.content.replace(/  +/g, ' ')
		let rEvent = content.substring(content.indexOf(' ', content.indexOf(' ') + 1) + 1, content.length + 1)

		function Reminder(channelId, userId, hour, minute, eventName) {
			this.channel = channelId
			this.user = userId
			this.hour = hour
			this.minute = minute
			this.event = eventName
		}

		let messageArray = content.split(' ', 2) // separates the ..r from the message content

		timeUnit = messageArray[1] // unformatted time ####
		timeInterval = 24

		// check: properly dividing hours and minutes
		if (timeUnit.includes(':') === true) {
			timeInterval = timeUnit.split(':') // ##:## => "##", "##"
		} else if (timeUnit.includes('.') === true) {
			timeInterval = timeUnit.split('.') // ##.## => "##", "##"
		} else if (timeUnit.includes('：') === true) {
			timeInterval = timeUnit.split('：') // ##：## => "##", "##"
		} else {
			msg.channel.send("Sorry, but the time format you have entered is not recognizable. Please retry with one of the accepted dividers, `:`, `.` or `：`")
			return
		}

		// array nonsense to comprehensible terms &&& check: time is a decimal
		var hour = Math.round(timeInterval[0])
		var minute = Math.round(timeInterval[1])

		// check: incorrect hour input
		if (hour < 0 || hour > 23) {
			msg.channel.send('The hours you have entered are not recognizable. Remember this command uses 24 hour time `0:00 - 23:59`')
			return
		}

		// check: incorrect minute input
		if (minute < 0 || minute > 59) {
			msg.channel.send('The minutes you have entered are not recognizable. Please enter a number between 0 and 59.')
			return
		}

		// check: adding 0 if hour is one digit
		if (hour.length == 1) {
			hour = '0' + hour
		} else if (hour == 0) {
			hour = '00'
		}

		// check: adding 0 if minute is one digit
		if (minute.length == 1) {
			minute = '0' + minute
		} else if (minute == 0) {
			minute = '00'
		}

		// formatting variables for json
		rChannel = msg.channel.id
		rUser = msg.author.id
		rHour = hour
		rMinute = minute
		const rem = new Reminder(rChannel, rUser, rHour, rMinute, rEvent)

		for (var i = 0; i < Reminders.length; i++) {
			j = Reminders[i]
			if (rem.user === j.user) {
				msg.channel.send(`Overwriting reminder **${j.event}** set for ${j.hour}:${j.minute}...`)
				Reminders.splice(i, 1)
			}
		}
		Reminders.push(new Reminder(rChannel, rUser, rHour, rMinute, rEvent))
		msg.channel.send(`Your reminder **${rEvent}** has been set for ${rHour}:${rMinute}.`) // send message
	}
}