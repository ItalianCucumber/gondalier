module.exports = {
	aliases: [ /* insert the aliases here */ ],
	description: '', // add here a description of the command
	example: ``, // display here an example of the code in use
	async execute(env) {
		env.args.shift()
		const msg = env.message
		const args = env.args

	}
}