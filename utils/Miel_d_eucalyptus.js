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
        return role;
    }

    get_description() {
        return description;
    }

    get_emoji() {
        return emoji;
    }
}

class gestion_reaction {
    tab_reaction = []
    longeur = 0
    ajouter_reaction(role, description, emoji) {
        let reaction = new reaction_v2(role, description, emoji)
        this.tab_reaction.push(reaction)
        this.longeur ++
    }

    supprimer_reaction() {
        this.tab_reaction = []
        this.longeur = 0
    }

    recuperer_reaction(index) {
        return this.tab_reaction[index]
    }

    recuperer_longueur() {
        return this.longeur
    }
}