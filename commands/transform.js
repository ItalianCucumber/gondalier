module.exports = {
	aliases: ['t', 'transform', 'convert'],
	description: 'Converts different systems of measurement into another',
	example: `..t f c 72`,
	async execute(env) {
		env.args.shift()
		const msg = env.message
		const args = msg.content.substr(4).split(" ")

		const unitFrom = Qty(Number(args[2]), args[0])
		const unitTo = Qty(args[1])
		const quantity = args[2]

		if (!unitFrom.isCompatible(unitTo)) {
			msg.channel.send(warn('Your units must be compatible!'))
		} else {

			unitFrom.to(unitTo);

			fullUnit = ''
			for (var i = 0; i < unitTo.numerator.length; i++) {
				var namesArray = UNITS[unitTo.numerator[i]][0]
				if (namesArray.length >= 3) {
					fullUnit += namesArray[2]
				} else {
					fullUnit += namesArray[namesArray.length - 1]
				}
			}

			const embed = new Discord.MessageEmbed()
				.setColor('#c368ee')
				.setTitle(`${Number(unitFrom._conversionCache[unitTo._units].scalar.toFixed(2))} ${fullUnit}`)
				.setDescription(`${quantity} ${unitFrom._units} = ${Number(unitFrom._conversionCache[unitTo._units].scalar.toFixed(6))} ${unitTo._units}`)
			msg.channel.send(embed)
			//msg.channel.send(`${quantity} ${unitFrom.name} = ${conv} ${unitTo.name}`)
		}
	}
}