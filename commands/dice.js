module.exports = {
	aliases: ['d', 'dice', 'random'],
	description: 'Rolls a random number from 1 to the inserted value or from a floor to the inserted value',
	example: `${p}d <number> / ${p}d <floor> <number>`,
	async execute(env) {
		env.args.shift()
		const msg = env.message
		const args = env.args
		let num = 0;

		if ((args.length == 1 && args[0] == 0) || args[1] == 0) { // if number is 0
			num = "Bruh, you think I am stupid or something?";
		} else if (args.length == 1) { // if only one number
			while (num == 0) {
				num = Math.floor(Math.random() * args[0]); // roll new number that isnt 0
			}
		} else if (args.length >= 2) { // if two numbers
			while (num == 0) {
				num = Math.floor(Math.random() * (args[1] - args[0])) + Number(args[0]); // roll number between two inputted that is not 0
			}
		} else {
			num = "You need to input a number to roll the die"
		}
		msg.channel.send(num);
	}
}