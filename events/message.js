const youtube_api = require('simple-youtube-api');
const youtube     = new youtube_api(process.env.YOUTUBE_API_KEY);

module.exports = (client, message, youtube) => {
  if (message.author.bot) return undefined;
	if (!message.content.startsWith('/')) return undefined;

	const args  = message.content.split(' ');
	const url   = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	let command = message.content.toLowerCase().split(' ')[0];
	command     = command.slice(PREFIX.length)

  switch(command) {
    case 'help': // TODO: Pull this out into an array somewhere
      message.reply('Accepted commands are /tableflip, /shrug, /disappointed, /success, /poll <yes/no question>')
      break;
    case 'ping':
      message.reply('Pong!')
      break;
    case 'tableflip':
      message.channel.send('(╯°□°)╯︵ ┻━┻')
      break;
    case 'shrug':
      message.channel.send('¯\\_(ツ)_/¯')
      break;
    case 'disappointed':
      message.channel.send('smh')
      break;
    case 'success':
      message.channel.send("Noice", {files: ["./assets/256px-SuccessKid.jpg"]})
      break;
    case 'playSong':
      // Safety Valves
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command!');
      const permissions = voiceChannel.permissionsFor(message.client.user);
  		if (!permissions.has('CONNECT')) {
  			return message.reply('I cannot connect to your voice channel, make sure I have the proper permissions!');
  		}
  		if (!permissions.has('SPEAK')) {
  			return message.reply('I cannot speak in this voice channel, make sure I have the proper permissions!');
  		}

      // Actual logic
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
  			const playlist = await youtube.getPlaylist(url);
  			const videos   = await playlist.getVideos();
  			for (const video of Object.values(videos)) {
  				const video2 = await youtube.getVideoByID(video.id);
  				await handleVideo(video2, message, voiceChannel, true);
  			}
  			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
  		} else {
  			try {
  				var video = await youtube.getVideo(url);
  			} catch (error) {
  				try {
  					var videos = await youtube.searchVideos(searchString, 10);
  					let index = 0;
  					message.channel.send(`
  __**Song selection:**__
  ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
  Please provide a value to select one of the search results ranging from 1-10.
  					`);
  					try {
  						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
  							maxMatches: 1,
  							time: 10000,
  							errors: ['time']
  						});
  					} catch (err) {
  						console.error(err);
  						return message.reply('No or invalid value entered, cancelling video selection.');
  					}
  					const videoIndex = parseInt(response.first().content);
  					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
  				} catch (err) {
  					console.error(err);
  					return message.reply('🆘 I could not obtain any search results.');
  				}
  			}
  			return handleVideo(video, message, voiceChannel);
        break;
      }
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
