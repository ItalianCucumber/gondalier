# gondalier

Gondalier is a Discord bot intended for general use functions such as random number generator, reminders, &amp;c. Uses Discordjs and Nodejs.

![png](gondalier.png)

## what you need
* [nodejs](https://nodejs.org/en/) installed
* [discordjs](https://discord.js.org) module installed
```
npm install discord.js
```
* an auth.json file with your own [token](https://discord.com/developers/applications)
```json
{
"token":"your_token_id"
}
```

## how to add your own commands

### Before programming your own commands, there are a few things you must do first.

** **

In the main file, `Gondalier.js`, you must initialize the command first
```js
// commands init

commands = {}
commands['id'] = require('./commands/id.js')
```
Add a new line under `commands = {}` with the name of the command in place of `id`.

** **

Next, add a new line further down with the function `newCommand()`.
```js
newCommand('name', 'id')
```
Here, the `name` will be the string that goes after the prefix and the `id` will be the same id you used in the previous step.

** **

#### Now you can start programming the actual command.
- Create a new file in directory `\commands\` with the same filename as you used in the first step. `require('./commands/id.js')`
- Next paste the following template into the new file
```js
function id(msg) {
 --code--
}

module.exports = id
```
- Just replace the id with the id you have been using previously and enter the code into the `--code--` area

## special thanks

### I would like to thank my good lad, [*Secnyt*](https://github.com/secnyt), for helping me out on a ton of things

#### Thank you for supporting Gondalier

Creato da *ItalianCucumber*
