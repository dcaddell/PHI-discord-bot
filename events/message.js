module.exports = (client, message) => {
  switch(message.content.toLowerCase()) {
    case '/help': // TODO: Pull this out into an array somewhere
      message.reply('Accepted commands are /tableflip, /shrug, /disappointed, /success, /poll <yes/no question>')
      break;
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
    case '/pitchfork':
      message.channel.send('---E')
      break;
    case '/praise':
      message.channel.send('\\[T]/')
      break;
    case '/praisethesun':
      message.channel.send('\\[T]/ PRAISE THE SUN \\[T]/')
      break;
    case '/upvote':
    case '/approve':
      message.channel.send('👍')
      break;
    case '/downvote':
    case '/disapprove':
      message.channel.send('👎')
      break;
    case '/fuckit':
      message.channel.send("👍", {files: ["./assets/ObamaFuckItHaveAnUpvote.png"]})
      break;
    case 'murica':
      message.channel.send("DID I HEAR FREEDOM RING?", {files: ["./assets/MURICA.jpg"]})
      break;

    // Chat member summons
    case 'drew':
    case 'dewsef':
    case 'drewsef':
      message.channel.send('@Drew we need you!')
      break;
    case 'haotian':
    case 'ht':
    case 'haoboy':
      message.channel.send('@hwhwa#7123 we need you!')
      break;
    case 'george':
    case 'shu':
      message.channel.send('@George#4720 we need you!')
      break;
    case 'greg':
    case 'greggers':
      message.channel.send('@greggers#9291 we need you!')
      break;
    case 'bhargav':
    case 'bman':
      message.channel.send('@fortunesfavored#3293 we need you!')
      break;

    // Leaving no default case for now. Probably nothing I want to happen on _every_ message sent
  }

  if (message.content.match(/^\/poll /)) {
    simplePoll(message)
  }

  function simplePoll(message) {
    params = message.content.split('poll ')

    message.channel.send(`Should we ${params[1]}?`)
      .then( response => {
        response.react('👍')
        response.react('👎')
      })
      .catch(() => console.error('One of the emojis failed to react.'))
  }
}
