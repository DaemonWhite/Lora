const { Events} = require('discord.js');

function get_random_ind(max) {
    return Math.floor(Math.random() * max)
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message, client) {

        if ("561205621739749376" == message.author.id) {
            let messages_leticia = [
                "T'es encore plus bizarre que mon créateur",
                "Juste tu polue l'aire",
                "Ta guele lora vas faire des portes et prier le sable",
                "Lora tu fais chier",
                "La place de la femme c'est la cuisine",
                "Laisse moi dormir sale bot",
                "J'ai toujours sur que tu étais une théroristes à te radicaliser au portes @Leticia",
                "Je vais t'enfoncer ton sable dans ton cul",
                "Non mais franchement pk tu vis"
            ]
            // Commande ["Llora", "LeatLoeva", "Lplay [KonoSuba] Kocchi Muite Megumin (EXPLOSION!) - 10 hours"]

            message.reply(messages_leticia[get_random_ind(messages_leticia.length)])
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
        }
        
    }
}