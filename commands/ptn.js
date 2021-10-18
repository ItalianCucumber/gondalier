module.exports = {
	aliases: ['ptn'],
	description: 'Plays songs specifically from the band *Pinguini Tattici Nucleari*',
	example: `${p}ptn [<song>|controls|skip (loop|shuffle|deshuffle|skip|notify)]`, // display here an example of the code in use
	async execute(env) {
		const msg = env.message
		content = msg.content.replace(/  +/g, ' ')
		let song = content.substring(content.indexOf(' ', content.indexOf(' ')) + 1, content.length + 1)
		let songStr = ''

		const songs = fs.readdirSync('./src/PTN')
		const formatSong = (song) => song
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.trim()

		let songToPlay = songs.find(s => formatSong(s.split('.')[0]) == formatSong(song))

		songStr = '- ' + songs.map(s => s.slice(0, -4)).join('\n- ')


		const embed = new Discord.MessageEmbed()
			.setColor('#f73503')
			.setTitle('Pinguini Tattici Nucleari Library')
			.setDescription('Here are all PTN songs currently uploaded to the bot.')
			.addFields({
				name: 'Songs:',
				value: songStr,
			})

		updateControls = function() {
			controls_embed = new Discord.MessageEmbed()
				.setColor('#f73503')
				.setTitle('Pinguini Tattici Nucleari Control Panel')
				.setDescription('This is the state of all music controls')
				.addFields({
					name: 'Loop',
					value: `${loop == true ? "On" : "Off"}`
				}, {
					name: 'Shuffle',
					value: `${shuffleP == true ? "On" : "Off"}`
				}, {
					name: 'Notifications',
					value: `${notifyP == true ? "On" : "Off"}`
				})

			loop_button = new disbut.MessageButton()
				.setStyle(`${loop == true ? "gray" : "blurple"}`)
				.setLabel(`${loop == true ? "Disable Loop" : "Enable Loop"}`)
				.setID('ptn_loop')

			shuffle_button = new disbut.MessageButton()
				.setStyle(`${shuffleP == true ? "gray" : "blurple"}`)
				.setLabel(`${shuffleP == true ? "Dectivate Shuffle" : "Activate Shuffle"}`)
				.setID('ptn_shuffle')

			notify_button = new disbut.MessageButton()
				.setStyle(`${notifyP == true ? "gray" : "blurple"}`)
				.setLabel(`${notifyP == true ? "Turn Off Notifications" : "Turn On Notifications"}`)
				.setID('ptn_notify')
		}

		updateControls()

		if (song == '..ptn') {
			msg.channel.send(embed)
			return
		} else if (song == 'controls') {
			updateControls()
			msg.channel.send({
				buttons: [
					loop_button, shuffle_button, notify_button
				],
				embed: controls_embed
			})
		} else if (song == 'loop') {
			loop = !loop
			msg.channel.send(`Loop has been ${loop == true ? "enabled" : "disabled"}!`)
			msg.channel.send(warn('This command has been moved to `..ptn controls`.', '🚩'))
			return
		} else if (song == 'shuffle') {
			if (shuffleP == false) {
				shuffleP = true
				msg.channel.send('Shuffle has been enabled!')
				loop = true
				songToPlay = songs[Math.floor(Math.random() * songs.length)]
			} else {
				msg.channel.send('Shuffle is already enabled! Type `..ptn deshuffle` to stop shuffle.')
			}
		} else if (song == 'deshuffle') {
			shuffleP = false
			loop = false
			msg.channel.send('Shuffle has been disabled!')
			msg.channel.send(warn('This command has been moved to `..ptn controls`.', '🚩'))
		} else if (song == 'skip') {
			if (shuffleP == true) {
				msg.channel.send(`${songToPlay} has been skipped!`)
				songToPlay = songs[Math.floor(Math.random() * songs.length)]
			} else {
				msg.channel.send('You must be shuffling to skip!')
			}
		} else if (song == 'notify') {
			notifyP = !notifyP
			msg.channel.send(`Notifications have been ${notifyP == true ? "enabled" : "disabled"}!`)
			msg.channel.send(warn('This command has been moved to `..ptn controls`.', '🚩'))
		} else if (song.includes('lyrics')) {
			console.log(formatSong(song.replace('lyrics', '')));
			lyrics(msg, formatSong(song.replace('lyrics', '')), '')
			return
		} else if (!songToPlay) {
			msg.channel.send("Your song couldn't be found, make sure it is spelled correctly!")
			return
		}

		var VC = msg.member.voice.channel


		let play = (connection) => {
			var dispatcher = connection.play('./src/PTN/' + songToPlay)

			dispatcher.on("finish", () => {
				if (shuffleP == true) {
					songToPlay = songs[Math.floor(Math.random() * songs.length)]
					if (notifyP == true) {
						msg.channel.send(`Now playing ${songToPlay.slice(0, -3)}`)
					}
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

		if (songToPlay) {
			if (!VC) {
				return msg.channel.send(warn('Only those in VC have the privilege to use this command!'))
				//return msg.reply("only those in VC have the privilege to use this command!")
			} else {
				VC.join().then(connection => {
					if (notifyP == true) {
						msg.channel.send(`Now playing ${songToPlay.slice(0, -3)}`)
					}
					play(connection)
				}).catch(console.error)
			}
		}

		function lyrics(msg, name, language) {
			let songLyrics = fs.readFileSync(`./data/testo/${name}.txt`).toString()
			strofo = songLyrics.split('\n\n')
			lyricsEmbed = new Discord.MessageEmbed()
				.setColor('#f73503')
				.setTitle(name)
				.setDescription('Pinguini Tattici Nucleari')
			for (var i = 0; i < strofo.length; i++) {
				lyricsEmbed.addFields({
					name: '\u200b',
					value: strofo[i]
				})
			}
			msg.channel.send({
				embed: lyricsEmbed
			})
		}
	}
}