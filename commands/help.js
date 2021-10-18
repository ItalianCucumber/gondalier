module.exports = {
	aliases: ['h', 'help'],
	description: 'Displays menu of commands that users can utilize',
	example: `${p}h [<page>|<command>]`,
	async execute(env) {
		const msg = env.message
		const args = env.args

		if (isNaN(args[1]) == false) {
			var page = args[1]
			console.log(page)
		} else {
			var page = 1
		}

		var embed = new Discord.MessageEmbed()
			.setColor('#c368ee')
			.setTitle('Gondalier Commands')
			.setURL('https://github.com/ItalianCucumber/Gondalier')
			.setAuthor('ItalianCucumber', icIcon, 'https://github.com/ItalianCucumber')
			.setDescription('For those in need of help')
			.setThumbnail(gondalierIcon)
			.setTimestamp()
			.setFooter(`Gondalier Help Page ${page} • Creato da ItalianCucumber`, gondGitIcon)

		for (var i = (6 * (page - 1));
			(6 * page) <= commands.length ? i < (6 * page) : i < commands.length; i++) {
			if (commands[i].aliases) {
				embed.addFields({
					name: '**' + p + commands[i]?.aliases[0] + '**',
					value: `${commands[i]?.description}`,
					inline: true
				})
			}
		}

		for (let c of commands) {
			if (c?.aliases.includes(args[1])) {
				aliasesString = ''
				for (var i = 0; i < c.aliases.length; i++) {
					aliasesString = aliasesString + c.aliases[i]
					if (i == c.aliases.length - 1) {
						break
					} else {
						aliasesString = aliasesString + ', '
					}
				}

				embed = new Discord.MessageEmbed()
					.setColor('#c368ee')
					.setTitle(`${p}${c.aliases[0]}`)
					.setDescription(`${c.description}`)
					.addFields({
						name: 'Aliases:',
						value: aliasesString
					}, {
						name: 'Example:',
						value: `\`${c.example}\``
					})
				break
			}
		}

		msg.channel.send(embed)
	}
}