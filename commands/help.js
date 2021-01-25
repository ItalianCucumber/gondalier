function help(msg) {
	const embed = new Discord.MessageEmbed()
		.setColor('#c368ee')
		.setTitle('Gondalier Settings')
		.setURL('https://github.com/ItalianCucumber/Gondalier')
		.setAuthor('ItalianCucumber', icIcon, 'https://github.com/ItalianCucumber')
		.setDescription('For those in need of help')
		.setThumbnail(gondalierIcon)
		.addFields({
			name: '\u200B',
			value: '\u200B'
		}, {
			name: `${p}s`,
			value: `Creates a new suggestion for the parliament\n\`${p}s <suggestion>\``,
			inline: true
		}, {
			name: `${p}q`,
			value: `Shows the queue of suggestions\n\`${p}q\``,
			inline: true
		}, {
			name: '\u200B',
			value: '\u200B'
		}, {
			name: `${p}v`,
			value: `Vote for a suggestion in the queue, yes, no, veto and pass respectively\n\`${p}v <code> -y/-n/-v/-p\``,
			inline: true
		}, {
			name: `${p}d`,
			value: `Rolls a random number from 1 to the inserted value or from a floor to the inserted value\n\`${p}d <number> / ${p}d <floor> <number> \``,
			inline: true
		}, {
			name: '\u200B',
			value: '\u200B'
		}, {
			name: `${p}r`,
			value: `Sets a reminder for a certain time and event, will tag the user in the activated channel when ready\n\`${p}r <hours(24h format)>:<minutes> <event>\``,
			inline: true
		})
		.setTimestamp()
		.setFooter('Gondalier Settings Page 1 • Creato da ItalianCucumber', gondGitIcon)
	msg.channel.send(embed)
}

module.exports = help