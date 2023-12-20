const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require("@discordjs/voice");

const ytdl = require('ytdl-core');

class MusicData {
  #player = createAudioPlayer()
  #is_play = false
  #connection
  #fill = []
  constructor(connection) {
    this.#connection = connection
  }
  get_fill(){
    fill = this.#fill[0]
    return fill
  }
  get_play() {
    return this.#is_play
  }
  add_fill(resource) {
    this.#fill.push(resource);
  }
  len_fill() {
    return this.#fill.length
  }
  stop() {
    this.#fill = []

    this.#connection.destroy()
  }
  next() {
    this.#fill.shift();
    let next = false;
    if (this.len_fill() > 0) {
      this.#player.play(this.#fill[0]);
      next = true;
    }
    return next
  }

  play(connection) {
    this.#connection = connection;
    
    if (this.len_fill() > 0 && !this.#is_play ) {
      this.#player.play(this.#fill[0])
      this.#connection.subscribe(this.#player);
      this.#is_play = true;

      this.#player.on(
        AudioPlayerStatus.Idle, () => {
          this.#fill.shift()
          if (this.len_fill() > 0) {
            this.#player.play(this.#fill[0])
          } else {
            this.#is_play = false
            this.#connection.destroy();
          }
      });
    }
  }
}

class MusicManager {
  constructor() {
    this.player = new Map()
  }

  connectToChanel(channel) {
    
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) =>
    {
      console.log(`old state : ${oldState}\n\n newState : ${newState}`)
    });

    return connection
  }

  async play(connection, url, id) {
    if (!this.player.get(id)) {
      console.log(`Create instance music : ${id}`)
      this.player.set(id, new MusicData());
    }

    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
    });

    this.player.get(id).add_fill(resource);
    this.player.get(id).play(connection);

    
  }

  async add_wait_list(url) {
    this.wait_list.append(url)
  }

  async stop(id) {
    if (this.player.get(id)) {
      this.player.get(id).stop()
    }
  }

  async next(id) {
    if (this.player.get(id)) {
      this.player.get(id).next()
    }
  }

  async loop(connection, url) {

  }
}

module.exports = {
  MusicManager
}