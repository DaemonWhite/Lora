const tmp = require('tmp');
const { createReadStream, unlink } = require('node:fs');

const { 
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
  StreamType,
  VoiceConnectionStatus 
} = require("@discordjs/voice");

const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec')
//--extract-audio


class MusicData {
  #ready = false
  #path = ""
  #info = ""
  #ready_event

  constructor (info, ready_event) {
    this.#info = info;
    this.#ready_event = ready_event
  }

  get ready() {
    return this.#ready
  }

  get path() {
    return this.#path
  }

  get info() {
    return this.#info
  }

  delete() {
    unlink(this.#path, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier:', err);
      } else {
        console.log('Le fichier a été supprimé avec succès!');
      }
    });
  }

  async download() {

    const tpm_video = tmp.fileSync();

    console.log('Fichier Temporarie : ', tpm_video.name);
    console.log('Descripteur de fichier', tpm_video.fd);

    await youtubedl((this.#info.url), {
      noCheckCertificates: true,
      noWarnings: true,
      audioQuality: 0,
      
      preferFreeFormats: true,
      remuxVideo: "mp4/mkv",
      output: tpm_video.name,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    });

    this.#path = tpm_video.name + ".mp4";
    tpm_video.removeCallback();
    this.#ready = true;
    this.#ready_event();
  }
}

/** 
* Music data
*/
class PlayerMusic {
  #connection
  #fill = []
  #is_play = false
  #player = createAudioPlayer({
    behaviors: {
		  noSubscriber: NoSubscriberBehavior.Pause,
	  },
  });
  #resource
  constructor(connection) {
    this.#connection = connection;
  }
  /**
   * Return first music
   * @returns fill[0]
   */
  get_fill(){
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
  async add_fill(resource) {
    console.log(resource)
    this.#fill.push(new MusicData(resource, () => {this.play()}));
    this.#fill[this.len_fill() - 1].download();
    console.log(this.#fill)
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
    for (let i = 0; i < this.len_fill(); i++) {
      this.#fill[i].delete();
    }
    this.#fill = [];
    this.#connection.destroy();
  }

  /**
   * pass next music
   * @returns next 
   */
  async next() {
    this.#is_play = false;
    console.log("Delete", this.#fill)
    await this.#fill[0].delete();
    this.#fill.shift();
    let next = false;
    if (this.len_fill() > 0) {
      this.play();
      next = true;
    }
    return next
  }

  /**
   * 
   * @param {Channel} connection 
   */
  connection(connection) {
    this.#connection = connection;
    this.#connection.subscribe(this.#player);
  }
  /**
  * play music
  */
  play() {
    if (this.len_fill() > 0 && !this.#is_play) {
      if (!this.#fill[0].ready) {
        return false
      }
      console.log(this.#fill) 
      this.#resource = createAudioResource(
        createReadStream(this.#fill[0].path),
        {metadata: {title: this.#fill[0].info.title},},
      );
  
      
      this.#resource.playStream.on('error', error => {
        console.error('Error:', error.message, 'with track', this.#resource.metadata.title);
        this.#is_play = false;
      });

      this.#player.play(this.#resource);
      
      this.#is_play = true;

      this.#player.on('error', error => {
        console.error(error);
      });
      console.log(this.#fill)
      this.#player.on(
        AudioPlayerStatus.Idle, () => {
          console.log(this.#fill)
          console.log("IDLE")
          if (this.next() && this.#is_play) {
            console.log("Music Suivante");
          } else {
            console.log("Music stop");
          }
      });
    }
    return true
  }
}


/**
 * Connect multi stream music
 */
class MusicManager {
  constructor() {
    this.player = new Map();
  }
  get_playlist() {
    if (this.player.get(id)) {
      this.player.get(id).get_fill();
    }
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
      console.log(`old state : ${oldState}\n\n newState : ${newState}`);
    });

    return connection
  }
/**
 * play music in greate Voice Channel
 * @param {joinVoiceChannel} connection 
 * @param {string} url 
 * @param {string} id 
 */
  async play(connection, info, id) {
    if (!this.player.get(id)) {
      console.log(`Create instance music : ${id}`);
      this.player.set(id, new PlayerMusic());
    }

    this.player.get(id).add_fill(info);
    if (!this.player.get(id).get_play()) {
      this.player.get(id).connection(connection)
    }
  }
/**
 * stop music in great channel
 * @param {string} id 
 */
  async stop(id) {
    if (this.player.get(id)) {
      this.player.get(id).stop();
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