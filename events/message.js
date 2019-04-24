module.exports = (client, message) => {
  switch(message.content.toLowerCase()) {
    case '/help': // TODO: Pull this out into an array somewhere
      message.reply('Accepted commands are ' +
        '/tableflip, /shrug, /disappointed, /success, ' + 
        '/pitchfork, (/praise or /praisethesun), (/upvote or /approve) ' +
        '(/downvote or /disapprove), /fuckit, ' +
        '/poll <yes/no question>.\n\n ' +
        'You can also summon people by typing varieties of their name.\n\n ' +
        'Hope you can find some easter eggs!'
        )
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
      message.channel.send({files: ["./assets/praise-basic.gif"]})
      break;
    case '/praisethesun':
      message.channel.send({files: ["./assets/praise-the-sun.gif"]})
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
      message.channel.send('<@167476695559962624> we need you!')
      break;
    case 'haotian':
    case 'ht':
    case 'haoboy':
      message.channel.send('<@548360682094067712> we need you!')
      break;
    case 'george':
    case 'shu':
      message.channel.send('<@323660101476941824> we need you!')
      break;
    case 'greg':
    case 'greggers':
      message.channel.send('<@173669774293860352> we need you!')
      break;
    case 'bhargav':
    case 'bman':
    case 'b':
      message.channel.send('<@565637261291683870> we need you!')
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
