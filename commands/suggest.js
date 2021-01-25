function suggest(msg) {
	casecode = {
		'test': Math.floor((Math.random() * 10000) + 0)
	}
	voteQueue = [];
	voteList = [];
	usedIds = function() {
		var idArray = [];
		for (var i = 0; i < voteQueue.length; i++) {
			idArray.push(voteQueue[i].id);
		}
		return idArray;
	};
	votedIds = function() {
		voteArray = [];
		for (var i = 0; i < voteList.length; i++) {
			voteArray.push(voteList[i].id);
		}
		return voteArray;
	};

	var newId = Math.round(Math.random() * 10000);
	while (usedIds().includes(newId)) {
		newId = Math.round(Math.random() * 10000);
	}
	voteQueue.push({
		id: newId,
		suggestion: msg.content.slice(4, -1) + msg.content.slice(-1),
	});
	msg.reply('your suggestion is being processed now. (' + voteQueue[voteQueue.length - 1].id + ')')
	let suggestion = msg.content.slice(4, -1) + msg.content.slice(-1);
	client.channels.cache.get('697457937240686705').send('<@' + msg.author.id + '>' + ' suggested: ' + suggestion + ' (' + voteQueue[voteQueue.length - 1].id + ')');
	console.log(voteQueue[voteQueue.length - 1].suggestion)
	console.log(voteQueue[voteQueue.length - 1].id)
}

module.exports = suggest