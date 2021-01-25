function vote(msg) {
	let messageArray = msg.content.split(' ')
	let voteCode = messageArray[1]
	let voteModifier = messageArray[2]

	let modifiers = ['-y', '-n', '-v', '-p']

	tVote = t[0]
	tYes = t[1]
	tNo = t[2]

	for (var i = 0; i < modifiers.length; i++) {
		if (voteModifier === modifiers[i]) {
			voteOutcome(i)
			break
		} else if (i == modifiers.length - 1) {
			msg.channel.send('That is not a valid voting option.')
		}
	}

	function checkVotes() {
		if (tVote == 5) {
			if (tYes > tNo) {
				msg.channel.send('Suggestion ' + vQ.id + ' has been passed in this party of law.')
				client.channels.cache.get(l).send('Suggestion' + vQ.id + 'has passed the first stage of submitting a suggestion and is waiting for approval from the supreme leader:')
				client.channels.cache.get(l).send(vQ.suggestion)
				tVote = 0
				tYes = 0
				tNo = 0
			} else {
				msg.channel.send('Suggestion ' + vQ.id + ' has been voted down, suggestion ' + vQ.id + ' will not become a law.')
				tVote = 0
				tYes = 0
				tNo = 0
			}
		} else {
			msg.channel.send('Thank you for your vote towards suggestion ' + vQ.id + '.')
		}
	}
}

function voteOutcome(mod) {
	var newId = msg.author.id
	console.log(newId)
	if (votedIds().includes(newId)) {
		msg.channel.send('You have already voted for this suggestion.')
		return
	} else {
		voteList.push({
			id: newId,
		});
	}
	if (client.guilds.cache.get(msg.guild.id).members.cache.get(msg.author.id).roles.cache.find(role => role.name === 'Declasial')) {
		if (mod == 0) {
			tVote++, tYes++
			checkVotes()
		} else if (mod == 1) {
			tVote++, tNo++
			checkVotes()
		}
	} else {
		msg.channel.send('You are not a member of the Declasial party.')
	}
	if (mod == 2) {
		if (client.guilds.cache.get(msg.guild.id).members.cache.get(msg.author.id).roles.cache.find(role => role.name === 'Supreme Leader' || role.name === 'Policial')) {
			msg.channel.send('Suggestion ' + vQ.id + ' has been vetoed.')
		} else {
			msg.channel.send('You are not within a party able to veto a law.')
		}
		if (mod == 3) {
			msg.channel.send('Suggestion ' + vQ.id + ' has been passed in this party of law.')
			client.channels.cache.get(l).send('Suggestion ' + vQ.id + ' has passed the first stage of submitting a suggestion and is waiting for approval from the supreme leader:');
			client.channels.cache.get(l).send(vQ.suggestion);
		}
	}
}

module.exports = vote