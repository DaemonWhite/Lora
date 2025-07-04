const { readFileSync, existsSync } = require('node:fs');
const ytdl = require('@distube/ytdl-core');

class Cookie {
    #cookie = null;
    #agent = null;
    constructor() {
        if (existsSync("cookie.json")) {
            this.#cookie = readFileSync("cookie.json");
            this.#agent = ytdl.createAgent(JSON.parse(this.#cookie));
        }
    }

    getAgent() {
        return this.#agent;
    }

    isLoad() {
        return this.#cookie != null;
    }
}

module.exports = {
  Cookie,
};