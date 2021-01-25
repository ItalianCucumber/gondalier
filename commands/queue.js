function queue(msg) {
	msg.channel.send('Showing queue of suggestions.')
	for (var i = 0; i < voteQueue.length; i++) {
		msg.channel.send('(' + voteQueue[i].id + ') ' + voteQueue[i].suggestion);
	}
}

module.exports = queue