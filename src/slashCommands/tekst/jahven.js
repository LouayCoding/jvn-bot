const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'jahven',
    description: "Displays jahven's payment methods.",
    options: [
        {
            name: "paypal",
            description: "Shows Jahevn's PayPal",
            type: ApplicationCommandOptionType.Subcommand,

        },
    ],

    run: async (client, interaction) => {

        interaction.channel.send({ content: 'https://paypal.me/bjavete08?country.x=AR&locale.x=en_US' });
        interaction.reply({ content: 'Paypal link has been sent succesfully.', ephemeral: true });
    }
};