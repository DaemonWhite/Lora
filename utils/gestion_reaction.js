class reaction_v2 {
    _role
    _description
    _emoji
    
    constructor (role, description, emoji){
        this._role = role
        this._description = description
        this._emoji = emoji
    }
    
    get_role() {
        return this._role;
    }

    get_description() {
        return this._description;
    }

    get_emoji() {
        return this._emoji;
    }
}

class GestionReaction {
    tab_reaction = []
    taille = 0
    ajouter_reaction(role, description, emoji) {
        let reaction = new reaction_v2(role, description, emoji)
        this.tab_reaction.push(reaction)
        this.taille ++
    }

    supprimer_reaction() {
        this.tab_reaction = []
        this.taille = 0
    }

    recuperer_reaction(index) {
        return this.tab_reaction[index]
    }

    recuperer_taille() {
        return this.taille
    }
}
module.exports = {GestionReaction}