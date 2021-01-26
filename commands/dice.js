function dice(msg) {
	let num = 0;
	let messageArray = msg.content.split(' ')

	if ((messageArray.length == 2 && messageArray[1] == 0) || messageArray[2] == 0) { // if number is 0
		num = "Bruh, you think I am stupid or something?";
	} else if (messageArray.length == 2) { // if only one number
		while (num == 0) {
			num = Math.floor(Math.random() * messageArray[1]); // roll new number that isnt 0
		}
	} else if (messageArray.length >= 3) { // if two numbers
		while (num == 0) {
			num = Math.floor(Math.random() * (messageArray[2] - messageArray[1])) + Number(messageArray[1]); // roll number between two inputted that is not 0
		}
	} else {
		num = "You need to input a number to roll the die"
	}
	msg.channel.send(num);
}

module.exports = dice