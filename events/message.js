module.exports = (client, message) => {
  switch(message.content) {
    case 'ping':
      message.reply('Pong!')
      break;
    case '!tableflip':
      message.channel.send('(╯°□°)╯︵ ┻━┻')
      break;
    case '!shrug':
      message.channel.send('¯\\_(ツ)_/¯')
      break;
    case '!disappointed':
      message.channel.send('smh')
      break;
    // Leaving no default case for now. Probably nothing I want to happen on _every_ message sent
  }
}
