const { createAudioPlayer } = require("@discordjs/voice");

class MusicManager {
  constructor() {
    this.player = createAudioPlayer()
    
  }
}