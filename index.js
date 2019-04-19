require('dotenv').config()

const fs      = require('fs')
const Discord = require('discord.js')
const client  = new Discord.Client()

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName    = file.split('.')[0] // Assumes that event handler files are titled: <event_name>.js

    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
})

client.login(process.env.BOT_TOKEN)
