module.exports = {
	aliases: ['m', 'music'],
	description: 'Plays mentioned song from predetermined library',
	example: `${p}m [<song>|loop|shuffle|deshuffle|skip]`,
	async execute(env) {
		const msg = env.message
		content = msg.content.replace(/  +/g, ' ')
		let song = content.substring(content.indexOf(' ', content.indexOf(' ')) + 1, content.length + 1)
		let songStr = ''

		const songs = fs.readdirSync('./src/music')
		const formatSong = (song) => song
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.trim()

		let songToPlay = songs.find(s => formatSong(s.split('.')[0]) == formatSong(song))

		for (var i = 0; i < songs.length; i++) {
			songStr = '- ' + songs.map(s => s.slice(0, -4)).join('\n- ')
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#6cc0dc')
			.setTitle("Gondalier's Music Library")
			.setDescription('Here are all songs currently uploaded to the bot.')
			.addFields({
				name: 'Songs:',
				value: songStr,
			})

		if (song == '..m') {
			msg.channel.send(embed)
			return
		} else if (song == 'loop') {
			loop = !loop
			msg.channel.send(`Loop has been ${loop == true ? "enabled" : "disabled"}!`)
			return
		} else if (song == 'shuffle') {
			if (shuffle == false) {
				shuffle = true
				msg.channel.send('Shuffle has been enabled!')
				loop = true
				songToPlay = songs[Math.floor(Math.random() * songs.length)]
			} else {
				msg.channel.send('Shuffle is already enabled! Type `..m deshuffle` to stop shuffle.')
			}
		} else if (song == 'deshuffle') {
			shuffle = false
			loop = false
			msg.channel.send('Shuffle has been disabled!')
		} else if (song == 'skip') {
			if (shuffle == true) {
				msg.channel.send(`${songToPlay} has been skipped!`)
				songToPlay = songs[Math.floor(Math.random() * songs.length)]
			} else {
				msg.channel.send('You must be shuffling to skip!')
			}
		} else if (!songToPlay) {
			msg.channel.send("Your song couldn't be found, make sure it is spelled correctly!")
			return
		}

		var VC = msg.member.voice.channel

		if (!VC)
			return msg.reply("only those in VC have the privilege to use this command!")

		let play = (connection) => {
			var dispatcher = connection.play('./src/music/' + songToPlay)

			dispatcher.on("finish", () => {
				if (shuffle == true) {
					loop = true
					songToPlay = songs[Math.floor(Math.random() * songs.length)]
					msg.channel.send(`Now playing ${songToPlay.slice(0, -3)}`)
				}
				if (loop == true) {
					setTimeout(function() {
						play(connection)
					}, 500)
				} else {
					setTimeout(function() {
						VC.leave()
					}, 45000)
				}
			})
		}

		VC.join().then(connection => {
			msg.channel.send(`Now playing ${songToPlay.slice(0, -3)}`)
			play(connection)
		}).catch(console.error)
	}
}