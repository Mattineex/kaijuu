require('dotenv').config();
const Discord = require('discord.js-selfbot');
const fta = require('node-fetch');
const channel = "1240975270291308605";

const tokens = [process.env.TOKEN1, process.env.TOKEN2, process.env.TOKEN3];

tokens.forEach((token, index) => {
  const client = new Discord.Client({
    disableEveryone: true,
  });

  client.on("ready", () => {
    console.log(`Bot ${index + 1} logged in as: ${client.user.tag}`);
    joinVC(client, index + 1);
  });

  client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.member.id === client.user.id && !newState.channelID) {
      joinVC(client, index + 1);
    }
  });

  function joinVC(client, botNumber) {
    const voiceChannel = client.channels.cache.get(channel);
    if (!voiceChannel) {
      console.log(`Bot ${botNumber} - Error: Voice channel with ID ${channel} not found`);
      return;
    }
    voiceChannel.join().then(() => {
      console.log(`Bot ${botNumber} joined voice channel ${voiceChannel.name}`);
    }).catch(error => {
      console.log(`Bot ${botNumber} - Error joining voice channel: ${error}`);
    });
  }

  client.login(token).catch(err => {
    console.log(`Bot ${index + 1} failed to log in: ${err}`);
  });

  const keepAlive = require('./server.js');
  keepAlive();
});
