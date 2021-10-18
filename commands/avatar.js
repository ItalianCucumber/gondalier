module.exports = {
	aliases: ['a', 'avatar'],
	description: 'Finds the avatar of someone else and sends it', // add here a description of the command
	example: `${p}a [@Someone#0000|000000000000000000]`, // display here an example of the code in use
	async execute(env) {
		env.args.shift()
		const msg = env.message
		const args = env.args

		function getUserFromMention(mention) {
			if (!mention) return

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1)

				if (mention.startsWith('!')) {
					mention = mention.slice(1)
				}

				console.log(mention)

				return client.users.cache.get(mention)
			}

			if (isNaN(mention) == false) {
				return client.users.cache.get(mention)
			}
		}


		if (args[0]) {
			user = getUserFromMention(args[0])
		} else {
			user = msg.author
		}

		url = user.avatarURL()

		const embed = new Discord.MessageEmbed()
			.setColor('#c368ee')
			.setTitle(`${user.username}'s Avatar`)
			.setDescription(`Choose from the sizes below or copy the image.\n[128](${url + '?size=128'}) | [256](${url + '?size=256'}) | [512](${url + '?size=512'}) | [1024](${url + '?size=1024'})`)
			.setImage(url)

		msg.channel.send(embed)
	}
}