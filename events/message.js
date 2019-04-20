module.exports = (client, message) => {
  if (message.content.match(/^\/poll /)) {
    params = message.content.split('poll ')

    message.channel.send(`Should we ${params[1]}?`)
      .then( response => {
        response.react('👍')
        response.react('👎')
      })
      .catch(() => console.error('One of the emojis failed to react.'))
  }

  switch(message.content) {
    case 'ping':
      message.reply('Pong!')
      break;
    case '/tableflip':
      message.channel.send('(╯°□°)╯︵ ┻━┻')
      break;
    case '/shrug':
      message.channel.send('¯\\_(ツ)_/¯')
      break;
    case '/disappointed':
      message.channel.send('smh')
      break;
    case '/success':
      message.channel.send("Noice", {files: ["./assets/256px-SuccessKid.jpg"]})
      break;
    // Leaving no default case for now. Probably nothing I want to happen on _every_ message sent
  }
}
