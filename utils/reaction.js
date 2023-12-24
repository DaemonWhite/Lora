const { EmbedBuilder } = require("@discordjs/builders");

class ReactionData {
    #title
    #description
    #channel
    #emoji = []
    #texte = []
    #role = []
    #index = 0
    constructor(title, description) {
        this.#title = title;
        this.#description = description;
    }
    set_title(title) {
        this.#title = title;
    }
    set_description(description) {
        this.#description = description;
    }
    get title() {
        return this.#title
    }
    get description() {
        return this.#description
    }

    len() {
        return this.#index
    }

    generate_id(index) {
        return `${this.#role[index]} ${this.#texte[index]} (${this.#emoji[index]})`
    }


    append_data(emoji, texte, role) {
        let append = false;
        if (!this.#emoji.includes(emoji) && !this.#role.includes(append)) {
            this.#emoji.push(emoji);
            this.#role.push(role);
            this.#texte.push(texte);
            this.#index++;
            append = true;
        }
        return append
    }
}

class ReactionManager {
    #list_reaction_data = new Map()
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
    subscribe(id) {

    }
}

module.exports = {
    ReactionManager
}