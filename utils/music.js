const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require("@discordjs/voice");

const ytdl = require('ytdl-core');

/** 
* Music data
*/
class MusicData {
  #player = createAudioPlayer()
  #is_play = false
  #connection
  #fill = []
  constructor(connection) {
    this.#connection = connection
  }
  /**
   * Return first music
   * @returns fill[0]
   */
  get_fill(){
    fill = this.#fill[0]
    return fill
  }
  /**
   * 
   * @returns is_play
   */
  get_play() {
    return this.#is_play
  }
  /**
   * add resource music in fill
   * @param {AudioResource} resource 
   */
  add_fill(resource) {
    this.#fill.push(resource);
  }

  /**
   * get length music fill
   * @returns fill.length
   */
  len_fill() {
    return this.#fill.length
  }

  /**
   * stop playing music
   */
  stop() {
    this.#fill = []

    this.#connection.destroy()
  }

  /**
   * pass next music
   * @returns next 
   */
  next() {
    this.#fill.shift();
    let next = false;
    if (this.len_fill() > 0) {
      this.#player.play(this.#fill[0]);
      next = true;
    }
    return next
  }
/**
 * play music and change connection
 * @param {joinVoiceChannel} connection 
 */
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


/**
 * Connect multi stream music
 */
class MusicManager {
  constructor() {
    this.player = new Map()
  }
/**
 * Connect base event to voice channel
 * @param {channel} channel 
 * @returns joinVoiceChannel
 */
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
/**
 * play music in greate Voice Channel
 * @param {joinVoiceChannel} connection 
 * @param {string} url 
 * @param {string} id 
 */
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
/**
 * stop music in great channel
 * @param {string} id 
 */
  async stop(id) {
    if (this.player.get(id)) {
      this.player.get(id).stop()
    }
  }
/**
 * next music un great channel
 * @param {string} id 
 */
  async next(id) {
    if (this.player.get(id)) {
      this.player.get(id).next()
    }
  }
/**
 * loop music in great channel (not work)
 * @param {joinVoiceChannel} connection 
 * @param {string} url 
 */
  async loop(connection, url) {

  }
}

module.exports = {
  MusicManager
}