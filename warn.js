function warn(msg, emote = '<:no:833070129738023023>', colour = '#e31836') {
	return embed = new Discord.MessageEmbed()
		.setColor(colour)
		.setDescription(`${emote} ${msg}`)
}

module.exports = warn