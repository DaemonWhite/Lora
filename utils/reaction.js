const { EmbedBuilder } = require("@discordjs/builders");

class ReactionData {
    _title = " "
    _description = " "
    _emoji = []
    _texte = []
    _role = []
    _index = 0
    constructor(title= " ", description = " ") {
        this._title = title;
        this._description = description;
    }
    set_title(title) {
        this._title = title;
    }
    set_description(description) {
        this._description = description;
    }
    get title() {
        return this._title
    }
    get description() {
        return this._description
    }

    get emojis() {
        return this._emoji
    }

    get roles() {
        return this._role
    }

    get textes() {
        return this._texte
    }
    len() {
        return this._index
    }

    generate_id(index) {
        return `${this._role[index]} ${this._texte[index]} (${this._emoji[index]})`
    }

    append_data(emoji, texte, role) {
        let append = false;
        if (!this._emoji.includes(emoji) && !this._role.includes(append)) {
            this._emoji.push(emoji);
            this._role.push(role);
            this._texte.push(texte);
            this._index++;
            append = true;
        }
        return append
    }
}

class ReactionEvent extends ReactionData {
    #bot_id
    #channel
    #message
    #guild
    constructor(reaction_data) {
        super(reaction_data.title, reaction_data.description);
        this._index = reaction_data.len()
        this._emoji = reaction_data.emojis
        this._texte = reaction_data.textes
        this._role = reaction_data.roles
    }

    choice_role(emoji, member) {
        let choice_role = null

        for (let i = 0; i < this._index; i++) {
            if (emoji == this._emoji[i]) {
                choice_role = this._role[i];
                break
            }
        }

        return choice_role
    }

    subscribe() {
        const reaction_collector = this.#message
                                        .createReactionCollector({time: 0, dispose: true});
        reaction_collector.on('remove', (reaction, user) => {
			const member_cache = this.#guild.members.fetch(user.id);
			const member = this.#guild.members.cache.get(user.id);
            let index =0;
            console.log(this._emoji);

            let choice_role = this.choice_role(reaction.emoji.name, member);

            if (choice_role) {
                member.roles.remove(choice_role);
                this.#channel.send(`Supression du role`) 
            } else {
                this.#channel.send(`Une erreur inconue est survenue`)
            }
		});

        console.log(this.#message);
		
		reaction_collector.on('collect', (reaction, user) => { 
			console.log(`Collected ${reaction.emoji.name}`); 
			const member_cache = this.#guild.members.fetch(user.id);
			const member = this.#guild.members.cache.get(user.id);

            let choice_role = this.choice_role(reaction.emoji.name, member);
            console.log(reaction.emoji.name);
            if (choice_role) {
                member.roles.add(choice_role);
                this.#channel.send(`Ajout du role`)
            } else {
                this.#channel.send(`Une erreur inconue est survenue`)
            }
		});

        for (let index = 0; index < this._index; index++) {
            this.#message.react(this._emoji[index])
        }

        reaction_collector.on('end', collected => console.log(`Collected ${collected} items`));
    }
    set_info_subscribe(channel, message, guild) {
        this.#channel = channel
        this.#message = message
        this.#guild = guild 
    } 
}

class ReactionManager {
    #list_reaction_data = new Map()
    #publish_reaction_data = new Map()
    constructor() {
        
    }
    create_data(id, title, description) {
        if (this.#list_reaction_data.get(id)) {
            let reaction = this.#list_reaction_data.get(id);
            reaction.set_title(title);
            reaction.set_description(description);
        } else {
            this.#list_reaction_data.set(id, new ReactionData(title, description))
        }
    }
    append_data(id, emoji, texte, role) {
        if (!this.#list_reaction_data.get(id)) {
            this.#list_reaction_data.set(id, new ReactionData());
        }
        
        return this.#list_reaction_data.get(id).append_data(emoji, texte, role)
    }
    render(id) {
        const reaction = this.#list_reaction_data.get(id);
        console.log(this.#list_reaction_data.get(id))
        const reigistery_role = new EmbedBuilder();
        reigistery_role.setTitle(reaction.title);
        reigistery_role.setDescription(reaction.description);
        for (let index = 0; index < reaction.len(); index++) {
            reigistery_role.addFields({name:` `, value: reaction.generate_id(index)},);
        }
        reigistery_role.setTimestamp();
        return reigistery_role
    }
    subscribe(id, guild, channel, message) {
        let data = this.#list_reaction_data.get(id);
        if (!data) {
            return true
        }
        let publish_list = this.#publish_reaction_data.get(guild.id);
        if (!publish_list) {
             this.#publish_reaction_data.set(guild.id, []);
             publish_list = this.#publish_reaction_data.get(guild.id);
        };
        
        let new_event = new ReactionEvent(data);
        new_event.set_info_subscribe(channel, message, guild);
        new_event.subscribe();
        publish_list.push(new_event);
        
        return false
    }
}

module.exports = {
    ReactionManager
}