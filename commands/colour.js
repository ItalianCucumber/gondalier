module.exports = {
	aliases: ['c', 'colour', 'color'],
	description: 'View the colour inserted and the different forms of the colour',
	example: `${p}c <colour>`,
	async execute(env) {
		env.args.shift()
		const msg = env.message
		const args = env.args

		var colourC = Colour(args[0])
		var colourM = args[0];

		var canvasSize = 250

		const canvas = Canvas.createCanvas(canvasSize, canvasSize);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = colourM
		ctx.fillRect(0, 0, canvasSize, canvasSize);

		var attachment = new Discord.MessageAttachment(canvas.toBuffer(), '../colourP.png');

		const embed = new Discord.MessageEmbed()
			.setColor(colourM)
			.setTitle(colourM)
			.setDescription('Here is a colour')
			//.setThumbnail(attachment)
			.addFields({
				name: 'Hex',
				value: colourC.hex()
			}, {
				name: 'RGB',
				value: colourC.rgb().string()
			}, {
				name: 'HSL',
				value: colourC.hsl().round().string()
			}, {
				name: 'CMYK',
				value: colourC.cmyk().round().string()
			})
		msg.channel.send(embed)
		msg.channel.send(attachment)
	}
}